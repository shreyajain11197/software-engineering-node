import Tuit from "../../models/tuits/Tuit";

export default interface TuitDaoI {

    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(username: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;

}
