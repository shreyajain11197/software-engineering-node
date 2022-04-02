/**
 * @file Implements mongoose schema for users
 */

import mongoose from "mongoose";
import User from "../../models/users/User";

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
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    joined: {type: Date, default: Date.now()}
}, {collection: "users"});

export default UserSchema;
