
let h3= document.getElementsByTagName("h3")
let form1= document.getElementsByClassName("form1")[0];
let form2= document.getElementsByClassName("form2")[0];

let show=()=>{
    form1.style.display="flex";
    form2.style.display="none";
    h3[0].style.borderBottom="3px solid blue";
    h3[1].style.borderBottom="none";
}
let show1=()=>{
    form2.style.display="flex";
    form2.style.justifyContent="center"
    form1.style.display="none";
    h3[1].style.borderBottom="3px solid blue";
    h3[0].style.borderBottom="none";
}
h3[0].addEventListener("click", show )
h3[1].addEventListener("click", show1 )