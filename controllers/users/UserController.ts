/**
 * @file Controller RESTful Web service API for users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../../daos/users/UserDao";
import UserControllerI from "../../interfaces/users/UserControllerI";

export default class UserController implements UserControllerI {

    /**
    * @class UserController Implements RESTful Web service API for users resource.
    * Defines the following HTTP endpoints:
    * <ul>
    *     <li>POST /users to create a new user instance</li>
    *     <li>GET /users to retrieve all the user instances</li>
    *     <li>GET /users/:uid to retrieve an individual user instance </li>
    *     <li>PUT /users to modify an individual user instance </li>
    *     <li>DELETE /users/:uid to remove a particular user instance</li>
    * </ul>
    * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
    * @property {UserController} userController Singleton controller implementing
    * RESTful Web service API
    */
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @returns UserController
    */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            app.post('/login', UserController.userController.login);
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:userid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            app.delete('/users/:userid', UserController.userController.deleteUser);
            app.put('/users/:userid', UserController.userController.updateUser);
            app.delete('/users/username/:username/delete', UserController.userController.deleteUsersByUsername);
            app.delete('/users/delete', UserController.userController.deleteAllUsers);
        }
        return UserController.userController;
    }

    private constructor() {}

    /**
    * Retrieves all users from the database and returns an array of users.
    * @param {Request} req Represents request from client
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the user objects
    */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
    * Retrieves the user by their primary key
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user to be retrieved
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the user that matches the user ID
    */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
    * Creates a new user instance
    * @param {Request} req Represents request from client, including body
    * containing the JSON object for the new user to be inserted in the
    * database
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the new user that was inserted in the
    * database
    */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
    * Removes a user instance from the database
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user to be removed
    * @param {Response} res Represents response to client, including status
    * on whether deleting a user was successful or not
    */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    /**
    * Modifies an existing user instance
    * @param {Request} req Represents request from client, including path
    * parameter uid identifying the primary key of the user to be modified
    * @param {Response} res Represents response to client, including status
    * on whether updating a user was successful or not
    */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));

    /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));

    /**
     * Removes  user instance from the database on the basis of username.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting user was successful or not
     */
    deleteUsersByUsername = (req: Request, res: Response) =>
        UserController.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.send(status));

    /**
    * Allows a user to login to the Tuiter application
    * @param {Request} req Represents request from client, including
    * the username and password in the body.
    * @param {Response} res Represents response to client, with
    * either a successful login or an unsuccessful login.
    */
    login = (req: Request, res: Response) =>
        UserController.userDao
            .findUserByCredentials(req.body.username, req.body.password)
            .then(user => {
                res.json(user)
            });

    /**
    * Allows a user to register and create an account in the Tuiter application
    * @param {Request} req Represents request from client, including
    * the username and password and email in the body.
    * @param {Response} res Represents response to client, with
    * either a successful registration or an unsuccessful registration.
    */
    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByUsername(req.body.username)
            .then(user => {
                res.json(user)
            });
}
