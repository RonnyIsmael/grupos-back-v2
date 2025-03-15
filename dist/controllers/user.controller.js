import userModel from '../models/user.model.js';
import groupModel from '../models/group.model.js';
export const getUsers = async (_req, res, next) => {
    try {
        const users = await userModel.findAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
export const getUserGroups = async (req, res, next) => {
    try {
        let responseService = {};
        const userId = Number(req.params.id);
        const groups = await userModel.findGroupsbyUserId(userId);
        const userGroups = await Promise.all(groups.map(async (element) => {
            const userNumbers = await groupModel.countUsersByGroupId(element.group_id);
            return {
                id: element.group_id,
                name: element.group_name,
                avatar: element.avatar_group,
                userNumbers: userNumbers.num_users
            };
        }));
        console.log(groups);
        responseService = {
            succes: true,
            body: userGroups
        };
        res.json(responseService);
    }
    catch (error) {
        next(error);
    }
};
