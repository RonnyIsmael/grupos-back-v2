import { Request, Response, NextFunction } from 'express'
import groupModel from '../models/group.model.js'
import { ResponseService } from '../interfaces/response.interface.js'
import { AddUserToGroup } from '../interfaces/request.interface.js'

export const getUsersGroup = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Init getUsersGroup')
    try {
        const groupId = Number(req.params.id)
        const countUsers = await groupModel.countUsersByGroupId(groupId)
        res.json(countUsers)
    } catch (error) {
        next(error)
    }
    console.log('End getUsersGroup')
}

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Init getGroupById')
    try {
        let responseService: ResponseService = {}

        const groupId = Number(req.params.id)
        const group = await groupModel.getGroupById(groupId)

        responseService = {
            succes: true,
            body: group
        }
        res.json(responseService)
    } catch (error) {
        next(error)
    }
    console.log('End getGroupById')

}
export const addGroup = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Init addGroup')
    try {
        let responseService: ResponseService = {}

        const group = await groupModel.addGroup(req.body)

        responseService = {
            succes: true,
            body: group
        }
        res.json(responseService)
    } catch (error) {
        next(error)
    }
    console.log('End addGroup')
}

export const addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Init addUserToGroup')
    try {
        let responseService: ResponseService = {}
        const data: AddUserToGroup = req.body
        data.users.map(async user_id => {
            await groupModel.addUserToGroup(user_id, data.group_id)
        })

        responseService = {
            succes: true,
            body: null
        }
        res.json(responseService)
    } catch (error) {
        next(error)
    }
    console.log('End addUserToGroup')
}