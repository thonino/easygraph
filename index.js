// export modal
fetch('_modal.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('_modal').innerHTML = html;
    // Modal select color 
    let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];
    for (let i = 0; i < colors.length; i++) { 
      let colorButton = document.getElementById("color" + i);
      if (colorButton) { // Vérifier que le bouton existe
        colorButton.addEventListener("click", function () {
          let dropdownMenu = document.getElementById("dropdownMenu");
          let choice = document.getElementById("choice");
          if (dropdownMenu && choice) {
            dropdownMenu.classList.remove(...colors);
            dropdownMenu.classList.add(colors[i]);
            choice.innerHTML = colors[i];
            console.log("Couleur sélectionnée :", colors[i]);
          }
        });
      }
    }
  })
  .catch(error => console.error("Erreur lors du chargement du modal :", error));

// Fetch json data 
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {  app.datas = data; })
  .catch((error) => console.error("Erreur :", error));

// Syntax : vue.js 
const app = Vue.createApp({
  data() { return {  datas: [] }; },
}).mount("#dataJson");

// Récupère le bouton "Save"
document.getElementById("addData").addEventListener("click", function () {
  let dataName = document.getElementById("dataName").value;
  let dataNumber = document.getElementById("dataNumber").value;
  let dropdownMenu = document.getElementById("dropdownMenu");
  let selectedColor = dropdownMenu.classList.value.split(" ").find(c => c.startsWith("bg-"));
  let newData = {
    name: dataName,
    value: dataNumber,
    color: selectedColor
  };
});

// delete element
let deleteData = document.getElementById("delete")
deleteData.addEventListener("click", () => {
  let item = document.getElementById("item-1");
  let graph = document.getElementById("graph-1");
  item.remove(); graph.remove();   
})


function addNewItem(data, newItem) {
  data.push(newItem); // Ajouter un nouvel élément dans le tableau
  console.log(data); // Afficher les nouvelles données
}

let newItem = { id: 3, name: "Seniors", value: 30, color: "bg-primary" };
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    addNewItem(data, newItem);
  })

  const fs = require('fs');

const saveData = (data) => {
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier JSON', err);
    } else {
      console.log('Données sauvegardées dans data.json');
    }
  });
};

// Exemple d'utilisation
let newData = [
  { id: 1, name: "Children", value: 80, color: "bg-warning" },
  { id: 2, name: "Adults", value: 40, color: "bg-success" },
  { id: 3, name: "Seniors", value: 30, color: "bg-primary" }
];

saveData(newData);

fetch('http://localhost:3000/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData)
})
  .then(response => response.json())
  .then(result => console.log("Sauvegardé :", result))
  .catch(error => console.error("Erreur :", error));
