/**
 * @file Declares User data type representing user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
export default class User {
    private username: String = '';
    private password: String = '';
    private firstName: String | null = null;
    private lastName: String | null = null;
    private email: String = '';
    private profilePhoto: String | null = null;
    private headerImage: String | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: String | null = null;
    private dateOfBirth: Date | null = null;
    private joined = new Date();
    private location: Location | null = null;
}