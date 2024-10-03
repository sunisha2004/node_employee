async function getEmployee() {

    const res = await fetch("http://localhost:3005/getemployee")
    console.log(res);
    const data = await res.json()
    console.log(data)
     str = ``
    data.map((dt,index) => {
        console.log(dt)

        str+=`
       
        <div id="card">
            <a href="#">
                <img src="../../image/person.png" alt="no image">
                <div>
                    <div id="EmpID">${dt.empID}</div>
                    <div id="Name">${dt.Name}</div>
                    <div id="designation">${dt.designation}</div>
                    <a href="../pages/detail.html?id=${index}"><button>Info</button></a>
                </div>
            </a>
        </div>
        `
    })
    document.getElementById('card-container').innerHTML=str
    
}
getEmployee()