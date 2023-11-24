let pencil= document.getElementsByClassName("_pencil");
let calendar= document.getElementsByClassName("calendar");
let updatingHabit= document.getElementById("updatingHabit");
let hide_unhide_onupdate= document.getElementById("hide_unhide_onupdate");
let close= document.getElementsByClassName("close")[0];
let updateTitle= document.getElementById("updateTitle");
let updateDescription= document.getElementById("updateDescription");
let updatesaveform= document.getElementById("updatesaveform");

for(let i=0; i<pencil.length; i++){
    // /delete_habit/
    pencil[i].onclick= ()=>{
        let idToUpdate=pencil[i].value
        updatesaveform.action=`/update_habit/${idToUpdate}`;
        let {title,desc}=pencil[i].dataset
        updateTitle.value=title;
        updateDescription.value=desc;
        console.log(idToUpdate, " title== ", title, " desc= ", desc);
        updatingHabit.style.display="flex";
        updatingHabit.style.alignItems="center";
        updatingHabit.style.flexDirection="column";
        hide_unhide_onupdate.style.display="none";
    }
}
for(let i=0; i<calendar.length; i++){
    calendar[i].onclick= ()=>{
        let {id}=calendar[i].dataset;
        localStorage.setItem("id", id);
    }
}

let hide = () => {
    hide_unhide_onupdate.style.display = "block";
    updatingHabit.style.display = "none";
}

close.addEventListener("click", hide);