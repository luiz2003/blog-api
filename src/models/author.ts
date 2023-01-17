import { Post } from "./post"

export interface Author {
    id: number
    name: string
    posts: Post[]
}