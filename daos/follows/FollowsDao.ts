import FollowDaoI from "../../interfaces/follows/FollowDaoI";
import FollowModel from "../../mongoose/follows/FollowModel";
import Follow from "../../models/follows/Follow";

export default class FollowsDao implements FollowDaoI {

    private static followDao: FollowsDao | null = null;
    public static getInstance = (): FollowsDao => {
        if(FollowsDao.followDao === null) {
            FollowsDao.followDao = new FollowsDao();
        }
        return FollowsDao.followDao;
    }
    private constructor() {}


    userFollowsUser = async (uid: string, userFollowedId: string): Promise<any> =>
        FollowModel.create({userFollowed: uid, userFollowing: userFollowedId});

    userUnfollowsUser = async (uid: string, userFollowedId: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: userFollowedId});

    getUserFollowingList = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    getUserFollowerList = async (userId: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: userId})
            .populate("userFollowed")
            .exec();

}