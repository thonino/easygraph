// addToggle 
let addToggle = document.getElementById("addToggle")
addToggle.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
    addTarget.classList.toggle("show");
    addTarget.classList.toggle("hidden");
})

// editToggle 
let editToggle = document.getElementById("editToggle")
editToggle.addEventListener("click", () => {
  let editTarget = document.getElementById("editTarget");
    editTarget.classList.toggle("show");
    editTarget.classList.toggle("hidden");
})

// add color
let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];
for (let i = 0; i < colors.length; i++) {
  let optionBtn = document.getElementById("add-" + i);
    optionBtn.addEventListener("click", function () {
      let choice = document.querySelector(".addColor");
        choice.classList.remove(...colors); 
        choice.classList.add(colors[i]); 
    });
}

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

// edit data
let editData = document.getElementById("editData");
editData.addEventListener("click",function () {
  const editName = document.getElementById("editName").value;
  const editValue = document.getElementById("editValue").value;
  const editColor = document.getElementById("editSelect").value; 

  // prefill form
  // document.getElementById("editName").value = item.name;
  // document.getElementById("editValue").value = item.value;

  document.getElementById("editData").onclick = function () {
    item.name = document.getElementById("editName").value;
    item.value = parseInt(document.getElementById("editValue").value, 10);

    data[index] = item; // Mettre à jour les données
    localStorage.setItem("data", JSON.stringify(data)); // save
    loadData(); // Rafraîchir l'affichage
  };

})



// Initialisation des données depuis localStorage
const storedData = localStorage.getItem("datas");
const app = Vue.createApp({
  data() { return { datas: storedData ? JSON.parse(storedData) : [], };
  },
  methods: { saveToLocalStorage() {
      localStorage.setItem("datas", JSON.stringify(this.datas));
    },
    addData(newData) {
      this.datas.push(newData); // add
      this.saveToLocalStorage(); // save
    },
  },
}).mount("#dataJson");