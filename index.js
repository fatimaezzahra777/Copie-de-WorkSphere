const ajouter = document.querySelector(".add");
const modal_1 = document.querySelector(".modal");

const btn_exp = document.querySelector(".btn-add_exp");
const experiences = document.querySelector("#expériences");

const btn_annule = document.querySelector(".btn-annule");
const btn_remove = document.querySelector(".btn-remove-exp")

const inputP = document.getElementById("Photo");
const photo_f = document.getElementById("photo-form");

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
    experiences.appendChild(template);
})