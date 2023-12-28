import express from "express"
import {Application} from "../models/appModel.js"

const router = express.Router()
//Route to save a new application
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.company ||
            !request.body.role ||
            !request.body.appDate ||
            !request.body.status
        ) {
            return response.status(400).send({
                message: "Send all required fields: Company, Role, Application Date and Status"
            })
        }

    const newApp = {
        company: request.body.company,
        role: request.body.role,
        appDate: request.body.appDate,
        status: request.body.status,
    }

    const application = await Application.create(newApp)
    return response.status(201).send(application)
    }

    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

// Route to Get all applications
router.get("/", async (request, response) => {
    try {
        const application = await Application.find({})
        return response.status(200).json({
            count: application.length,
            data: application
        })
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.emssage})
    }
})

// Route to get one application by id
router.get("/:id", async (request, response) => {
    try {
        const {id} = request.params
        const application = await Application.findById(id)
        return response.status(200).json(application)
    }

    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.emssage})
    }
})

// Route to update application
router.put("/:id", async(request, response) => {
    try {
        if (
            !request.body.company ||
            !request.body.role ||
            !request.body.appDate ||
            !request.body.status
        ) {
            return response.status(400).send({
                message: "Send all required fields: Company, Role, Application Date and Status"
            })
        }

        const {id} = request.params
        const result = await Application.findByIdAndUpdate(id, request.body)

        if (!result){
            return response.status(404).json({message: "Application not found"})
        }

        return response.status(200).send({message: "Application updated successfully"})
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

// Route to delete application
router.delete("/:id", async (request, response) => {
    try {
        const {id} = request.params
        const result = await Application.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({message: "Application not found"})
        }

        return response.status(200).json({message: "Application deleted successfully"})
    }

    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

export default router