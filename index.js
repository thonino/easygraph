// Add data
let dataName = document.getElementById("dataName");
let dataNumber = document.getElementById("dataNumber");
let addData = document.getElementById("addData");

addData.addEventListener("click", () => {
  // Add Item
  let targetItem = document.getElementById("child-item");

  let newItem = document.createElement("div");
  newItem.classList.add("d-flex", "fw-bold", "my-2", "h-20");

  let itemId = `item-${targetItem.children.length + 1}`;
  newItem.id = itemId;

  let pick = document.createElement("div");
  pick.classList.add("bg-info", "rounded", "pick");
  newItem.appendChild(pick);

  let pickId = `pick-${targetItem.children.length + 1}`;
  pick.id = pickId;

  let dataContainer = document.createElement("div");
  dataContainer.classList.add("d-flex", "text-secondary", "fix-txt");
  newItem.appendChild(dataContainer);

  let rowId = `row-${targetItem.children.length + 1}`;
  dataContainer.id = rowId;

  let newDataNumber = document.createElement("p");
  newDataNumber.textContent = dataNumber.value;
  newDataNumber.classList.add("mx-2");
  dataContainer.appendChild(newDataNumber);

  let numId = `number-${targetItem.children.length + 1}`;
  newDataNumber.id = numId;

  let newDataName = document.createElement("p");
  newDataName.textContent = dataName.value;
  newDataName.classList.add("fst-italic", "fw-light");
  dataContainer.appendChild(newDataName);

  let nameId = `name-${targetItem.children.length + 1}`;
  newDataName.id = nameId;

  targetItem.appendChild(newItem); // Ajouter l'élément !! important

  // Add Graph
  let targetGraph = document.getElementById("child-graph");

  let newGraph = document.createElement("div");
  newGraph.classList.add("bg-info", "rounded-end", "my-2");

  let graphId = `graph-${targetGraph.children.length + 1}`;
  newGraph.id = graphId;

  targetGraph.appendChild(newGraph); // Ajouter l'élément !! important
});

