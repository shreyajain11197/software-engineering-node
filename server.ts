import express from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/users/UserController";
import bodyParser from "body-parser";
import TuitController from "./controllers/tuits/TuitController";
import LikeController from "./controllers/likes/LikeController";
import BookmarkController from "./controllers/bookmarks/BookmarkController";
import MessageController from "./controllers/messages/MessageController";
import FollowController from "./controllers/follows/FollowController";

mongoose.connect('mongodb+srv://cs5500:Spring2022@cluster0.9yuzq.mongodb.net/tuiter?retryWrites=true&w=majority');
const app = express();
app.use(bodyParser.json())

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const followController = FollowController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);