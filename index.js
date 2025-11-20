const ajouter = document.querySelector(".add");
const modal_1 = document.querySelector(".modal");

const btn_exp = document.querySelector(".btn-add_exp");
const experiences = document.querySelector("#expériences");

const btn_annule = document.querySelector(".btn-annule");
const btn_enr = document.querySelector(".btn-enregistre");

const inputP = document.getElementById("Photo");
const photo_f = document.getElementById("photo-form");

const formul = document.querySelector(".formulaire");


const modal2 = document.querySelector(".modal_2");
const cardContainer = document.querySelector(".card");
const btn_zone = document.querySelectorAll(".btn-zone");

const modal_3 = document.querySelector(".modal-3");
const assignList = document.querySelector(".assign-list");
const btnCloseAssign = document.querySelector(".close-assign");


let roleInReception = ["Receptionniste", "Manager", "Nettoyage"];
let roleInServeurs = ["Technicien", "Manager", "Nettoyage"];
let roleInSecurite = ["Agent", "Manager", "Nettoyage"];
let roleInPersonnel = ["Agent", "Manager", "Nettoyage", "Autres rôles", "Techniciens IT", "Receptionniste"];
let roleInArchives = ["Manager"];
let roleInConference = ["Agent", "Manager", "Nettoyage", "Autres rôles", "Techniciens IT", "Receptionniste"];
    
const nameR = /^[A-Za-zÀ-ÖØ-ÿ\s'-]{3,30}$/;
const emailR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneR = /^(\+?\d{1,3})?[-.\s]?\d{6,14}$/;

let personnes = [
    {
        id: GenrerId(),
        nom: "Amal",
        role: "Receptionniste",
        Photo: "https://avatar.iran.liara.run/public/girl",
        email: "amal.aaa@example.com",
        tél: "+212612345678",
        exper: [
            {
                title: "Assistante d’accueil",
                start: "2021-01-01",
                end: "2023-05-01",
                desc: "Accueil des clients et gestion des appels."
            }
        ]
    }
];

function GenrerId(){
    return Date.now();
}

ajouter.addEventListener("click", () =>{
    modal_1.style.display = 'flex'
})

btn_annule.addEventListener("click", () =>{
    modal_1.style.display = 'none'
})

inputP.addEventListener("input", () =>{
    const url = inputP.value.trim();
    if(url) {
        photo_f.src = url;
        photo_f.style.display = "block"
    } else {
        photo_f.style.display = "none";
    }
})

btn_exp.addEventListener('click', () =>{
    const template = document.createElement('div');
    
    template.innerHTML = `
                <div class="exp block border rounded-md p-3 bg-gray-50">
                  <div class="flex justify-between items-start gap-3">
                    <div class="flex-1">
                      <label class="block text-sm">Poste</label>
                      <input name="exp-title" type="text" class="w-full border rounded-md px-2 py-1" required />
                      <div class="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <label class="block text-sm">Date début</label>
                          <input name="exp-start" type="date" class="w-full border rounded-md px-2 py-1" required />
                        </div>
                        <div>
                          <label class="block text-sm">Date fin</label>
                          <input name="exp-end" type="date" class="w-full border rounded-md px-2 py-1" required />
                        </div>
                      </div>
                      <label class="block text-sm mt-2">Description</label>
                      <textarea name="exp-desc" rows="2" class="w-full border rounded-md px-2 py-1"></textarea>
                    </div>

                    <div class="flex flex-col gap-2">
                      <button class="btn-remove-exp px-2 py-1 rounded-md bg-red-500 text-white" type="button">Supprimer</button>
                    </div>
                  </div>
                </div>
              `;

    template.querySelector(".btn-remove-exp").addEventListener("click", () => {
        template.remove();
    });

     experiences.appendChild(template);
})



formul.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tél = document.getElementById("tél").value;

    if(!nameR.test(nom)){
        alert("Nom invalide");
        return;
    }

    if(email && !emailR.test(email)){
        alert("Email invalide");
        return;
    }
    if(tél && !phoneR.test(tél)){
        alert("Numero de telephone invalide");
        return;
    }

    const exper = [];
    let dateD = true;
   
    experiences.querySelectorAll(".exp").forEach(exp => {
        const title = exp.querySelector('input[name="exp-title"]').value;
        const start = exp.querySelector('input[name="exp-start"]').value;
        const end = exp.querySelector('input[name="exp-end"]').value;
        const desc = exp.querySelector('textarea[name="exp-desc"]').value;

    if(start !== "" && end !== "" && start>end){
        alert("La date de début doit être inférieure à la date de fin.")
        dateD = false;
        return;
    }
    exper.push({title, start, end, desc});
})

    if(!dateD) return;

    const id = GenrerId();

    const personne = {
        id,
        nom,
        role: document.getElementById("role").value,
        Photo: document.getElementById("Photo").value || "https://via.placeholder.com/150",
        email,
        tél,
        exper: exper
    };

    personnes.push(personne);

    personnes.forEach(personne => {

    const card = document.createElement("div");
    card.classList.add("p-1", "m-3", "flex", "items-center");

    card.innerHTML = `
             <img src="${personne.Photo}" alt="avatar" class="img-avatar">
                <h5 class="mt-5">${personne.nom}</h5>
                <button type="button" class="edit">Edit</button>
    `;

    card.addEventListener("click", () => openModal2(personne));

    cardContainer.appendChild(card);

    modal_1.style.display = 'none';
    formul.reset();
    experiences.innerHTML = "";
    photo_f.style.display = "none";
    })


})




function openModal2(personne) {
    modal2.classList.remove("hidden");
    modal2.innerHTML = `

        <div class="bg-white rounded-xl shadow-xl p-6 animate-fade-in">
            
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-semibold">Card Details</h3>
                <button class="close_modal_2 text-gray-700 text-2xl">&times;</button>
            </div>

            <div>
                <img src="${personne.Photo}" class="img-avatar">

                <p><strong>Name:</strong> ${personne.nom}</p>
                <p><strong>Role:</strong> ${personne.role}</p>
                <p><strong>Email:</strong> ${personne.email}</p>
                <p><strong>Phone:</strong> ${personne.tél}</p>

                <div class="mt-4">
                    <h4 class="font-semibold text-lg">Experiences</h4>
                    ${personne.exper.length === 0 ? "<p>Aucune expérience</p>" :
        personne.exper.map(exp => `
                        <div class="mt-2 border p-2 rounded">
                            <p><strong>Poste:</strong> ${exp.title}</p>
                            <p><strong>Début:</strong> ${exp.start}</p>
                            <p><strong>Fin:</strong> ${exp.end}</p>
                            <p><strong>Description:</strong> ${exp.desc}</p>
                        </div>
                    `).join("")
    }
                </div>
            </div>
        </div>
    `;

    modal2.querySelector(".close_modal_2").addEventListener("click", () => {
        modal2.classList.add("hidden");
    });
}

function openModal(zoneId) {
    modal_3.classList.remove("hidden");
    assignList.innerHTML = "";

    personnes.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("flex", "items-center", "gap-3", "p-2", "border", "rounded", "cursor-pointer");

        item.innerHTML = `
            <img src="${p.Photo}" class="w-10 h-10 rounded-full">
            <div>
                <p class="font-semibold">${p.nom}</p>
                <p class="text-sm text-gray-600">${p.role}</p>
            </div>
        `;

        item.addEventListener("click", () => {
            assignPersonToZone(p, zoneId);
            modal_3.classList.add("hidden");
        });

        assignList.appendChild(item);
    });
}

btn_zone.forEach(btn => {
    btn.addEventListener("click", () => {
        const zoneId = btn.dataset.zone;
        openModal(zoneId);
    });
});

btnCloseAssign.addEventListener("click", () => {
    modal_3.classList.add("hidden");
});


function assignPersonToZone(personne, zoneId) {
    const zone = document.querySelector(`[data-zone-id="${zoneId}"]`);
    const occupants = zone.querySelector(".zone-occupants");

    let roleL = [];
    switch(zoneId){
        case "reception": roleL = roleInReception; 
        break;
        case "servers": roleL = roleInServeurs; 
        break;
        case "security": roleL = roleInSecurite; 
        break;
        case "staff": roleL = roleInPersonnel; 
        break;
        case "vault": roleL = roleInArchives; 
        break;
        case "conference": roleL = roleInConference; 
        break;
        default: roleL = []
    }

    if(!roleL.includes(personne.role)){
        alert("Cette role n'est pas autorise dans cette zone");
        return;
    }

    const countZ = occupants.children.length;

    if(countZ>=3){
        alert("cette salle est deja pleine.");
        return;
    }

    const card = document.createElement("div");
    card.classList.add("flex", "items-center", "gap-3", "p-2", "border", "rounded", "cursor-pointer");

    card.innerHTML = `
        <img src="${personne.Photo}" class="w-10 h-10 rounded-full">
        <span>${personne.nom}</span>
        <button class="remove px-2" >X</button>
    `;

    card.querySelector(".remove").addEventListener("click", (e) => {
        e.stopPropagation();
        card.remove();
        remplaceP(personne);
    })

    occupants.appendChild(card);
}


function remplaceP(personne){
     const card = document.createElement("div");
     card.classList.add("p-1", "m-3", "flex", "items-center", "gap-3", "cursor-pointer");


     card.innerHTML = `
        <img src="${personne.Photo}" alt="avatar" class="img-avatar">
        <h5 class="mt-5">${personne.nom}</h5>
    `;

    card.addEventListener("click", () =>{
        openModal2(personne)
    });

    cardContainer.appendChild(card)
}

