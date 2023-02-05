const db = require ('../../config/database.js');

module.exports = {
    create: (data, callBack)=> {
        db.query(
            'INSERT INTO user (name,email,password,username)values(?,?,?,?)', [data.name,data.email,data.password,data.username],
            (error,results,fields)=>{
            if (error) {
                return callBack(error);
            }
            return callBack(null,results);
            }  

        );
    } ,
    getUsers: callBack => {
        db.query(
            'Select * FROM  user',
            [],
            (error,results,fields)  =>{
                if (error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    } ,
    getUsersById: (id, callBack ) => {
        db.query(
            'Select * FROM  user WHERE id = ?',
            [id],
            (error,results,fields)  =>{
                if (error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    } ,
    updateUser:(data, callBack) => {
        db.query(
            'UPDATE user SET name=?, password=?, email=?, username=? WHERE id = ?',
            [
                data.name,
                data.password,
                data.email,
                data.username,
                data.id
            ],
            (error,results,fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    } ,
    deleteUser: (data, callBack) =>{
        db.query(
            'DELETE FROM user WHERE id = ?',
            [data,id],
            (error,results,fields) =>{
                if (error){
                    callBack(error);
                }
                return callBack(null,results[0])
            }
        )
    },
    getUsersByUsersUsername: (username, callBack) => {
        db.query(
            'SELECT * FROM user WHERE username = ?',
            [username],
            (error, results, fields) => {
                if(error){
                  return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }   
};
