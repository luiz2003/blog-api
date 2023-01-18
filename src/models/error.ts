export interface CustomError  {
    name: string,
    message: string
    statusCode: number
}

export class NotFoundError implements CustomError {
   
    public statusCode = 404
    public name = "NotFound Error"
    public message: string

    public constructor(subject:string){
        this.message = subject + " not found"
    }

}

export class InvalidIdError implements CustomError {
    public statusCode = 400
    public message = "Invalid id value"
    public name =  "InvalidIdError"
}