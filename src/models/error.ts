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

export function isCustomError(obj: any): obj is CustomError {
    return 'statusCode' in obj && 'name' in obj && 'message' in obj
}

export function errorGenerator( data: object | object[] , subject?:string): Error | CustomError{
    switch (true) {
        case data instanceof Error :
            return data as Error
        case data === null|| (data as Array<object>).length == 0 :
            return new NotFoundError(subject as string)
        default:
            return new Error("Unkown error")
    }
}
