import { INewPost, PostRepository } from "../repositories/postRepository";
import { CustomError, errorGenerator, NotFoundError, isCustomError } from "../models/error";
import { Fail } from "../models/fail";
import { Sucess } from "../models/sucess";

export class PostService {
    
    private repo : PostRepository
    private errorGenerator: (data: object, subject?: string)=> CustomError | Error

    constructor() {
        this.repo = new PostRepository()
        this.errorGenerator = errorGenerator
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
            return new Fail(this.errorGenerator(data as Error, "Post"))
        }

        return new Sucess(data)
    }

    public async findbyAuthor(author: string){
        const data = await this.repo.findByAuthor(author)
           
        if(data instanceof Error || data == null|| data.length == 0){
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
        { id,  author, content, categories} : {id: number, author: string, content: string, categories: string[]}  
    ) {
        const exists = await this.repo.findById(id)
        if(exists == null || !exists){
            return new Fail(this.errorGenerator(new NotFoundError("Post")))
        }

        const data = await this.repo.editPost( { id, author, content, categories})      
        
        if(data instanceof Error){
            return new Fail(this.errorGenerator(data))
        }

        return new Sucess(data)
    }

    public async deletePost(id: number) {

        const exists = await this.repo.findById(id)
        if(exists == null || !exists ){
            return new Fail(new NotFoundError("Post"))
        }

        const data = await this.repo.deletePost(id)
        if(data instanceof Error){
            return new Fail(this.errorGenerator(data))
        }

        return new Sucess(data)
            
    }

}
