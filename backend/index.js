import express from "express"
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose"
import {Application} from "./models/appModel.js"
import appRoutes from "./routes/appRoute.js"

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS Policy
app.use(cors())

app.get("/", (request, response)=> {
    console.log(request)
    return response.status(234).send("Testing!")
})

app.use("/app", appRoutes)

mongoose.connect(mongoDBURL)
.then(()=> {
    console.log("Successfully connected to database")
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    })
})
.catch(error => {
    console.log(error)
})