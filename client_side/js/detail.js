let url = window.location.href;
let urlParams = new URLSearchParams(url.split("?")[1]);
let id = urlParams.get("id");
let data;
console.log(id);


async function getDetail() {
    const res = await fetch("http://localhost:3005/getdetail")
    console.log(res);
    const data=await res.json()
    console.log(data[id]);
    datas=data[id]
    str=``
    str+=`
     <div class="details">
                <div class="leftside">
                    <img src="../../image/person.png" alt="no image">
                </div>
                <div class="rightside">
                    <div class="inscard">
                    <div id="EmpID" name="EmpID" class="instxt">Employee ID:</div>
                    <div>${datas.empID}</div>
                    </div>
                    <div class="inscard">
                    <div id="Name" name="Name" class="instxt">Name:</div>
                    <div>${datas.Name}</div>
                    </div>
                    <div class="inscard">
                    <div id="designation" name="designation" class="instxt">Designation:</div>
                    <div>${datas.designation}</div>
                    </div>
                    <div class="inscard">
                    <div id="salary" name="salary" class="instxt">Salary:</div>
                    <div>${datas.salary}</div>
                    </div>
                    <div class="inscard">
                    <div id="experience" name="experience" class="instxt">Experience:</div>
                    <div>${datas.experience}</div>
                    </div>
                    <div class="inscard">
                    <div id="email" name="email" class="instxt">Email:</div>
                    <div>${datas.email}</div>
                    </div>
                    <div class="inscard">
                    <div id="phone" name="phone" class="instxt">Phone:</div>
                    <div>${datas.phone}</div>
                    </div>
                </div>
            </div>
            <div>
                <a href="./index.html"><button>Back</button></a>
                <a href="../pages/edit.html?id=${id}"><button>Edit</button></a>
                <a href="./index.html"><button onclick="handleDelete('${datas._id}')">Delete</button></a>
            </div>`

            document.getElementById('empdetails').innerHTML=str
    
    
    
}
getDetail()


async function handleDelete(id) {
    let confirmation = confirm("Are you sure you want to delete this item?");

    if (confirmation) {
        let res = await fetch("http://localhost:3005/delete", {
            method: "DELETE",
            headers: { "Content-Type": "text/plain" },
            body: id
        });

        if (res.status == 200) {
            alert("Success");
            getDetail();  
        } else {
            alert("Failed");
        }
    } else {
        alert("Deletion canceled");
    }
}
