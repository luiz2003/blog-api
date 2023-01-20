import { Author } from "./author";
import { Category } from "./category";

export interface Post {
    id: number
    author: Author
    content: string
    categories: Category[]
}


export function isValidPost(product: any): boolean {
    return ( 
            product.author != null && 
            product.content != null  && product.categories != null
        )
}