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

let personnes = [];

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



btn_enr.addEventListener('click', (e) => {
    e.preventDefault()

    const id = GenrerId();

    const exper = [];
    experiences.querySelectorAll(".exp").forEach(exp => {
    exper.push({
        title: exp.querySelector('input[name="exp-title"]').value,
        start: exp.querySelector('input[name="exp-start"]').value,
        end: exp.querySelector('input[name="exp-end"]').value,
        desc: exp.querySelector('textarea[name="exp-desc"]').value
    });
});

    const personne = {
        id,
        nom: document.getElementById("name").value,
        role: document.getElementById("role").value,
        Photo: document.getElementById("Photo").value || "https://via.placeholder.com/150",
        email: document.getElementById("email").value,
        tél: document.getElementById("tél").value,
        exper: exper
    };

    personnes.push(personne);

    const card = document.createElement("div");
    card.classList.add("p-1", "m-3", "flex", "items-center");

    card.innerHTML = `
             <img src="${personne.Photo}" alt="avatar" class="img-avatar">
                <h5 class="mt-5">${personne.nom}</h5>
                <button type="button" class="edit">Edit</button>
    `;

    card.addEventListener("click", () => openModal2(personne));

    cardContainer.appendChild(card);

    // Reset form
    modal_1.style.display = 'none';
    formul.reset();
    experiences.innerHTML = "";
    photo_f.style.display = "none";
});


function openModal2(personne) {
    modal2.classList.remove("hidden");
    modal2.innerHTML = `

        <div class="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 animate-fade-in">
            
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