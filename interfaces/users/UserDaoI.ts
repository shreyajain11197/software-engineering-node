/**
 * @file Interface UserDaoI for DAO managing data storage of users.
 */
import User from "../../models/users/User";
import UserModel from "../../mongoose/users/UserModel";

/**
 * @interface UserDaoI consisting of methods for DAO managing data storage of users.
 * Defines the following use CRUD operations for the provided HTTP endpoints:
 * <ul>
 *     <li> create a user
 *     </li>
 *     <li> update a user
 *     </li>
 *     <li>delete a user
 *     </li>
 *     <li>get all users
 *     </li>
 *     <li>get user by id
 *     </li>
 * </ul>
 */
export default interface UserDaoI {

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsers(): Promise<User[]>;

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserById(uid: string): Promise<any>;

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser(user: User): Promise<User>;

    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    updateUser(uid: string, user: User): Promise<any>;

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    deleteUser(uid: string): Promise<any>;

    /**
    * Finds user in the database.
    * @param {string} username username of the user
    * @param {String} password password of the user
    * @returns Promise To be notified when user is retrieved from the database
    */
    findUserByCredentials(username: string, password: string): Promise<any>;

    /**
    * Finds user in the database on the basis of the username.
    * @param {string} username username of the user
    * @returns Promise To be notified when user is retrieved from the database
    */
    findUserByUsername(username: string): Promise<any>;

    /**
    * Removes all users from the database. Useful for testing
    * @returns Promise To be notified when all users are removed from the
    * database
    */
    deleteAllUsers(): Promise<any>;

    /**
    * Removes a user from the database. Useful for testing
    * @returns Promise To be notified when  user is removed from the
    * database
    */
    deleteUsersByUsername(username: string): Promise<any>;

}