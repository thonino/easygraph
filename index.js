// Color list
let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];

// Data from localStorage
let datas = [];
try {
  datas = JSON.parse(localStorage.getItem("datas")) || [];
  if (!Array.isArray(datas)) datas = [];
} catch (e) {
  console.error("Invalid or empty localStorage:", e);
  datas = [];
  localStorage.setItem("datas", JSON.stringify(datas));
}

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
    // Save
    loadData(); 
  } else {
    alert("you forgot something");
  }
});

// Handle Edit
function attachEditEvent() {
  datas.forEach((data, index) => {
    const editToggle = document.getElementById(`item-${data.id}`);
    
    if (editToggle) {
      editToggle.onclick = () => {
        // Pre-fill 
        document.getElementById("editName").value = data.name;
        document.getElementById("editValue").value = data.value;
        document.getElementById("editSelect").value = colors.indexOf(data.color);
        // Apply the selected color
        const choiceColor = document.getElementById("editChoiceColor");
        choiceColor.classList.remove(...colors);
        choiceColor.classList.add(data.color);
        // Show edit section
        const editTarget = document.getElementById("editTarget");
        editTarget.classList.remove("hidden");
        editTarget.classList.add("show");
        // Handle delete action
        const deleteData = document.getElementById("deleteData");
        if (deleteData) {
          deleteData.onclick = () => {
            const deleteData = datas.filter(item => item.id !== data.id);
            const newData = deleteData.map((item, index) => ({
              ...item, id: index + 1 
            }));
            // updated and Save datas
            datas = newData; 
            localStorage.setItem("datas", JSON.stringify(datas));
            loadData();
            editTarget.classList.add("hidden");
          };
        }
        // Handle update 
        const editData = document.getElementById("editData");
        if (editData) {
          editData.onclick = () => {
            // Update the data
            datas[index] = {
              ...datas[index],
              name: document.getElementById("editName").value,
              value: document.getElementById("editValue").value,
              color: colors[document.getElementById("editSelect").value]
            };
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

// Toggle delete
let deleteBtn = document.getElementById("deleteBtn");
let deleteBtnTargets = document.querySelectorAll(".deleteBtnTarget");
deleteBtn.addEventListener("click", () => {
  // querySelectorAll & forEach => to apply class for all items
  deleteBtnTargets.forEach( target => {
    target.classList.toggle("hidden");
    target.classList.toggle("show");
  });
});

// Handle delete Btn
datas.forEach((data) => {
  const deleteItem = document.getElementById(`deleteItem-${data.id}`);
  if (deleteItem) {
    deleteItem.onclick = () => { 
      datas = datas.filter(item => item.id !== data.id);
              datas.map((item, index) => ({ ...item, id: index + 1 }));
      // save
      localStorage.setItem("datas", JSON.stringify(datas));
      loadData(); 
      document.getElementById("editTarget")?.classList.add("hidden"); 
    };
  }
});

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

// Datas test
[
  {"id":1,"name":"tutu","value":"32452","color":"bg-success"},
  {"id":2,"name":"tata","value":"24245","color":"bg-warning"},
  {"id":3,"name":"toto","value":"43543","color":"bg-danger"},
  {"id":4,"name":"titi","value":"43534","color":"bg-primary"},
  {"id":5,"name":"tete","value":"21322","color":"bg-info"},
  {"id":6,"name":"nini","value":"36786","color":"bg-success"},
  {"id":7,"name":"nana","value":"25677","color":"bg-warning"},
  {"id":8,"name":"nunu","value":"34553","color":"bg-danger"},
  {"id":9,"name":"fafa","value":"23448","color":"bg-primary"},
  {"id":10,"name":"fifi","value":"12443","color":"bg-info"}
]
