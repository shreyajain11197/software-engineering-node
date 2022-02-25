import {Request, Response} from "express";

export default interface FollowControllerI {

    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    getUserFollowerList (req: Request, res: Response): void;
    getUserFollowingList (req: Request, res: Response): void;

};