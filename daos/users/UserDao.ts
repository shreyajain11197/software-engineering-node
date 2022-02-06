import User from "../../models/users/User";
import UserModel from "../../mongoose/users/UserModel";
import UserDaoI from "../../interfaces/users/UserDaoI";

export default class UserDao implements UserDaoI{

    private static userDao: UserDao | null = null;
    public static getInstance = (): UserDao => {

        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    async createUser(user: User): Promise<User> {
        return UserModel.create(user);
    }

    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }

}