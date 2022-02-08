import User from "../users/User";

export default class Tuit {
    private tuit: String = '';
    private postedOn: Date = new Date();
    private postedBy: String | null = null;
}