let habitsaveform= document.getElementById("habitsaveform");

let container= document.getElementById("container")
let currentDateInfo=document.getElementById("currentDateInfo");
let addingHabit= document.getElementsByClassName("addingHabit")[0];
let dv= document.getElementsByClassName("dv")[0];
let close= document.getElementsByClassName("close")[0];
let add= document.getElementsByClassName("add")[0];

let date=new Date();

console.log(date.getMonth());
console.log(new Date(date.getFullYear(),date.getMonth()+1,0).getDate());
let noOfDays=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
let todayDate=date.getDate();
let currentMonth=date.getMonth();  // give current month from 0 
let currentYear= date.getFullYear();
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

habitsaveform.setAttribute("action",`/savehabit/${todayDate}/?year=${currentYear}&&month=${currentMonth+1}`)
// currentDateInfo.innerHTML=`<h3> ${todayDate}-${months[currentMonth]}-${currentYear} </h3>`
currentDateInfo.innerHTML=`<h3> Today </h3>`
for(let i=1;i<=noOfDays; i++){

    container.innerHTML+=` <a href="/date/${i}/?year=${date.getFullYear()}&&month=${date.getMonth()+1}"> <span class="span"> ${i} </span> </a> `
}


let a=document.getElementsByTagName("a")
// console.log(a[0])


for(let i=0; i<a.length; i++){
    a[i].onclick=(e)=>{
        e.preventDefault();
        let href=a[i].getAttribute("href");
        let arr =href.split("/");
        let date= Number(arr[2]);
        let year= Number(arr[3].slice(6,10));
        let month= Number(arr[3].slice(18)); // give  month from 1

        habitsaveform.setAttribute("action",`/savehabit/${date}/?year=${year}&&month=${month}`)
        if(todayDate!=date || currentMonth!=month || currentYear!=year){
            currentDateInfo.innerHTML=`<h3> ${date}-${months[month-1]}-${year} </h3>`
        }
        for(let j=0; j<i; j++){
            a[j].removeAttribute("class")
        }
        // console.log(i, "is clicked");
        a[i].setAttribute("class","a");

        for(let k=i+1; k<a.length; k++){
            a[k].removeAttribute("class")
        }
    };
}


let show=()=>{
    dv.style.display="none";
    addingHabit.style.display="block";
}
let hide=()=>{
    dv.style.display="block";
    addingHabit.style.display="none";
}

add.addEventListener("click", show);
close.addEventListener("click", hide);