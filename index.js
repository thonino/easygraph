// Color list
let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];

// Data from localStorage
const datas = JSON.parse(localStorage.getItem("datas")) || [];

const app = Vue.createApp({
  data() {
    return { datas: JSON.parse(localStorage.getItem("datas")) || [], colors };
  },
  computed: {
    totalValues() {
      return this.datas.reduce((sum, data) => sum + Number(data.value), 0);
    }
  },
  methods: {
    getPercentage(data) {
      if (this.totalValues === 0) return 0; 
      return Math.round((data.value / this.totalValues) * 100);
    }
  },
  watch: {
    datas(newDatas) {
      localStorage.setItem("datas", JSON.stringify(newDatas));
    }
  }
}).mount("#dataJson");

// Select color: add
for (let i = 0; i < colors.length; i++) {
  let optionBtn = document.getElementById("add-" + i);
  optionBtn.addEventListener("click", function () {
    let choice = document.querySelector("#addChoiceColor");
    choice.classList.remove(...colors);
    choice.classList.add(colors[i]);
  });
}

// Select color: edit
for (let i = 0; i < colors.length; i++) {
  let optionBtn = document.getElementById("edit-" + i);
  optionBtn.addEventListener("click", function () {
    let choice = document.querySelector("#editChoiceColor");
    choice.classList.remove(...colors);
    choice.classList.add(colors[i]);
  });
}

// Add show
let addShow = document.getElementById("addShow");
addShow.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
  addTarget.classList.remove("hidden");
  addTarget.classList.add("show");
});

// Add close
let addClose = document.getElementById("addClose");
addClose.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
  addTarget.classList.remove("show");
  addTarget.classList.add("hidden");
});

// Edit close
let editClose = document.getElementById("editClose");
editClose.addEventListener("click", () => {
  let editTarget = document.getElementById("editTarget");
  editTarget.classList.remove("show");
  editTarget.classList.add("hidden");
});

// HandleAdd
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
      color: colors[addSelect],
    };
    // Push and save data
    datas.push(newData);
    localStorage.setItem("datas", JSON.stringify(datas));

    // Reset form
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

// HandleEdit
function attachEditEvent() {
  datas.forEach((data, index) => {
    let editToggle = document.getElementById(`item-${data.id}`);
    if (editToggle) {
      editToggle.onclick = function () {
        // Pre-fill 
        document.getElementById("editName").value = data.name;
        document.getElementById("editValue").value = data.value;
        document.getElementById("editSelect").value = colors.indexOf(data.color);
        // Apply the correct color
        let choiceColor = document.getElementById("editChoiceColor");
        choiceColor.classList.remove(...colors);
        choiceColor.classList.add(data.color);
        // Show edit section
        let editTarget = document.getElementById("editTarget");
        editTarget.classList.remove("hidden");
        editTarget.classList.add("show");
        // Handle delete
        let deleteData = document.getElementById("deleteData");
        if(deleteData){
          deleteData.onclick = function() {
            let newTab = datas.filter((data) => data.id !== datas[index].id)
            localStorage.setItem("datas", JSON.stringify(newTab));
            loadData(); 
            editTarget.classList.add("hidden");
          }
        }
        // Handle update
        let editData = document.getElementById("editData");
        if(editData){
          editData.onclick = function () {
            datas[index].name = document.getElementById("editName").value;
            datas[index].value = document.getElementById("editValue").value;
            datas[index].color =
              colors[document.getElementById("editSelect").value];
            
            // Save updated data
            localStorage.setItem("datas", JSON.stringify(datas));
            loadData(); 
  
            editTarget.classList.add("hidden");
          };
        }
      };
    }
  });
}

// Fonction pour recalculer les pourcentages
function updatePercentages() {
  let totalValues = datas.reduce((sum, data) => sum + Number(data.value), 0);
  percentTab = datas.map(data => Math.round((data.value / totalValues) * 100));
}

// Function to refresh datas, attach events, and update percentages
function loadData() {
  app.datas = JSON.parse(localStorage.getItem("datas")) || [];
  updatePercentages();
  Vue.nextTick(() => {  attachEditEvent(); });
}

loadData(); // Initial load


// Handle Title
const titleText = document.getElementById('titleText');
const titleInput = document.getElementById('titleInput');
const showTitle = document.getElementById('titleToggle');
const editing = document.getElementById('editToggle');
const titleSave = document.getElementById('titleSaveBtn');
const titleCancel = document.getElementById('titleCancelBtn');

// Title default
titleText.textContent = localStorage.getItem('dataTitle') || 'Title Default';

// Toggle
const toggleFunction = (show, hide) => {
  show.classList.remove("d-none");
  hide.classList.add("d-none");
};

// Show Input
showTitle.addEventListener('click', () => {
  titleInput.value = titleText.textContent;
  toggleFunction(editing, showTitle);
  console.log("Show Input");
  
});

// Save New title
titleSave.addEventListener("click", () => {
  const newTitle = titleInput.value.trim();
  if (newTitle) {
    localStorage.setItem('dataTitle', newTitle);
    titleText.textContent = newTitle;
  }
  toggleFunction(showTitle, editing);
});

// Cancel
titleCancel.addEventListener("click", () => {
  toggleFunction(showTitle, editing);
});


// SOUCIS AVEC LES INDEX
[
  {"id":1,"name":"dfsdf","value":"32452","color":"bg-success"},
  {"id":2,"name":"4525245","value":"24245","color":"bg-warning"},
  {"id":4,"name":"34543","value":"43543","color":"bg-danger"},
  {"id":5,"name":"43543","value":"43534","color":"bg-primary"}
]