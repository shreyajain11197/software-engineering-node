/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../../models/users/User";
import UserModel from "../../mongoose/users/UserModel";
import UserDaoI from "../../interfaces/users/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI{

    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {

        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        return UserModel.create(user);
    }

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }

    /**
    * Finds user in the database.
    * @param {string} username username of the user
    * @param {String} password password of the user
    * @returns Promise To be notified when user is retrieved from the database
    */
    async findUserByCredentials(username: string, password: string): Promise<any> {
        UserModel.findOne({username: username, password: password});
    }

    /**
     * Finds user in the database on the basis of the username.
     * @param {string} username username of the user
     * @returns Promise To be notified when user is retrieved from the database
     */
     async findUserByUsername(username: string): Promise<any> {
         UserModel.findOne({username});
     }

    /**
     * Removes all users from the database. Useful for testing
     * @returns Promise To be notified when all users are removed from the
     * database
     */
    async deleteAllUsers(): Promise<any> {
        return UserModel.deleteMany({});
    }

    /**
     * Removes a user from the database. Useful for testing
     * @returns Promise To be notified when  user is removed from the
     * database
     */
    async deleteUsersByUsername(username: string): Promise<any> {
        return UserModel.deleteMany({username});
    }

}