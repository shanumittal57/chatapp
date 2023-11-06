const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
// const db = require("./dbConnection");
const {Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const encryptdecrypt = require("./helper");var router = express.Router();



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: 3308,
    database: "chatapp"
})


db.connect(function (err) {
    if (err) {
        return res.send({ status: 500, message: 'Db connectivity Failed' })
        ;
    };
});

//Cors allow & app settings
app.use(cors());
app.use(express.json());


//Making Routes


app.post('/register', (req, res) => {
    const data = req.body;
    db.query(`Select * from users where email = "${data.email}"`, function (err, result) {
        if (err) {
            return res.send({ status: 500, message: 'Insertion Failed'+err.message })
            
        } else {
            if(result.length > 0){
                return res.send({ status: 500, message: 'User already Exists! Please login.' })
                
            }else{
                const date = new Date();
                const password = encryptdecrypt.encrypt(data.password)
                db.query(`Insert into users(name,email,password,created_at,status) values("${data.name}", "${data.email}","${password}", "${date}", 1)`, function (err, result) {
                    if (err) {
                        return res.send({ status: 500, message: 'Insertion Failed' })
                        
                    } else {
                        return res.send({ status: 200, message: 'User Inserted!' })
                    }
                });

            }
        }
    })
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    db.query(`Select * from users where email = "${email}"`, function (err, result) {
        if (err) {
            return res.send({ status: 500, message: 'Internal Error'+err.message })
            ;
        } else {
            if(result.length > 0){
                const passwordDecrypted = encryptdecrypt.decrypt(result[0].password)
                if(passwordDecrypted !== password){
                    return res.send({ status: 500, message: 'Wrong Password' })
                    ;
                }else{
                    const token = jwt.sign({ email}, "my@fdvcebaj#jgysts*&jb",{ expiresIn: 5})
                    return res.send({ status: 200, message: 'Logging you in', token, userData:{name: result[0].name, email: result[0].email} })
                }                
            }else{                
                return res.send({ status: 500, message: 'User not Found! Please register.' })
                
            }
        }
    })
})
//SocketConnections
io.on('connection', (socket) =>{
    console.log('User connected!');
    socket.on('send', (message)=>{
        io.emit('send', (message))
    });
    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    })
})

app.get('/chat', (req,res)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!=='undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, "my@fdvcebaj#jgysts*&jb", function (err,data){
      
          if(!(err && typeof data=== 'undefined')) {
       
            req.userData = {email:data.email}
            return res.send({ status: 200, message: 'Success' })
        }else{
            return res.send({ status: 500, message: 'Session expired' })
              ;
        }
        })
      }
    //   
})

//Starting server
server.listen(5000, () => {
    console.log('Congrats! Server running at 5000')
})