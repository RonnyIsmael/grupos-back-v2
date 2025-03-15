export interface Group {
    id: number
    name: string
    avatar_id: string
}

export interface CountUser {
    num_users: number
}

export interface UserCountGroup {
    id: number
    name: string
    avatar: string
    userNumbers: number
}
