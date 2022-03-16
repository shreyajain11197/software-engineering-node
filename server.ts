/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>messages</li>
 *     <li>bookmarks</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/users/UserController";
import bodyParser from "body-parser";
import TuitController from "./controllers/tuits/TuitController";
import LikeController from "./controllers/likes/LikeController";
import BookmarkController from "./controllers/bookmarks/BookmarkController";
import MessageController from "./controllers/messages/MessageController";
import FollowController from "./controllers/follows/FollowController";
var cors = require('cors')

mongoose.connect('mongodb+srv://cs5500:Spring2022@cluster0.9yuzq.mongodb.net/tuiter?retryWrites=true&w=majority');
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

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

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);