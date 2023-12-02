
let table = document.getElementById("table");
let detail = document.getElementById("detail");
let data0 = document.getElementById("data0");
let _id = localStorage.getItem("id");
// console.log(typeof JSON.parse(_id));
let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let x = 0;

if (_id != "null") {
    detail.style.display = "none";
    let xhrReq = new XMLHttpRequest();
    xhrReq.open("get", `/calendar/habit/?id=${_id}`, true);
    xhrReq.send();
    xhrReq.onload = () => {

        let data = xhrReq.responseText;
        data = JSON.parse(data);
        // console.log( data.data[0].complStatus);
        // console.log(data.data);

        if (data.data.length == 0) {
            data0.style.display = "block";
            table.style.display = "none";
            data0.innerHTML = `<h3>${data.message}</h3>`
        }
        else {
            data0.style.display = "none";
            table.style.display = "table";
            // console.log(typeof data.data[0].allDate," ",data.data[0].allDate);
            let startingMonth = new Date(data.data[0].allDate).getMonth() + 1;
            let startingMonth2 = new Date(data.data[0].allDate).getMonth() + 1;

            let startingYear = new Date(data.data[0].allDate).getFullYear();
            let len = data.data.length;
            let endingMonth = new Date(data.data[len - 1].allDate).getMonth() + 1;
            let endingYear = new Date(data.data[len - 1].allDate).getFullYear();
            // let LastDateOfEndingMonth = new Date(endingYear, endingMonth, 0).getDate();
            // console.log(startingMonth," ", startingYear," ",endingMonth," ",endingYear);
            let tr = document.createElement("tr");
            let newTr = document.createElement("tr");
            let i = 1;
            let k = 0;
            for (let j = new Date(`${startingYear}-${startingMonth}-1`),o=0; j <= new Date(`${endingYear}-${endingMonth}-${new Date().getDate()}`); j.setDate(j.getDate() + 1)) {
            // for (let j = new Date(`${startingYear}-${9}-15`); j <= new Date(); j.setDate(j.getDate() + 1)) {

                let mon = j.getMonth() + 1;
                let yr = j.getFullYear();
                let lastDateOfThisMonth = new Date(yr, mon, 0).getDate();
                // console.log(mon, " ", " = ", startingMonth2);
                if (i % 2 == 0) {

                    let td = document.createElement("td");
                    // console.log(j.getDate()," "," = ",new Date( data.data[o].allDate.slice(0,10)).getDate())
                    if(j.getDate()==new Date( data.data[o].allDate.slice(0,10)).getDate() && j.getMonth()==new Date( data.data[o].allDate.slice(0,10)).getMonth() && j.getFullYear()==new Date( data.data[o].allDate.slice(0,10)).getFullYear()){
                        if(data.data[o].complStatus==true){
                            td.innerHTML = 
                            `<button class="green button"  title="Done"> <strong> ${j.getDate()} </strong>  </button>`
                            newTr.appendChild(td);
                        }else if(data.data[o].complStatus==false){

                            td.innerHTML = 
                            `<button class="red button"  title="Incomplete"> <strong> ${j.getDate()} </strong>  </button>`
                            newTr.appendChild(td);
                        }else{
                            td.innerHTML = 
                            `<button class="yellow button"  title="Not Done"> <strong> ${j.getDate()} </strong>  </button>`
                            newTr.appendChild(td);
                            }
                         o++;
                    }else{
                         td.innerHTML = 
                            `<button disabled class="button"> <strong> ${j.getDate()} </strong>  </button>`
                            newTr.appendChild(td);
                      }

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

                    if (x == 0) {
                        let t=document.createElement("tr");
                        t.className="t";
                        t.innerHTML=`<th colspan="7">${months[j.getMonth()]}-${j.getFullYear()} </th>`;
                        table.appendChild(t);
                        let tr = document.createElement("tr");
                        let dt = j.getDay();
                        let su = 7 - dt;
                        for (let ii = 0; ii < 7; ii++, dt++) {
                            if (dt > 0) {
                                if (ii == su) {
                                    dt = 0;
                                }
                            }
                            let th = document.createElement("th");
                            th.innerText = `${days[dt]}`
                            tr.appendChild(th);
                        }
                        table.appendChild(tr);
                    }
                    x++;
                    // console.log(days[j.getDay()]);
                    let td = document.createElement("td");
                    if(j.getDate()==new Date( data.data[o].allDate.slice(0,10)).getDate() && j.getMonth()==new Date( data.data[o].allDate.slice(0,10)).getMonth() && j.getFullYear()==new Date( data.data[o].allDate.slice(0,10)).getFullYear()){
                        if(data.data[o].complStatus==true){
                            td.innerHTML = 
                            `<button class="green button"  title="Done"> <strong> ${j.getDate()} </strong>  </button>`
                            tr.appendChild(td);
                        }else if(data.data[o].complStatus==false){

                            td.innerHTML = 
                            `<button class="red button"  title="Incomplete"> <strong> ${j.getDate()} </strong>  </button>`
                            tr.appendChild(td);
                        }else{
                            td.innerHTML = 
                            `<button class="yellow button"  title="Not Done"  > <strong> ${j.getDate()} </strong>  </button>`
                            tr.appendChild(td);
                            }
                         o++;
                    }else{
                         td.innerHTML = 
                            `<button disabled class="button" > <strong> ${j.getDate()} </strong>  </button>`
                            tr.appendChild(td);
                      }

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

                if (lastDateOfThisMonth == j.getDate()) {
                    i = 1;
                    k = 0;
                    tr = document.createElement("tr");
                    table.innerHTML += `<br>`
                }
                if (startingMonth2 != mon) {
                    startingMonth2 = mon;

                    if(x!=1){
                        let t=document.createElement("tr");
                        t.className="t";
                        t.innerHTML=`<th colspan="7">${months[j.getMonth()]}-${j.getFullYear()} </th>`;
                        table.appendChild(t);
                        let tr = document.createElement("tr");
                        let dt = j.getDay();
                        let su = 7 - dt;
                        for (let ii = 0; ii < 7; ii++, dt++) {
                            if (dt > 0) {
                                if (ii == su) {
                                    dt = 0;
                                }
                            }
                            let th = document.createElement("th");
                            th.innerText = `${days[dt]}`
                            tr.appendChild(th);
                        }
                        table.appendChild(tr);
                    }
                }
            }
        }
    }
} else {
    detail.style.display = "block";
}
