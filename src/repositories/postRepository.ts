import {  PrismaClient  }  from "@prisma/client" 
import { Category } from "../models/category"
import { Author } from "../models/author"
export class PostRepository {
    prisma: PrismaClient

    public constructor(){
        this.prisma = new PrismaClient()
    }

    public async findAll() {
        return await this.prisma.post.findMany({include: { categories: true} })
    }

    public async findById(id: number) {
        return await this.prisma.post.findUnique({ where: { id } })
    }

    public async findByAuthor(authorId: number) {
        return await this.prisma.post.findMany({ where: { authorId } })
    }

    public async findByCategory(category : string) {
        return await this.prisma.category.findMany({
            where: {name: category},
            select: {
                posts: true
            }
        })
    }

    public async newPost(post: INewPost) {
        return await this.prisma.post.create({ data: {
                content: post.content,
                author: {
                    connectOrCreate: {
                        where:{
                            name : post.author
                        },
                        create : {
                           name: post.author
                        }
                    }
                },
                categories: {
                    connectOrCreate: post.categories.map((category)=>({
                        where: {
                            name: category
                        },
                        create: {
                            name: category
                        }
                    }))
                    
                }
          }})
    }

    public async editPost(id: number, body : {
        author: Author,
        content: string,
        categories: Category[]
    }) {
        return await this.prisma.post.update({
            where: {
                id
            },
            data: {
                content: body.content,
                author: {
                    connectOrCreate: {
                        where: {
                            name: body.author.name
                        },
                        create: {
                            name: body.author.name
                        }
                    }
                },
                categories: {
                    connectOrCreate: body.categories.map((category)=>({
                        where: {
                            name: category.name
                        },
                        create: {
                            name: category.name
                        }
                    }))
                    
                }
            }
        })
    }

    public async deletePost(id: number) {
        return await this.prisma.post.delete({
            where:{
                id
            }
        })
    }
}

interface INewPost {
    author: string
    content: string
    categories : string[]
}
// const posts : INewPost[] = [
//     {
//         author: "Nikolas Tesla",
//         content: "ZAP",
//         categories: ["Science", "Innovation"]
//     },

//     {
//         author: "Bill Gates",
//         content: "I love windows",
//         categories: ["Technology", "Software", "Innovation"]
//     },

//     {
//         author: "Nikolas Tesla",
//         content: "ELECTRIC CAGE",
//         categories: ["Science"]
//     },
// ]

//const repo = new PostRepository()

// posts.forEach(async post => {
//     console.log(await repo.newPost(post))
// }

//repo.findAll().then(res=> console.dir(res, {depth: null}))