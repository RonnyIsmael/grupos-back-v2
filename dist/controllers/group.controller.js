import groupModel from '../models/group.model.js';
export const getUsersGroup = async (req, res, next) => {
    try {
        const groupId = Number(req.params.id);
        const countUsers = await groupModel.countUsersByGroupId(groupId);
        res.json(countUsers);
    }
    catch (error) {
        next(error);
    }
};
