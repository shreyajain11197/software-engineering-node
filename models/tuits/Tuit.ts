/**
 * @file Declares Tuit data type representing tuits
 */

import User from "../users/User";
import Stats from "./Stats";

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
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};