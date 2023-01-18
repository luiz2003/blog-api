import {  PrismaClient  }  from "@prisma/client" 
import { Category } from "../models/category"
import { Author } from "../models/author"
export class PostRepository {
    prisma: PrismaClient

    public constructor(){
        this.prisma = new PrismaClient()
    }

    public async findAll() {
        return await this.prisma.post.findMany(
            {select:{
                id: true,
                author: true,
                content: true,
                categories: true
            }})
    }

    public async findById(id: number) {
        return await this.prisma.post.findUnique({ where: { id } })
    }

    public async findByAuthor(author: string) {
        return await this.prisma.post.findMany({ where: { 
            author:{
                name: author
            }
         } })
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

    public async editPost(body: {
        id: number
        authorName: string,
        content: string,
        categories: string[]
    }) {
        return await this.prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                content: body.content,
                author: {
                    connectOrCreate: {
                        where: {
                            name: body.authorName
                        },
                        create: {
                            name: body.authorName
                        }
                    }
                },
                categories: {
                    connectOrCreate: body.categories.map((category)=>({
                        where: {
                            name: category
                        },
                        create: {
                            name: category
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

export interface INewPost {
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

const repo = new PostRepository()

// posts.forEach(async post => {
//     console.log(await repo.newPost(post))
// }

//repo.findAll().then(res=> console.dir(res, {depth: null}))

repo.findById(9).then(res=>console.dir(res, {depth: null}))