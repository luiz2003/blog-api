import { Post } from "./post"

export interface Category {
    id: number
    name: string
    posts: Post[]
}