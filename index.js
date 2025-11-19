let ajouter = document.querySelector(".add");
let modal_1 = document.querySelector(".modal");
let btn_exp = document.querySelector(".btn-add_exp");
let btn_annule = document.querySelector(".btn-annule");
let inputP = document.getElementById("Photo");
let photo_f = document.getElementById("photo-form");

ajouter.addEventListener("click", () =>{
    modal_1.style.display = 'flex'
})

btn_annule.addEventListener("click", () =>{
    modal_1.style.display = 'none'
})

inputP.addEventListener("input", () =>{
    const url = inputP.ariaValueMax.trim();
    if(url) {
        photo_f.src = url;
        photo_f.style.display = "block"
    } else {
        photo_f.style.display = "none";
    }
})

