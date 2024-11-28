// Gestion data from localStorage
const datas = JSON.parse(localStorage.getItem("datas")) || [];
const app = Vue.createApp({ data() { return { datas } },
  methods: { saveData() {
      localStorage.setItem("datas", JSON.stringify(this.datas));
    },
    addData(newData) {
      this.datas.push(newData); // add
      this.saveData(); // save
    },
  },
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
// addToggle 
let addToggle = document.getElementById("addToggle")
addToggle.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
    addTarget.classList.toggle("show");
    addTarget.classList.toggle("hidden");
})
// add data
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
    app.addData(newData);
    document.getElementById("addName").value = ""; // Reset name
    document.getElementById("addValue").value = ""; // Reset value
    document.getElementById("addSelect").value = ""; // Reset color
    addTarget.classList.toggle("hidden"); // hidde toggle
  } else {
    alert("you forgot somthing");
  }
});

// Select color : edit
for (let i = 0; i < colors.length; i++) {
  let optionBtn = document.getElementById("edit-" + i);
    optionBtn.addEventListener("click", function () {
      let choice = document.querySelector("#editChoiceColor");
        choice.classList.remove(...colors); 
        choice.classList.add(colors[i]); 
    });
}
// editToggle 
let currentEditingId = null; 
for (let i = 1; i <= datas.length; i++) {
  let editToggle = document.getElementById("item-" + i);
  editToggle.addEventListener("click", () => {
    const data = datas[i - 1]; 
    currentEditingId = data.id; 

    // Pré-remplir les champs du formulaire
    document.getElementById("editName").value = data.name;
    document.getElementById("editValue").value = data.value;
    document.getElementById("editSelect").value = data.color;

    // Affiche le formulaire d'édition
    let editTarget = document.getElementById("editTarget");
    editTarget.classList.remove("hidden");
    editTarget.classList.add("show");
  });
}
// edit data
let editData = document.getElementById("editData");
editData.addEventListener("click", function () {
  const editName = document.getElementById("editName").value;
  const editValue = document.getElementById("editValue").value;
  const editSelect = document.getElementById("editSelect").value;
  // Update element
  const index = datas.findIndex(data => data.id === currentEditingId);
  datas[index].name = editName;
  datas[index].value = editValue;
  datas[index].color = colors[editSelect];
  // save to localStorage
  localStorage.setItem("datas", JSON.stringify(datas));
  document.getElementById("editTarget").classList.add("hidden");
  loadData();
});

// refreshing datas
function loadData() {
  app.datas = JSON.parse(localStorage.getItem("datas")) || [];
}