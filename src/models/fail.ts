import { CustomError } from "./error"

export class Fail {
    public error: CustomError | Error
    
    public constructor(error: CustomError | Error ){
        this.error = error
    }
}