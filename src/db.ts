import  sqlite3, { RunResult }  from "sqlite3"

export function modifyDB (query: string, ...params : any[]) {
    const db = new sqlite3.Database('db/blog.db')

    const stmt = db.prepare(query)
    

    return new Promise<RunResult>( (resolve,reject) => {
        console.log(params)
        stmt.run( params, function (error) {
        
            if (error) {
                console.error(error);
                reject(error)
            }
        
            resolve(this)

        })
    }).finally(()=> {
        stmt.finalize()
        db.close()
    })
    
}
