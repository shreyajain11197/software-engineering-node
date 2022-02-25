/**
 * @file Declares Tuit data type representing tuits
 */

/**
 * @typedef Tuit represents Tuits
 * @property {String} tuit the tuit
 * @property {Date} postedOn the date when the tuit was posted
 * @property {User} postedBy the user who posted the tuit
 */
export default class Tuit {
    private tuit: String = '';
    private postedOn: Date = new Date();
    private postedBy: String | null = null;
}