const http=require("http")
const fs=require("fs")
const url=require("url")
const queryString=require("querystring")
const PORT=3005
const app=http.createServer(async(req,res)=>{
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
    


    

})
app.listen(PORT)