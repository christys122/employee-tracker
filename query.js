class Query {
 //1. method
    viewRoles( connection ){

    const query = `SELECT roles.*, roles.job_title 
                  AS Role`
        this.viewRoles = query
                

    return  new Promise (( resolve, reject) =>{

        connection.query( query , (err, res)=>{
            if(err) reject(err);
            resolve(res);
        })
    }
    )

   }
//2. method: 
viewMangerWithDepartmantandRoles( connection ){
    const query = `SELECT employees.*, first_name, last_name, manager_id
                    WHERE manager_id = null`
        this.viewMangerWithDepartmantandRoles = query
}


departmentList( connection ){
    const query = `SELECT * departments`
    this.departmentList = query
}
}
module.exports = Query;