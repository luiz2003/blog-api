import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { CustomError, isCustomError } from "../models/error";
import { isValidPost } from "../models/post";
import { Fail } from "../models/fail";
import { Sucess } from "../models/sucess";


export class PostController{
    private service : PostService

    public constructor(){
        this.service = new PostService()
    }

    private handleError(res: Response , err: Error | CustomError ){
        
        const errMsg = {errorMessage: err.message}

        if(isCustomError(err)){
            return res.status(err.statusCode).json(errMsg)
        }

        return res.status(500).json(errMsg)
    }

    public async findAll(req : Request, res : Response) {
       
        this.service.findAll()
        .then(response => {
            if(response instanceof Fail){
                this.handleError(res, response.error)
            }
            if(response instanceof Sucess){
                res.status(200).json(response.data)
            }
        })

    }
  
    public async findById(req : Request, res : Response) {
    
        this.service.findById(parseInt(req.params.id))
        .then(response => {
            if(response instanceof Fail){
                this.handleError(res, response.error)
            }
            if(response instanceof Sucess){
                res.status(200).json(response.data)
            }
        })

    }
    
    
    public async findByAuthor(req : Request, res : Response) {
        const authorName =  (req.query.author as string) .replace("+", " ")
        this.service.findbyAuthor(authorName)
        .then(response => {
            if(response instanceof Fail){
                this.handleError(res, response.error)
            }
            if(response instanceof Sucess){
                res.status(200).json(response.data)
            }
        })

    }

    public async newPost(req: Request, res: Response) {

        const post = {
            author: req.body.author,
            content: req.body.content,
            categories: req.body.categories
        }
        console.log(post)

        if (!isValidPost(post)){
            return res.status(400).json({message: "Bad request: Missing parameters"})
        }

        this.service.newPost(post)
        .then(response => {
            if(response instanceof Fail){
                return this.handleError(res, response.error)
            }

            if(response instanceof Sucess){
                return res.status(200).json(response.data)
            }
        })
    }
    
    public async editPost(req: Request, res: Response) {
        
        const post =  {
            id: parseInt(req.body.id),
            author: req.body.author as string,
            content: req.body.content as string,
            categories: req.body.categories as string[]
        }
        
        if(!post.id) {
            return res.status(400).json({msg: "Error: missing id"})
        }
        if(!isValidPost(post)){
            return res.status(400).json({msg: "Error: missing parameter"})
        }

        this.service.editPost(post)
        .then(response => {
            if(response instanceof Fail){
                return this.handleError(res, response.error)
            }

            if(response instanceof Sucess){
                return res.status(200).json(response.data)
            }
        })
        
    }

    public async deletePost(req: Request, res: Response){
        const id = parseInt(req.params.id)
        
        if(!id) {
            return res.status(400).json({msg: "ERROR: No id provided"})
        }

        this.service.deletePost(id)
        .then(response => {
            if(response instanceof Fail){
                return this.handleError(res, response.error)
            }

            if(response instanceof Sucess){
                res.status(200).json(response.data)
            }
        })
    }
}

