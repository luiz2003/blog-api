
class NotFoundError extends Error {
    public statusCode : number

    public constructor(subject : string){
        super(subject + " not found")
        this.statusCode = 404
    }

}