import { PostRepository } from "../repositories/postRepository";
import { Post } from "../models/post";

export interface ServiceReponse <T> {
    sucess: boolean 
    message?: string 
    data?:  T | null
}

export class PostService {
    
    private repo : PostRepository

    constructor() {
        this.repo = new PostRepository()
    }

    public async findALl() : Promise < ServiceReponse<Post[]> > {
        const response: ServiceReponse<Post[]> = {
            sucess: true
        }

        try {
            response.data = await this.repo.findAll()
            return response
        }
        catch(error : any) {
            response.sucess = false
            response.message = error.msg
        }

       return response 
    }

    public async findById(id:number): Promise< ServiceReponse<Post> > {
        const response: ServiceReponse<Post> = {
            sucess: true
        }

        try {
            response.data = await this.repo.findById(id)
            return response
        }
        catch(error : any) {
            response.sucess = false
            response.message = error.msg
        }

       return response 
    }

    public async findbyAuthor(author: string): Promise< ServiceReponse<Post[]> >{

        const response: ServiceReponse<Post[]> = {
            sucess: true
        }

        try {
            response.data = await this.repo.findByAuthor(author)
            return response
        }
        catch(error : any) {
            response.sucess = false
            response.message = error.msg
        }

       return response 
    }

    public async newPost({author, content} : {author: string, content: string}): Promise<ServiceReponse<null> >{
        
        const response: ServiceReponse<null> = {
            sucess: true
        }

        try {
            await this.repo.newPost({author, content})
            return response
        }
        catch(error : any) {
            response.sucess = false
            response.message = error.msg
        }

       return response 
    }

    public async editPost(
        {id, author, content} : {id:number, author?: string, content: string}
    ): Promise< ServiceReponse<null> > {

        const response: ServiceReponse<null> = {
            sucess: true
        }

        try {
            await this.repo.editPost({id, author, content})
            return response
        }
        catch(error: any) {
            response.sucess = false
            if (error.message) {
                response.message = error.message
            }   
        }

       return response 
    }

    public async deletePost(id: number): Promise< ServiceReponse<null> > {

        const response: ServiceReponse<null> = {
            sucess: true
        }

        try {
            await this.repo.deletePost(id)
            return response
        }
        catch(error : any) {
            response.sucess = false
            response.message = error.msg
        }

       return response 
    }

}