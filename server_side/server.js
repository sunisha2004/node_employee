const http=require("http")
const fs=require("fs")
const url=require("url")
const queryString=require("querystring")
const{MongoClient,ObjectId}=require("mongodb");
const client=new MongoClient("mongodb://127.0.0.1:27017/");

const PORT=3005
const app=http.createServer(async(req,res)=>{

    const db=client.db("EMPLOYEES");
    const collection=db.collection("EmployeeDetails");


    const path=url.parse(req.url);
    console.log(path);

    if(path.pathname=="/"){
        res.writeHead(200,{"content-Type":"text/html"});
        res.end(fs.readFileSync("../client_side/pages/index.html"));
    }
    else if(path.pathname=="/css/index.css"){
        res.writeHead(200,{"content-Type":"text/css"});
        res.end(fs.readFileSync("../client_side/css/index.css"));
    }
    else if(path.pathname=="/image/person.png"){
        res.writeHead(200,{"content-Type":"image/png"});
        res.end(fs.readFileSync("../image/person.png"));
    }
    else if(path.pathname=="/pages/addEmployee.html"){
        res.writeHead(200,{"content-Type":"text/html"});
        res.end(fs.readFileSync("../client_side/pages/addEmployee.html"));
    }
    else if(path.pathname=="/css/addEmp.css"){
        res.writeHead(200,{"content-Type":"text/css"});
        res.end(fs.readFileSync("../client_side/css/addEmp.css"));
    }
    else if(path.pathname=="/pages/detail.html"){
        res.writeHead(200,{"content-Type":"text/html"});
        res.end(fs.readFileSync("../client_side/pages/detail.html"));
    }
    else if(path.pathname=="/css/detail.css"){
        res.writeHead(200,{"content-Type":"text/css"});
        res.end(fs.readFileSync("../client_side/css/detail.css"));
    }
    else if(path.pathname=="/pages/edit.html"){
        res.writeHead(200,{"content-Type":"text/html"});
        res.end(fs.readFileSync("../client_side/pages/edit.html"));
    }
    else if(path.pathname=="/css/edit.css"){
        res.writeHead(200,{"content-Type":"text/css"});
        res.end(fs.readFileSync("../client_side/css/edit.css"));
    }
    else if(path.pathname=="/pages/index.html"){
        res.writeHead(200,{"content-Type":"text/html"});
        res.end(fs.readFileSync("../client_side/pages/index.html"))

    }
    else if(path.pathname=="/js/index.js"){
        res.writeHead(200,{"content-Type":"text/js"});
        res.end(fs.readFileSync("../client_side/js/index.js"))

    }
    else if(path.pathname=="/js/detail.js"){
        res.writeHead(200,{"content-Type":"text/js"});
        res.end(fs.readFileSync("../client_side/js/detail.js"))

    }
    else if(path.pathname=="/js/edit.js"){
        res.writeHead(200,{"content-Type":"text/js"});
        res.end(fs.readFileSync("../client_side/js/edit.js"))

    }

    if(path.pathname=="/submit"&&req.method=="POST"){
        console.log("hai");
        let body="";
        req.on("data",(chunks)=>{
            console.log(chunks);
            body+=chunks.toString();
            console.log(body);
            
            
        });
        req.on("end",async()=>{
            if(body!==null){
                const formData=queryString.parse(body);
                console.log(formData);
                collection.insertOne(formData).then(()=>{
                    console.log("data added");
                    
                }).catch((error)=>{
                    console.log(error);
                    
                })

                res.writeHead(200,{"content-Type":"text/html"});
                res.end(fs.readFileSync("../client_side/pages/index.html"));
                
            }
        })
        

    }

    if(path.pathname=="/getemployee"&&req.method=="GET"){
        const data=await collection.find().toArray();
        const json_data=JSON.stringify(data)
        console.log(json_data);

        res.writeHead(200,{"content-Type":"text/json"})
        res.end(json_data)
        
    }

    if(path.pathname=="/getdetail"&&req.method=="GET"){
        const data=await collection.find().toArray();
        const json_data=JSON.stringify(data)
        console.log(json_data);

        res.writeHead(200,{"content-Type":"text/json"})
        res.end(json_data)
        
    }
    else if(path.pathname=="/getedit"&&req.method=="GET"){
        const data=await collection.find().toArray();
        const json_data=JSON.stringify(data)
        console.log(json_data);

        res.writeHead(200,{"content-Type":"text/json"})
        res.end(json_data)
        
    }

    
    else if(path.pathname=="/delete"&&req.method=="DELETE"){
        console.log("------delete-----");
        
        let body=""
        req.on('data',(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        });
        req.on('end',async()=>{
            let _id=new ObjectId(body);
            console.log(_id);
            await collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"content-Type":"text/plain"})
                res.end("success");
            }).catch(()=>{
                res.writeHead(200,{"content-Type":"text/plain"})
                res.end("Fail");
            })
            
        })


    }

    else if(path.pathname=="/update"&&req.method=="PUT"){
        console.log("============================================================================");
        
        let body="";
        req.on('data',(chunks)=>{
            body+=chunks.toString();
        });
        req.on('end',async()=>{
            let data=JSON.parse(body);
            console.log(data.a);
            let _id=new ObjectId(data.a)
            console.log(_id);
            let updateData={empID:data.employeeId,Name:data.name,designation:data.designation,salary:data.salary,experience:data.experience,email:data.email,phone:data.phone}
            await collection.updateOne({_id},{$set:updateData}).then(()=>{
                console.log("updated successfully");
                res.writeHead(200,{"content-Type":"text/plain"})
                res.end("success");
                
            }).catch((error)=>{
                console.log(error);
                res.writeHead(404,{"content-Type":"text/plain"})
                res.end("Fail");
                
            })
            
            
        })
    }


    

})
app.listen(PORT)