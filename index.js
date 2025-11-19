const ajouter = document.querySelector(".add");
const modal_1 = document.querySelector(".modal");

const btn_exp = document.querySelector(".btn-add_exp");
const experiences = document.querySelector("#expériences");

const btn_annule = document.querySelector(".btn-annule");
const btn_enr = document.querySelector(".btn-enregistre");

const inputP = document.getElementById("Photo");
const photo_f = document.getElementById("photo-form");

const formul = document.querySelector(".formulaire");

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


const cardContainer = document.querySelector(".card");

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

    const card = document.createElement("div");
    card.classList.add("p-1", "m-3", "flex", "items-center");

    card.innerHTML = `
             <img src="${personne.Photo}" alt="avatar" class="img-avatar">
                <h5 class="mt-5">${personne.nom}</h5>
                <button type="button" class="edit">Edit</button>
    `;

    cardContainer.appendChild(card);

    personnes.push(personne);

    modal_1.style.display = 'none';
    formul.reset();
    experiences.innerHTML = "";
    photo_f.style.display = "none";
});
