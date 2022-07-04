import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

// import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
// import roomsRoute from "./routes/rooms.js"
// import usersRoute from "./routes/users.js"

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_KEY);
    console.log("Connected to mongoDB")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('disconnected', () => {
  console.log("mongoDB is disconnected")
});

mongoose.connection.on('connected', () => {
  console.log("mongoDB is connected")
});

// middlewares
app.use(express.json())

// app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
// app.use("/api/rooms", roomsRoute)
// app.use("/api/users", usersRoute)

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMessage = error.message || "Something went wrong"

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack
  })
})

app.listen(8800, async () => {
  await connect()
  console.log("App is connected to backend!")
})
