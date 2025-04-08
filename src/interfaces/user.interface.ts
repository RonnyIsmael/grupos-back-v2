import { Avatar } from "./avatar.interface.js"

export interface User {
  id: number
  user_name: string
  email: string
  password: string
  register_date: Date
  avatar: Avatar
}

export interface UserItem {
  id: number
  user_name: string
  avatar: Avatar
}

export interface UserGroup {
  user_id: number
  group_id: number
  group_name: string
  avatar_group: string
  owner_group: any
  sport_group: string
}

export interface CreateUser {
  user_name: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}
