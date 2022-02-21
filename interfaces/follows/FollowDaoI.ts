import Follow from "../../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {

    userFollowsUser ( userId: string, followedUserId: string): Promise<Follow>;
    userUnfollowsUser ( userId: string, unfollowedUserId: string): Promise<any>;
    getUserFollowerList (userId: string): Promise<Follow[]>;
    getUserFollowingList (userId: string): Promise<Follow[]>;
    accessFollowerDetails ( userId: string, followedUserId: string): Promise<any>;
    accessFollowingUserDetails ( userId: string, followingUserId: string): Promise<any>;
};
