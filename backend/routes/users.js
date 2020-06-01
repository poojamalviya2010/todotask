var express = require('express');
var router = express.Router();
const sequelize = require("../models/Users")
var jwt = require('jsonwebtoken');
const multer = require('multer');

process.env.SECRET_KEY = 'secret'
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (header !== 'undefined') {
    const token = header;
    req.token = token;
    next();
  } else {
    res.sendStatus(403)
  }
}


router.post('/signUp', function(req, res){
  let form = req.body.formValues;
  console.log("res", form)
  console.log("res", req.body)
  sequelize.query("INSERT INTO user(user_type, status, username, email, password, dob, designation) VALUES (?,?,?,?,?,?,?)",{type:sequelize.QueryTypes.INSERT,raw:true,replacements:["user","inactive",req.body.full_name,req.body.email,req.body.password, req.body.dob, req.body.designation]}).then(rows=>{
    console.log(rows)
    res.json({success:true})
  })
})

router.get('/check_email',(req,res)=>{
  let value=req.param("email")
  sequelize.query("SELECT email FROM user WHERE email=?",{type:sequelize.QueryTypes.SELECT,raw:true,replacements:[value]}).then(rows=>{
    console.log(rows)
    if(rows.length>0){
      res.json({found:true, message:"Email Already Exist"})
    }else{
      res.json({found:false, message:""})
    }
  })
})

router.post('/login',function(req,res){
  let email = req.body.email;
  sequelize.query("SELECT * FROM user WHERE email = ? and password = ? and status = 'active'",{type:sequelize.QueryTypes.SELECT, raw:true,  replacements: [email, req.body.password]}).then(rows => {
      if (rows.length == 0) {
        res.json({
          success:false,
          message:'Wrong Username Or Password',
          loginmsg:'Or May Be Admin not approve the registration please login after some time'     
        });
      } else {
        let id = rows[0].id;
        let token = jwt.sign({email: email, id:id}, process.env.SECRET_KEY, {
          expiresIn: '24h'
        })
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,
          rows
        });
      }
    })
})


router.post('/UserByAdmin', function(req, res){
  console.log("res", req.body)
  sequelize.query("INSERT INTO user(user_type, status, username, email, password, dob, designation) VALUES (?,?,?,?,?,?,?)",{type:sequelize.QueryTypes.INSERT,raw:true,replacements:["user",req.body.status,req.body.name,req.body.email,req.body.password, req.body.dob, req.body.designation]}).then(rows=>{
    console.log(rows)
    res.json({success:true})
  })
})

router.get("/show_users",(req,res)=>{
  sequelize.query("SELECT * FROM user where user_type = 'user'",{type:sequelize.QueryTypes.SELECT,raw:true}).then(rows=>{
    res.json(rows)
  })
})


router.get("/show_user_by_id",(req,res)=>{
  let id = req.param("id");
  sequelize.query("SELECT * FROM user where user_type = 'user' AND id = ?",{type:sequelize.QueryTypes.SELECT,raw:true,replacements:[id]}).then(rows=>{
    res.json(rows)
  })
})


router.delete("/deleteUser",(req,res)=>{
  let id = req.param("id")
  sequelize.query("DELETE FROM user WHERE id = ?",{type:sequelize.QueryTypes.DELETE,raw:true,replacements:[id]}).then(rows=>{
    console.log(rows)      
    res.json({success:true})
      
  })
})

router.post('/update_user',(req,res)=>{
  console.log("form values",req.body)
    let id = req.param("id")
      sequelize.query("UPDATE user set status=?, username=?,email=?,dob=?,designation=? where id =? ",{type:sequelize.QueryTypes.UPDATE,raw:true,replacements:[req.body.status,req.body.name,req.body.email, req.body.dob, req.body.designation, req.body.id]}).then(rows=>{
         console.log(rows[0])        
        res.json({success:true})
       })  
})


router.post('/AddTodo', function(req, res){
  console.log("res", req.body)
  sequelize.query("INSERT INTO todo(user_id, todo_task) VALUES (?,?)",{type:sequelize.QueryTypes.INSERT,raw:true,replacements:[req.body.user_id, req.body.todo]}).then(rows=>{
    console.log(rows)
    res.json({success:true})
  })
})

router.get("/show_todo_by_id",(req,res)=>{
  let id = req.param("id");
  sequelize.query("SELECT todo.*, user.username FROM `todo` join user on user.id = todo.user_id where user_id = ?",{type:sequelize.QueryTypes.SELECT,raw:true,replacements:[id]}).then(rows=>{
    res.json(rows)
  })
})

router.delete("/deleteTask",(req,res)=>{
  let id = req.param("id")
  sequelize.query("DELETE FROM todo WHERE id = ?",{type:sequelize.QueryTypes.DELETE,raw:true,replacements:[id]}).then(rows=>{
    console.log(rows)      
    res.json({success:true})
      
  })
})

router.get("/todo_by_id",(req,res)=>{
  let id = req.param("id");
  sequelize.query("SELECT todo.*, user.username FROM `todo` join user on user.id = todo.user_id where id = ?",{type:sequelize.QueryTypes.SELECT,raw:true,replacements:[id]}).then(rows=>{
    res.json(rows)
  })
})

router.post('/update_todo',(req,res)=>{
  console.log("form values",req.body)
    let id = req.param("id")
      sequelize.query("UPDATE todo set todo_task=? where id =? ",{type:sequelize.QueryTypes.UPDATE,raw:true,replacements:[req.body.todo_task, req.body.id]}).then(rows=>{
         console.log(rows[0])        
        res.json({success:true})
       })  
})

router.get("/show_task",(req,res)=>{
  // let id = req.param("id");
  sequelize.query("SELECT * FROM `todo` ",{type:sequelize.QueryTypes.SELECT,raw:true}).then(rows=>{
    res.json(rows)
  })
})

module.exports = router;