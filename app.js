const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');


app.use(express.json());
app.use('/api/users', userRouter);

app.listen(3000,()=>{
    console.log("Server up..")
})