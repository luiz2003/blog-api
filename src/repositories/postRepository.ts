import { modifyDB, searchDB } from "../db";
import { Post } from "../models/post";
import { RunResult } from "sqlite3";

export class PostRepository {

    public async findAll(): Promise<Post[]> {
        return await searchDB('select * from posts')
    }

    public async findById(id: number) : Promise<Post> {
        const arr = await searchDB("select * from posts where id = ?", id)

        return arr[0]//if invalid id returns undefined
    }

    public async findByAuthor(author: string): Promise<Post[]>{
        return await searchDB("select * from posts where author = ? ", author) //if no posts by author returns []
    }

    public async newPost({author, content}: {author: string, content: string}): Promise<RunResult> {
        // put error verification in service
        return modifyDB("insert into posts (author, content) values (?, ?)", author, content)
    }

    public async editPost({id, author, content}: {id: number, author?:string, content?: string}): Promise<RunResult> {
        return modifyDB(
            "update posts set author = IFNULL (?, author), content = IFNULL(?, content) where id = ?",
            author, content, id
        )
    }

    public async deletePost(id: number): Promise<RunResult> {
        return modifyDB("delete from posts where id = ? ", id)
    }
}