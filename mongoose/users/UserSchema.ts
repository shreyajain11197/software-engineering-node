/**
 * @file Implements mongoose schema for users
 */

import mongoose from "mongoose";

/**
 * @typedef User Represents a user
 * @property {String} username username of the user
 * @property {String} password password of the user
 * @property {String} firstName firstName of the user
 * @property {String} lastName lastName of the user
 * @property {String} email email of the user
 * @property {String} profilePhoto profilePhoto of the user
 * @property {String} headerImage headerImage of the user
 * @property {AccountType} accountType accountType of the user
 * @property {MaritalStatus} maritalStatus maritalStatus of the user
 * @property {Location} location location of the user
 * @property {String} biography biography of the user
 * @property {Date} dateOfBirth date of birth of the user
 * @property {Date} joined joined date of the user
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});

export default UserSchema;
