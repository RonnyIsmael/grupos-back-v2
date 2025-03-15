export interface User {
  id: number
  user_name: string
  email: string
  password: string
  register_date: Date
}

export interface UserGroup {
  user_id: number
  group_id: number
  group_name: string
  avatar_group: string
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
