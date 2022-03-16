import {Request, Response} from "express";

/**
 * @interface UserControllerI consisting of RESTful Web service API for bookmark resource.
 * Defines the following use cases for HTTP endpoints:
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
export default interface UserControllerI {

    /**
     * Retrieves all users from the database and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers (req: Request, res: Response): void;

    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById (req: Request, res: Response): void;

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser (req: Request, res: Response): void;

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser (req: Request, res: Response): void;

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser (req: Request, res: Response): void;

    /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers (req: Request, res: Response): void;

    /**
     * Removes  user instance from the database on the basis of username.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting user was successful or not
     */
    deleteUsersByUsername (req: Request, res: Response): void;

    /**
     * Allows a user to login to the Tuiter application
     * @param {Request} req Represents request from client, including
     * the username and password in the body.
     * @param {Response} res Represents response to client, with
     * either a successful login or an unsuccessful login.
     */
    login (req: Request, res: Response): void;

    /**
     * Allows a user to register and create an account in the Tuiter application
     * @param {Request} req Represents request from client, including
     * the username and password and email in the body.
     * @param {Response} res Represents response to client, with
     * either a successful registration or an unsuccessful registration.
     */
    register (req: Request, res: Response): void;
};