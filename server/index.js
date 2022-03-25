const express = require('express')
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser')

const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'password',
    database:'db_sis'
});

app.use(cors({credentials: true, origin: true}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/students',(req,res)=>{

    const sqlSelect = "SELECT * FROM tbl_students";

    db.query(sqlSelect,(err,result)=>{

        if(err){ 
            res.send(err);
        }else{ 
            res.send(result);
        } 

    });

});

app.get('/api/student/:StudentID',(req,res)=>{

    const StudentID = req.params.StudentID;

    const sqlSelect = "SELECT * FROM tbl_students WHERE StudentID = ?";

    db.query(sqlSelect,StudentID,(err,result)=>{

        if(err){ 
            res.send(err);
        }else{ 
            res.send(result);
        } 

    });

});

app.delete('/api/student/delete/:StudentID',(req,res)=>{ 

    const StudentID = req.params.StudentID;
 
    const sqlDelete = "DELETE FROM tbl_students WHERE StudentID = ?" 

    db.query(sqlDelete,StudentID,(err,result)=>{ 
        
        if(err){ 
            res.send(err);
        }else{ 
            res.send(result);
        } 

    }); 

}); 

app.put('/api/student/update/:StudentID',(req,res)=>{ 

    const StudentID = req.params.StudentID;

    const FirstName = req.body.FirstName;
    const MiddleName = req.body.MiddleName;
    const LastName = req.body.LastName;
    const Address = req.body.Address;
    const EmailAddress = req.body.EmailAddress;
    const Birthday = req.body.Birthday;
    const Course = req.body.Course;
    const Section = req.body.Section;
    const Year = req.body.Year;

    const sqlUpdate = "UPDATE tbl_students SET FirstName = ?, MiddleName = ?, LastName = ?, Address = ?, EmailAddress = ?, Birthday = ?, Course = ?, Section = ?, Year = ? WHERE StudentID = ?" 

    db.query(sqlUpdate,[FirstName,MiddleName,LastName,Address,EmailAddress,Birthday,Course,Section,Year,StudentID],(err,result)=>{ 
        
        if(err){ 
            res.send(err);
        }else{ 
            res.send(result);
        } 

    }); 

});

app.post('/api/student/insert',(req,res)=>{ 

    const FirstName = req.body.FirstName;
    const MiddleName = req.body.MiddleName;
    const LastName = req.body.LastName;
    const Address = req.body.Address;
    const EmailAddress = req.body.EmailAddress;
    const Birthday = req.body.Birthday;
    const Course = req.body.Course;
    const Section = req.body.Section;
    const Year = req.body.Year;

    const sqlInsert = "INSERT INTO tbl_students (FirstName,MiddleName,LastName,Address,EmailAddress,Birthday,Course,Section,Year) VALUE(?,?,?,?,?,?,?,?,?)" 

    db.query(sqlInsert,[FirstName,MiddleName,LastName,Address,EmailAddress,Birthday,Course,Section,Year],(err,result)=>{ 
        
        if(err){ 
            res.send(err);
        }else{ 
            res.send(result);
        } 

    }); 

}); 


app.listen(3001, () =>{
    console.log("Running on Port 3001")
});