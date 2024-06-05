import { Schema, model } from "mongoose";

const citySchema = new Schema(
    {
        city: {
            type: String,
            required: true
        }, 
        admin_name: {
            type: String, 
            required: true
        }
    }

)

export default model("City", citySchema);
