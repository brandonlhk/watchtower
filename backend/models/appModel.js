import mongoose from "mongoose"
const appSchema = mongoose.Schema({

    company: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    appDate: {
        type: Date,
        default: Date.now,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    expectedResults: {
        type: String,
    },

    appLink: {
        type: String,
    },

})

export const Application = mongoose.model("Applications", appSchema)