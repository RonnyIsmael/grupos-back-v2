import { Request, Response, NextFunction } from 'express'
import userModel from '../models/user.model.js'
import { ResponseService } from '../interfaces/response.interface.js'
import groupModel from '../models/group.model.js'
import { UserGroup } from '../interfaces/user.interface.js'
import { UserCountGroup } from '../interfaces/group.interface.js'


export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.findAll()
        res.json(users)
    } catch (error) {
        next(error)
    }

}
export const getUserGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let responseService: ResponseService = {}
        const userId = Number(req.params.id)
        const groups: UserGroup[] = await userModel.findGroupsbyUserId(userId)

        const userGroups: UserCountGroup[] = await Promise.all(
            groups.map(async (element) => {
                const userNumbers = await groupModel.countUsersByGroupId(element.group_id);
                return {
                    id: element.group_id,
                    name: element.group_name,
                    avatar: element.avatar_group,
                    userNumbers: userNumbers.num_users
                };
            })
        );

        console.log(groups)

        responseService = {
            succes: true,
            body: userGroups
        }
        res.json(responseService)
    } catch (error) {
        next(error)
    }

}