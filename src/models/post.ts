export interface Post {
    id: number;
    author: string;
    content: string
}

export function isValidPost(product: any): boolean {
    return ( 
            product.author != null && 
            product.content != null  
        )
}