let habitsaveform = document.getElementById("habitsaveform");

let container = document.getElementById("container")
let currentDateInfo = document.getElementById("currentDateInfo");
let addingHabit = document.getElementsByClassName("addingHabit")[0];
let dv = document.getElementsByClassName("dv")[0];
let close = document.getElementsByClassName("close")[0];
let add = document.getElementsByClassName("add")[0];
let btn= document.getElementsByClassName("btn");

let date = new Date();

console.log(date.getMonth());
console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
let noOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
let todayDate = date.getDate();
let currentMonth = date.getMonth();  // give current month from 0 
let currentYear = date.getFullYear();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


for (let i = 1; i <= noOfDays; i++) {

    container.innerHTML += `<button class="btn"> <a href="/date/${i}/?year=${date.getFullYear()}&&month=${date.getMonth() + 1}"> <span class="span"> ${i} </span> </a> </button> `

    // let btn= document.getElementsByClassName("btn");
    // if(i>todayDate){
    //     console.log(i);
    //     btn[i].setAttribute("disabled", "");
    //     // for(let j=0; j<btn.length){

    //     // }
    // }
}


let a = document.getElementsByTagName("a");
let href = window.location.href;
let arr = href.split("/");
btn[arr[4]-1].style.backgroundColor="cyan";
console.log(arr);
let date1 = Number(arr[4]);
let year = Number(arr[5].slice(6, 10));
let month = Number(arr[5].slice(18)); // give  month from 1
// console.log(date1,month,year);
localStorage.setItem("date", date1);
localStorage.setItem("year", year);
localStorage.setItem("month", month);
for (let i = 0; i < a.length; i++) {
    a[i].onclick = (e) => {
        // e.preventDefault(); // jabtak xmlhttp req nahi karta tab tak isko off rahne de.

        // habitsaveform.setAttribute("action",`/date/${date}/?year=${year}&&month=${month}`)  // if preventdefault on then on this. if prevent default off then off this.
    };
}

let d = Number(localStorage.getItem("date"));
let m = Number(localStorage.getItem("month"));
let y = Number(localStorage.getItem("year"));
// console.log(typeof d);
if (todayDate != d || currentMonth + 1 != m || currentYear != y) {
    currentDateInfo.innerHTML = `<h3> ${d}-${months[m - 1]}-${y} </h3>`
} else if (todayDate == d && currentMonth + 1 == m && currentYear == y) {
    currentDateInfo.innerHTML = `<h3> Today </h3>`
}

let show = () => {
    dv.style.display = "none";
    addingHabit.style.display = "block";
}
let hide = () => {
    dv.style.display = "block";
    addingHabit.style.display = "none";
}

add.addEventListener("click", show);
close.addEventListener("click", hide);