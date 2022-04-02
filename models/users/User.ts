/**
 * @file Declares User data type representing user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents a user
 * @property {string} username username of the user
 * @property {string} password password of the user
 * @property {string} firstName firstName of the user
 * @property {string} lastName lastName of the user
 * @property {string} email email of the user
 * @property {string} profilePhoto profilePhoto of the user
 * @property {string} headerImage headerImage of the user
 * @property {AccountType} accountType accountType of the user
 * @property {MaritalStatus} maritalStatus maritalStatus of the user
 * @property {Location} location location of the user
 * @property {string} biography biography of the user
 * @property {Date} dateOfBirth date of birth of the user
 * @property {Date} joined joined date of the user
 */
export default interface User {
     _id?: mongoose.Schema.Types.ObjectId,
     username: string,
     password: string,
     email: string,
     firstName?: string,
     lastName?: string,
     profilePhoto?: string,
     headerImage?: string,
     biography?: string,
     dateOfBirth?: Date,
     accountType?: AccountType,
     maritalStatus?: MaritalStatus,
     location?: Location,
     joined?: Date
};