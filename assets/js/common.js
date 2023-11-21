let home= document.getElementById("home");
let d_ = Number(localStorage.getItem("date"));
let m_ = Number(localStorage.getItem("month"));
let y_ = Number(localStorage.getItem("year"));

home.href=`/date/${d_}/?year=${y_}&&month=${m_}`;