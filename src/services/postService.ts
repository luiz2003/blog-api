import { PostRepository } from "../repositories/postRepository";
import { Post } from "../models/post";

export interface ServiceReponse <T> {
    sucess: boolean 
    error: Error | null
    data?:  T | null
}

export class PostService {
    
    private repo : PostRepository

    constructor() {
        this.repo = new PostRepository()
    }

    public async findALl() : Promise < ServiceReponse<Post[]> > {
        const response: ServiceReponse<Post[]> = {
            sucess: true,
            error: null
        }

        try {
            response.data = await this.repo.findAll()
            return response
        }
        catch(error) {
            response.sucess = false
            if(error instanceof Error) 
                response.error = error
        }

       return response 
    }

    public async findById(id:number): Promise< ServiceReponse<Post> > {
        const response: ServiceReponse<Post> = {
            sucess: true,
            error: null
        }

        try {
            response.data = await this.repo.findById(id)
            if (!response.data){
                response.sucess = false
                response.error = new NotFoundError("Id")
            }
            return response
        }
        catch(error) {
            response.sucess = false
            if(error instanceof Error) 
                response.error = error
        }

       return response 
    }

    public async findbyAuthor(author: string): Promise< ServiceReponse<Post[]> >{

        const response: ServiceReponse<Post[]> = {
            sucess: true,
            error : null
        }

        try {
            response.data = await this.repo.findByAuthor(author)
            if (!response.data){
                response.sucess = false
                response.error = new NotFoundError("Author")
            }
            return response
        }
        catch(error) {
            response.sucess = false
            if(error instanceof Error) 
                response.error = error
        }

       return response 
    }

    public async newPost({author, content} : {author: string, content: string}): Promise<ServiceReponse<null> >{
        
        const response: ServiceReponse<null> = {
            sucess: true,
            error: null
        }

        try {
            await this.repo.newPost({author, content})
            return response
        }
        catch(error) {
            response.sucess = false
            if(error instanceof Error) 
                response.error = error
        }

       return response 
    }

    public async editPost(
        {id, author, content} : {id:number, author?: string, content: string}
    ): Promise< ServiceReponse<null> > {

        const response: ServiceReponse<null> = {
            sucess: true,
            error: null
        }

        try {
            await this.repo.editPost({id, author, content})
            return response
        }
        catch(error) {
            response.sucess = false
            if(error instanceof Error) 
                response.error = error
        }

       return response 
    }

    public async deletePost(id: number): Promise< ServiceReponse<null> > {

        const response: ServiceReponse<null> = {
            sucess: true,
            error: null
        }

        try {
            await this.repo.deletePost(id)
            return response
        }
        catch(error) {
            response.sucess = false
            if(error instanceof Error) 
                response.error = error
        }

       return response 
    }

}