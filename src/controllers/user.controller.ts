import { Request, Response, NextFunction } from 'express'
import userModel from '../models/user.model.js'
import { ResponseService } from '../interfaces/response.interface.js'
import groupModel from '../models/group.model.js'
import { UserItem, UserGroup } from '../interfaces/user.interface.js'
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
    console.log('Init getUserGroups')
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
                    sport: element.sport_group,
                    owner: element.owner_group,
                    userNumbers: userNumbers.num_users
                };
            })
        );

        responseService = {
            succes: true,
            body: userGroups
        }
        res.json(responseService)
    } catch (error) {
        next(error)
    }
    console.log('End getUserGroups')
}
export const getUserFriends = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Init getUserFriends')
    try {
        let responseService: ResponseService = {}
        const userId = Number(req.params.id)
        const freinds: UserItem[] = await userModel.findUserFriends(userId)
        responseService = {
            succes: true,
            body: freinds
        }
        res.json(responseService)
    } catch (error) {
        next(error)
    }
    console.log('End getUserFriends')
}