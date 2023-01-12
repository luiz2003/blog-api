import express from 'express'
import cors from 'cors'
import { PostController } from './controllers/postControllers'
import { PostService } from './services/postService'
class App {
    public express: express.Application
    
    private service = new PostService()
    
    private postController = new PostController(this.service)
    
    public constructor () {
        this.express = express()
        
        this.middlewares()

        this.routes()
    }
    
    private middlewares (): void {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private routes(): void {
        this.express.use('/',  this.postController.findAll)
    }


}

export default new App().express