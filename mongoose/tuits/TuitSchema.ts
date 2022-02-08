import mongoose, {Schema} from "mongoose";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: String, ref: "UserModel", required: true},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});

export default TuitSchema;