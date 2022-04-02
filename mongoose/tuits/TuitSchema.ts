/**
 * @file Implements mongoose schema for tuits
 */

import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit represents Tuits
 * @property {String} tuit the tuit
 * @property {Date} postedOn the date when the tuit was posted
 * @property {User} postedBy the user who posted the tuit
 * @property {string} image image in a tuit
 * @property {string} youtube youtube url in a tuit
 * @property {string} avatarLogo the logo in a tuit of the user who posted the tuit
 * @property {User} imageOverlay the overlay of images in a tuit
 * @property {Stats} stats the statistics on likes of a tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }
}, {collection: "tuits"});
export default TuitSchema;
