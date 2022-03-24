# Backend Database Help

## Sending API Requests
app.post('',(req,res)=>{ 

}); 

app.get('',(req,res) =>{ 
 
}); 
  
app.delete('',(req,res)=>{ 
 
}); 
 
app.put('',(req,res)=>{ 
 
}); 
 
## Using Body in an API Request
'/api/insert' 
const varName = req.body.varName; 

## Using Parameters in an API Request
'/api/delete/:varName' 
const varName = req.params.varName;


## Passing Parameters For Database Queries
const sqlInsert = "INSERT INTO table_name (p1,p2,p3,p4,p5,p6) VALUE(?,?,?,?,?,?)" 

db.query(sqlInsert,[p1,p2,p3,p4,p5,p6],(err,result)=>{ 
    
    if(err){ 
        Put Error Message Here 
    }else{ 
        Put Successful Message or Checking Here 
    } 

}); 

## Responding to API Requests
res.send(object) 


# Frontend to Database Help

## Send Requests using Axios

### POST Request
Axios.post('', 
{ 
    key:value, 
    key:value 
} 
).then((res) => { 
    Action On Respond
}) 

### GET Request
Axios.get('').then((res)=>{ 
    Action on Data Retrieve 
}) 

### DELETE Request
Axios.delete('').then((res)=>{ 
    Action On Delete
}); 

### PUT Request
Axios.put('').then((res)=>{ 
    Action on Update 
}); 

### Individual Data Request
When needing a specific Data we might use parameters instead of the body use `` and ${varName} to pass it in the link Example (`api/delete/${varName}`) 

## Update Content on each Render
useEffect(() => {

},[]);

## Update Variable Content on Change
const [varName, setVarName] = useState(defaultValue);

## Map Items
{ 
    varList.map((val) =>{ 
        return( 
            Elements Here Like Table Data and the Likes 
        ); 
    }) 
} 