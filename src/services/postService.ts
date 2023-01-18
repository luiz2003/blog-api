import { INewPost, PostRepository } from "../repositories/postRepository";
import { CustomError, NotFoundError, isCustomError } from "../models/error";
import { Fail } from "../models/fail";
import { Sucess } from "../models/sucess";

export class PostService {
    
    private repo : PostRepository

    constructor() {
        this.repo = new PostRepository()
    }

    private errorGenerator( data: any, subject?:string){
        switch (data) {
            case data instanceof Error :
                return data
            case data == null :
                return new NotFoundError(subject as string)
            default:
                break
            
        }
    }

    public async findAll()  {
        const data = await this.repo.findAll()

        if(data instanceof Error){
            return new Fail(this.errorGenerator(data))
        }

        return new Sucess(data)
    }

    public async findById(id:number) {
        const data = await this.repo.findById(id)
        
        if(data instanceof Error || data == null){
            return new Fail(this.errorGenerator(data, "Post"))
        }

        return new Sucess(data)
    }

    public async findbyAuthor(author: string){
        const data = await this.repo.findByAuthor(author)
           
        if(data instanceof Error || data == null){
            return new Fail(this.errorGenerator(data, "Author"))
        }

        return new Sucess(data)
    }

    public async newPost({author, content, categories} : INewPost) {
        
        const data = await this.repo.newPost({author, content, categories})
         
        if(data instanceof Error){
            return new Fail(this.errorGenerator(data))
        }
        
        return new Sucess(data)
    }

    public async editPost( 
        { id,  authorName, content, categories} : {id: number, authorName: string, content: string, categories: string[]}  
    ) {
        const exists = await this.repo.findById(id)
        if(exists == null || !exists){
            return new Fail(this.errorGenerator(new NotFoundError("Post")))
        }

        const data = await this.repo.editPost( { id, authorName, content, categories})      
        
        if(data instanceof Error){
            return new Fail(this.errorGenerator(data))
        }

        return new Sucess(data)
    }

    public async deletePost(id: number) {

        const exists = await this.repo.findById(id)
        if(exists == null || !exists ){
            return new Fail(this.errorGenerator(new NotFoundError("Post")))
        }

        const data = await this.repo.deletePost(id)
        if(data instanceof Error){
            return new Fail(this.errorGenerator(data))
        }

        return new Sucess(data)
            
    }

}
