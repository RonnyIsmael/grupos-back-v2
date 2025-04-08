export interface Group {
    id: number
    name: string
    user_id: number
    sport: string
    avatar: string
}
export interface AddGroup {
    name: string
    owner: number
    sport_id: number
    avatar: string
}
export interface AddGroupResponse {
    id: number
    name: string
    user_id: number
    sport_id: number
    avatar_id: number
}

export interface CountUser {
    num_users: number
}

export interface UserCountGroup {
    id: number
    name: string
    sport: string
    avatar: string
    owner: string
    userNumbers: number
}

