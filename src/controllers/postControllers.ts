import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { CustomError } from "../models/error";


export class PostController{
    private service : PostService

    public constructor(postService: PostService){
        this.service = postService
    }

    private handleError(res: Response , err: Error | CustomError){
        
        const errMsg = {errorMessage: err.message}

        if(err instanceof CustomError){
            res.status(err.statusCode).json(errMsg)
        }

        res.status(500).json(errMsg)
    }

    public async findAll(req : Request, res : Response) {
       
        try {
            console.log(this.service)
            this.service.findAll()
            .then(response => {
                if(response.error){
                this.handleError(res, response.error)
                }

                if(response.sucess){
                    res.status(200).json(response)
                }
            })

        }
        catch(error){
            console.error(error)
            res.status(500).json(error)
        }
    }
  

    
}

