let home= document.getElementById("home");
let logout= document.getElementById("logout");
let d_ = Number(localStorage.getItem("date"));
let m_ = Number(localStorage.getItem("month"));
let y_ = Number(localStorage.getItem("year"));

home.href=`/date/${d_}/?year=${y_}&&month=${m_}`;

logout.onclick=()=>{
    let id= localStorage.getItem("id");
    if(id!=null){
        localStorage.setItem("id","null");
    }
}