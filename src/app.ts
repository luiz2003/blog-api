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
        this.express.get('/post/:id', (req, res)=> this.postController.findById(req, res))
        this.express.get('/author', (req, res)=> this.postController.findByAuthor(req, res))
        this.express.post('/post',(req, res)=> this.postController.newPost(req, res))
        this.express.patch('/post',(req, res)=> this.postController.editPost(req, res))
        this.express.delete('/post',(req, res)=> this.postController.deletePost(req, res))
    }

}

export default new App().express