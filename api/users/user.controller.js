const { create, getUsersById, getUsers, deleteUser, updateUser, getUsersByUsersUsername } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { json } = require('express');


module.exports = {
    createUser: (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: 'Database connection error'
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
        });
    } ,
    getUsersById:(req, res) => {
        const id = req.params.id;
        getUsersById(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'record not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req,res) => {
        getUsers((err, results) =>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Faild Update User'
                })
            }
            return res.json({
                success: 1,
                message: 'update succesfully'
            });
        });
    },
    deleteUser: (req, res) => {
        const data =  req.body;
        deleteUser(data, (err, results) => {
            if (err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: 1,
                message: 'User deleted succesfully'
            });
        });
    },
    login: (req,res) => {
        const body = req.body;
        getUsersByUsersUsername(body.username, (err, results) =>{
            if(err) {
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: 'invalid Username or password!'
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({result: results}, 'asdasd', {
                    expiresIn: '1h'
                });
                return res.json({
                    success: 1,
                    message: 'Login succesfully',
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: 'invalid Username or password!'
                });
            }
        });

    }

};