let url = window.location.href;
let urlParams = new URLSearchParams(url.split("?")[1]);
let id = urlParams.get("id");
let data;
console.log(id);


async function getEdit() {
    const res = await fetch("http://localhost:3005/getedit")
    console.log(res);
    const data=await res.json()
    console.log(data[id]);
    datas=data[id]
    str=``
    str+=`
     <div class="image">
                <img src="../../image/person.png" alt="no image">
            </div>
            <div class="details">
                <input type="text" placeholder="Employee ID" id="EmpID" name="EmpID" value="${datas.empID}" disabled=true>
                <input type="text" placeholder="Name" id="Name" name="Name" value="${datas.Name}">
                <input type="text" placeholder="Designation" id="designation" name="designation" value="${datas.designation}">
                <input type="text" placeholder="Salary" id="salary" name="salary" value="${datas.salary}">
                <input type="text" placeholder="Experience" id="experience" name="experience" value="${datas.experience} Years">
                <input type="text" placeholder="Email" id="email" name="email" value="${datas.email}">
                <input type="text" placeholder="Phone" id="phone" name="phone" value="${datas.phone}">
                <a href="./index.html"><button onclick="handleSave('${datas._id}')">Save</button></a>
            </div>`

            document.getElementById('main_2').innerHTML=str
    
    
    
}
getEdit()

async function handleSave(a) {
    console.log(a);

    const employeeId=document.getElementById(`EmpID`).value
    const name=document.getElementById(`Name`).value
    const designation=document.getElementById(`designation`).value
    const salary=document.getElementById(`salary`).value
    const experience=document.getElementById(`experience`).value
    const email=document.getElementById(`email`).value
    const phone=document.getElementById(`phone`).value
    console.log(employeeId,name,designation,salary,experience,email,phone);

    const data={a,employeeId,name,designation,salary,experience,email,phone}
    
    const res=await fetch("http://localhost:3005/update",{
        method:"PUT",
        headers:{"content-Type":"text/json"},
        body:JSON.stringify(data)
    })
    console.log(res);
    if(res.status==200)
    {
        alert("success...")
        getEdit()
    }else{
        alert("failed...")
    }

}

