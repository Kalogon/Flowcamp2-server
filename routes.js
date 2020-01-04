const express = require('express');
let User = require("./models/user");
const router = express.Router();
const flash = require("connect-flash");
router.use(function(req,res,next){
    res.locals.currentUser = req.user;
    /*res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");*/
    next();
});

 
router.post('/login', (req, res) => {
    console.log('who get in here post /login');
    var inputData;
    req.on('data', (data) => {
      inputData = JSON.parse(data);
    });
    
    req.on('end', () => {
        console.log(inputData);
        User.findOne({userid:inputData.user_id},(err,user)=>{
            if(err) return err;
            else if (user !=null){
                console.log('existing user');
            }
            else{
                let newuser = new User();
                newuser.userid=inputData.user_id;
                newuser.username=inputData.user_name;
                console.log(newuser);
                newuser.save(err=>{
                    if(err){
                        console.log(err);
                        return err;
                    }
                    console.log('good user created');
                })
                user=newuser;
            }
            console.log(user);
            res.write(JSON.stringify(user));
            res.end();
        })

    });
 
    
});

router.post('/phonePost', (req, res) => {
    console.log('who get in here post /users');
    let inputData;
    req.on('data', (data) => {
      inputData = JSON.parse(data);
    });
    
    req.on('end', () => {
        console.log(inputData);
        console.log(inputData[0]);
        console.log(inputData[1]);
        User.findOne({userid:inputData[0].user_id},(err,user)=>{
            console.log(user);
            if(err) return err;
        
            else{
                for(let i=1;i<inputData.length;i++){
                    user.addFriend(inputData[0].user_id,inputData[i].friend_name,inputData[i].friend_number);
                }        
            }
            res.write(JSON.stringify(user.friends));
            res.end();
        })

    });
 
    
});
router.post('/imagePost', (req, res) => {
    console.log('who get in here post /image');
    let inputData;
    req.on('data', (data) => {
      inputData = JSON.parse(data);
    });
    req.on('end', () => {
        console.log(inputData);
        console.log(inputData[0]);
        console.log(inputData[1]);
        User.findOne({userid:inputData[0].user_id},(err,user)=>{
            console.log(user);
            if(err) return err;
        
            else{
                for(let i=1;i<inputData.length;i++){
                    user.addImage(inputData[0].user_id,inputData[i].imageaddr);
                }        
            }
            res.write(JSON.stringify(user.imageaddrs));
            res.end();
        })

    });
 
});




module.exports = router;