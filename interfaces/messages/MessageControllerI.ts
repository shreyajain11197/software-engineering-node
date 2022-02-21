import {Request, Response} from "express";
import Message from "../../models/messages/Message";

export default interface MessageControllerI {

    userMessagesUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    findMessagesSentByUser (req: Request, res: Response): void;
    findMessagesSentToUser (req: Request, res: Response): void;
};