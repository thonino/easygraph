// Add data
// let dataName = document.getElementById("dataName");
// let dataNumber = document.getElementById("dataNumber");
// let addData = document.getElementById("addData");

// addData.addEventListener("click", () => {
//   // Add Item
//   let targetItem = document.getElementById("child-item");

//   let newItem = document.createElement("div");
//   newItem.classList.add("d-flex", "fw-bold", "my-2", "h-20");

//   let itemId = `item-${targetItem.children.length + 1}`;
//   newItem.id = itemId;

//   let pick = document.createElement("div");
//   pick.classList.add("bg-info", "rounded", "pick");
//   newItem.appendChild(pick);

//   let pickId = `pick-${targetItem.children.length + 1}`;
//   pick.id = pickId;

//   let dataContainer = document.createElement("div");
//   dataContainer.classList.add("d-flex", "text-secondary", "fix-txt");
//   newItem.appendChild(dataContainer);

//   let rowId = `row-${targetItem.children.length + 1}`;
//   dataContainer.id = rowId;

//   let newDataNumber = document.createElement("p");
//   newDataNumber.textContent = dataNumber.value;
//   newDataNumber.classList.add("mx-2");
//   dataContainer.appendChild(newDataNumber);

//   let numId = `number-${targetItem.children.length + 1}`;
//   newDataNumber.id = numId;

//   let newDataName = document.createElement("p");
//   newDataName.textContent = dataName.value;
//   newDataName.classList.add("fst-italic", "fw-light");
//   dataContainer.appendChild(newDataName);

//   let nameId = `name-${targetItem.children.length + 1}`;
//   newDataName.id = nameId;

//   targetItem.appendChild(newItem); // important !

//   // Add Graph
//   let targetGraph = document.getElementById("child-graph");

//   let newGraph = document.createElement("div");
//   newGraph.classList.add("bg-info", "rounded-end", "my-2");

//   let graphId = `graph-${targetGraph.children.length + 1}`;
//   newGraph.id = graphId;

//   targetGraph.appendChild(newGraph); // important !
// });

// delete element
let deleteData = document.getElementById("delete")
deleteData.addEventListener("click", () => {
  let item = document.getElementById("item-1");
  let graph = document.getElementById("graph-1");
  item.remove(); graph.remove();   
})

fetch("data.json") // Chemin vers le fichier JSON
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur : " + response.statusText);
    }
    return response.json(); // Convertir en objet JavaScript
  })
  .then((data) => {
    console.log(data); // Affiche les données du JSON
    manipulateData(data);
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
  });

function manipulateData(data) {
  data.forEach((item) => {
    // Show Item
    let container = document.getElementById("child-item");
    let newItem = document.createElement("div");
    newItem.classList.add("d-flex", "fw-bold", "my-2", "h-20");
    let pick = document.createElement("div");
    pick.classList.add(item.color, "rounded", "pick");
    newItem.appendChild(pick);
    let dataContainer = document.createElement("div");
    dataContainer.classList.add("d-flex", "text-secondary", "fix-txt");
    newItem.appendChild(dataContainer);
    let newDataNumber = document.createElement("p");
    newDataNumber.textContent = item.value;
    newDataNumber.classList.add("mx-2");
    dataContainer.appendChild(newDataNumber);
    let newDataName = document.createElement("p");
    newDataName.textContent = item.name;
    newDataName.classList.add("fst-italic", "fw-light");
    dataContainer.appendChild(newDataName);
    container.appendChild(newItem); // inmportant

    // show Graph
    let targetGraph = document.getElementById("child-graph");
    let newGraph = document.createElement("div");
    newGraph.classList.add(item.color, "rounded-end", "my-2");
    let graphId = `graph-${targetGraph.children.length + 1}`;
    newGraph.id = graphId;
    targetGraph.appendChild(newGraph); // important !
  });
}

// select color
let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];
for (let i = 0; i <= colors.length; i++) {
  let colorButton = document.getElementById("color" + i);
  let dropdownMenu = document.getElementById("dropdownMenu");
  colorButton.addEventListener("click", function () { // Add Event
    dropdownMenu.classList.remove(...colors); // delete classes
    dropdownMenu.classList.add(colors[i]); // Add class
  });
}

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

  // Ajoute les données dans le fichier JSON (ici une simulation avec un tableau)
  fetch("data.json", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData), 
  })
  .then(response => response.json())
  .catch((error) => {
    console.error("Erreur lors de l'ajout des données :", error);
  });
});



