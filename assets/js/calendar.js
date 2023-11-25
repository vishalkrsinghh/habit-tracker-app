
let table = document.getElementById("table");
let detail = document.getElementById("detail");
let data0 = document.getElementById("data0");
let _id = localStorage.getItem("id");
// console.log(typeof JSON.parse(_id));

if (_id != "null") {
    detail.style.display = "none"; 
    let xhrReq = new XMLHttpRequest();
    xhrReq.open("get", `/calendar/habit/?id=${_id}`, true);
    xhrReq.send();
    xhrReq.onload = () => {

        let data = xhrReq.responseText;
        data = JSON.parse(data);
        console.log("calendarJS  ", " = ", data.data);
        
        if (data.data.length == 0) {
            data0.style.display="block";
            table.style.display="none";
            data0.innerHTML=`<h3>${data.message}</h3>`
        }
        else {
            data0.style.display="none";
            table.style.display="table";
            let startingMonth = new Date(data.data[0].allDate).getMonth() + 1;
            let startingYear = new Date(data.data[0].allDate).getFullYear();
            let len = data.data.length;
            let endingMonth = new Date(data.data[len - 1].allDate).getMonth() + 1;
            let endingYear = new Date(data.data[len - 1].allDate).getFullYear();
            let LastDateOfEndingMonth = new Date(endingYear, endingMonth, 0).getDate();
            // console.log(startingMonth," ", endingMonth," ",LastDateOfEndingMonth);
            let tr = document.createElement("tr");
            let newTr = document.createElement("tr");
            let i = 1;
            let k = 0;
            for (let j = new Date(`${startingYear}-${9}-1`); j <= new Date(`${endingYear}-${endingMonth}-${LastDateOfEndingMonth}`); j.setDate(j.getDate() + 1)) {

                // table.innerHTML+=`<div> ${j.getDate()} </div>`

                let mon = j.getMonth() + 1;
                let yr = j.getFullYear();
                let lastDateOfThisMonth = new Date(yr, mon, 0).getDate();
                // console.log(i);
                if (i % 2 == 0) {

                    // create a new tr and append into table.
                    let td = document.createElement("td");
                    // td.innerHTML=`${j.getDate()}`
                    td.innerText = `${j.getDate()}`
                    newTr.appendChild(td);
                    // newTr.innerHTML+=`<td>${j.getDate()}</td>`
                    table.appendChild(newTr);
                    k++;
                    if (k == 7) {
                        i++;
                        k = 0;
                        tr = document.createElement("tr");
                    }
                    if (i == 5) {
                        i = 1;
                    }
                } else {

                    let td = document.createElement("td");
                    // td.innerHTML=`${j.getDate()}`
                    td.innerText = `${j.getDate()}`
                    tr.appendChild(td);
                    // tr.innerHTML+=`<td>${j.getDate()}</td>`
                    table.appendChild(tr);
                    k++;
                    if (k == 7) {
                        i++;
                        k = 0;
                        newTr = document.createElement("tr");
                    }
                    if (i == 5) {
                        i = 1;
                    }
                    // console.log(i," "," : ", k)
                }
                // do the work print the dates in container div make container div as grid.

                if (lastDateOfThisMonth == j.getDate()) {
                    i = 1;
                    k = 0;
                    tr = document.createElement("tr");
                    // append horizontal line hr tag in the container.
                    table.innerHTML += `<br>`
                    let tbody = document.getElementsByTagName("tbody");
                    // console.log(tbody);
                    for (let w = 0; w < tbody.length; w++) {
                        tbody[w].insertAdjacentHTML("afterbegin", `<tr> <th>sun</th><th>mon</th><th>tue</th><th>wed</th><th>thr</th><th>fri</th><th>sat</th> </tr>`);

                    }
                    // console.log("hr");
                }
            }
        }
    }
} else {
    detail.style.display = "block";
}
