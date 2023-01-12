export interface GenError  {
    name: string,
    message: string
    stack?: string
    statusCode: number
}

export class CustomError implements GenError{
    public name : string
    public message: string
    public stack?: string 
    public statusCode: number

    public constructor(name:string, statusCode: number, message: string){
        this.name = name
        this.statusCode=(statusCode)
        this.message = message
    }
}
export class NotFoundError extends CustomError {
   
    public statusCode = 404

    public constructor(subject:string){
        super("NotFound Error", 404, subject + " not found")
    }

}

export class InvalidIdError extends CustomError {
    public statusCode = 400
    
    public constructor(){
        super("InvalidId Error", 400, "Invalid Id")
    }
}