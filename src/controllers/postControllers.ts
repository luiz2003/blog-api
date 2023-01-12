import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { CustomError } from "../models/error";
import { isValidPost } from "../models/post";


export class PostController{
    private service : PostService

    public constructor(){
        this.service = new PostService()
    }

    private handleError(res: Response , err: Error | CustomError){
        
        const errMsg = {errorMessage: err.message}

        if(err instanceof CustomError){
            return res.status(err.statusCode).json(errMsg)
        }

        res.status(500).json(errMsg)
    }

    public async findAll(req : Request, res : Response) {
       
        try {
            
            this.service.findAll()
            .then(response => {
                if(response.error){
                    return this.handleError(res, response.error)
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
  
    public async findById(req : Request, res : Response) {
       
        try {
        
            this.service.findById(parseInt(req.params.id))
            .then(response => {
                if(response.error){
                   return this.handleError(res, response.error)
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
    
    public async findByAuthor(req : Request, res : Response) {
       
        try {
        
            this.service.findbyAuthor(req.body.author)
            .then(response => {
                if(response.error){
                   return this.handleError(res, response.error)
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

    public async newPost(req: Request, res: Response) {

        const post = {
            author: req.body.author,
            content: req.body.content
        }
        console.log(post)
        try{
            if(!isValidPost(post)) {
                return res.status(400).json({msg: "ERROR: invalid post"})
            }

            this.service.newPost(post)
            .then(response => {
                if(response.error){
                   return this.handleError(res, response.error)
                }

                if(response.sucess){
                    res.status(200).json(response)
                }
            })
        }
        catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    
    public async editPost(req: Request, res: Response) {
        
        const post: any = {id: req.body.id}
        const author = req.body.author
        const content = req.body.content

        if(author)
            post.author = author
        if(content)
        post.content = content
        
        try{
            if(! post.id || (!post.author && !post.content) ) {
                return res.status(400).json({msg: "ERROR: invalid edit"})
            }

            this.service.editPost(post)
            .then(response => {
                if(response.error){
                   return this.handleError(res, response.error)
                }

                if(response.sucess){
                    res.status(200).json(response)
                }
            })
        }
        catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }

    public async deletePost(req: Request, res: Response){
        const id =  req.body.id
        
        if(!id) {
            return res.status(400).json({msg: "ERROR: No id provided"})
        }

        try{

            this.service.deletePost(id)
            .then(response => {
                if(response.error){
                   return this.handleError(res, response.error)
                }

                if(response.sucess){
                    res.status(200).json(response)
                }
            })
        }
        catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
}

