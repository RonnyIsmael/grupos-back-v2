import { Request, Response, NextFunction } from 'express'
import groupModel from '../models/group.model.js'

export const getUsersGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = Number(req.params.id)
        const countUsers = await groupModel.countUsersByGroupId(groupId)
        res.json(countUsers)
    } catch (error) {
        next(error)
    }

}