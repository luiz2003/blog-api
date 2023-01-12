import express from 'express'
import cors from 'cors'
import { PostController } from './controllers/postControllers'
class App {
    public express: express.Application
    
    private postController = new PostController()
    
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
        this.express.get('/', (req, res)=> this.postController.findAll(req, res))
    }


}

export default new App().express