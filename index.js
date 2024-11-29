// data from localStorage
const datas = JSON.parse( localStorage.getItem("datas")) || [];
const app = Vue.createApp({ data() { return { datas } },
}).mount("#dataJson");

// color list
let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];

// select color : add
for (let i = 0; i < colors.length; i++) {
  let optionBtn = document.getElementById("add-" + i);
    optionBtn.addEventListener("click", function () {
      let choice = document.querySelector("#addChoiceColor");
        choice.classList.remove(...colors); 
        choice.classList.add(colors[i]); 
    });
}
// select color : edit
for (let i = 0; i < colors.length; i++) {
  let optionBtn = document.getElementById("edit-" + i);
  optionBtn.addEventListener("click", function () {
    let choice = document.querySelector("#editChoiceColor");
      choice.classList.remove(...colors); 
      choice.classList.add(colors[i]); 
  });
}
// edit close
let editClose = document.getElementById("editClose")
editClose.addEventListener("click", () => {
  let editTarget = document.getElementById("editTarget");
    editTarget.classList.remove("show");
    editTarget.classList.add("hidden");
})

// Fonction pour lier les événements d'édition
  for (let i = 0; i < datas.length; i++) {
    let editToggle = document.getElementById("item-" + (i + 1));
    if (editToggle) {  // Vérifie que l'élément existe
      editToggle.addEventListener("click", () => {
        const data = datas[i];
        // Pré-remplir le formulaire
        document.getElementById("editName").value = data.name;
        document.getElementById("editValue").value = data.value;
        document.getElementById("editSelect").value = data.id;

        // Supprimer toutes les couleurs et ajouter la bonne
        for (let j = 0; j < colors.length; j++) {
          const choiceColor = document.getElementById("editChoiceColor");
          if (colors[j] !== data.color) {
            choiceColor.classList.remove(colors[j]);
          } else {
            choiceColor.classList.add(colors[j]);
          }
        }

        // Afficher la section d'édition
        let editTarget = document.getElementById("editTarget");
        editTarget.classList.remove("hidden");
        editTarget.classList.add("show");

        // Gestionnaire de mise à jour
        let editData = document.getElementById("editData");
        editData.onclick = function () {
          datas[i].name = document.getElementById("editName").value;
          datas[i].value = document.getElementById("editValue").value;
          datas[i].color = colors[document.getElementById("editSelect").value];

          // Sauvegarder et recharger les données
          localStorage.setItem("datas", JSON.stringify(datas));
          loadData();

          editTarget.classList.add("hidden");
        };
      });
    }
  }

// add show
let addShow = document.getElementById("addShow")
addShow.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
  addTarget.classList.remove("hidden");
    addTarget.classList.add("show");
})
// add close
let addClose = document.getElementById("addClose")
addClose.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
    addTarget.classList.remove("show");
    addTarget.classList.add("hidden");
})

// handleAdd
let addData = document.getElementById("addData");
addData.addEventListener("click", function () {
  const addName = document.getElementById("addName").value;
  const addValue = document.getElementById("addValue").value;
  const addSelect = document.getElementById("addSelect").value; 
  if (addName && addValue && addSelect) {
    const newData = { 
      id: app.datas.length + 1, 
      name: addName, 
      value: addValue, 
      color: colors[addSelect]
    };
    // Push et sauvegarder les données
    datas.push(newData);
    localStorage.setItem("datas", JSON.stringify(datas)); 
    
    // Réinitialiser le formulaire
    document.getElementById("addName").value = ""; 
    document.getElementById("addValue").value = ""; 
    document.getElementById("addSelect").value = ""; 
    let addTarget = document.getElementById("addTarget");
    addTarget.classList.toggle("hidden");             
    
    loadData();
    
  } else {
    alert("you forgot something");
  }
});

// Fonction pour recharger les données
function loadData() {
  app.datas = JSON.parse(localStorage.getItem("datas")) || [];
}
