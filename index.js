// Datas model
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

// Colors 
const bootstrapColors = {
  "bg-success": "#198754",
  "bg-primary": "#0d6efd",
  "bg-info": "#0dcaf0",
  "bg-warning": "#ffc107",
  "bg-danger": "#dc3545",
};

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

// App vue js
const app = Vue.createApp({
  data() {
    return { datas: JSON.parse(localStorage.getItem("datas"))  };
  },
  computed: {
    totalValues() {
      return this.datas.reduce((sum, data) => sum + Number(data.value), 0);
    },
  },
  methods: {
    getPercentage(data) {
      if (this.totalValues === 0) return 0;
      return Math.round((data.value / this.totalValues) * 100);
    },
    getAdjustedPercentage(data) {
      const originalPercentage = this.getPercentage(data);
      const maxPercentage = Math.max(...this.datas.map(d => this.getPercentage(d)));
      const multiplier = maxPercentage < 92 ? 92 / maxPercentage : 1;
      return originalPercentage * multiplier;
    }
  },ch: {
    datas(newDatas) {
      localStorage.setItem("datas", JSON.stringify(newDatas));
    }
  }
}).mount("#dataJson");


// Models toggle graph : pro version
const graphs = [
  { id: "graph-1", target: "Horizontal" },
  { id: "graph-2", target: "Vertical" },
  { id: "graph-3", target: "Circle" }
];
const sliceDataName = document.getElementById("sliceDataName");
const sliceDataValue = document.getElementById("sliceDataValue");
const toolChoice = document.getElementById("toolChoice");
// HandleClick
function handleGraphToggle(selectedId) {
  setTimeout(() => {
    graphs.forEach(({ id, target }) => {
      const showBtn = document.getElementById(`${id}-btn`);
      const targetEl = document.getElementById(`${id}-target`);
      if (id === selectedId) {
        showBtn.classList.add("btn-info");
        showBtn.classList.remove("btn-secondary");
        targetEl.classList.remove("d-none");
        toolChoice.textContent = target;
      } else {
        showBtn.classList.add("btn-secondary");
        showBtn.classList.remove("btn-info");
        targetEl.classList.add("d-none");
      }
    });
    sliceDataName.textContent = ""; 
    sliceDataValue.textContent = "";
  } , 150);     
}
// Listening
graphs.forEach(({ id }) => {
  const showBtn = document.getElementById(`${id}-btn`);
  showBtn.addEventListener("click", () => handleGraphToggle(id));
});

// Models toggle graph : simple version
// let graph1Target = document.getElementById("graph-1-target");
// let graph1show = document.getElementById("graph-1-btn");
// let graph2Target = document.getElementById("graph-2-target");
// let graph2show = document.getElementById("graph-2-btn");
// let graph3Target = document.getElementById("graph-3-target");
// let graph3show = document.getElementById("graph-3-btn");
// let sliceDataName = document.getElementById("sliceDataName");
// let sliceDataValue = document.getElementById("sliceDataValue");
// let toolChoice = document.getElementById("toolChoice");
// // graph-1 btn
// graph1show.addEventListener("click", () => {
//   graph2show.classList.add("btn-secondary");
//   graph3show.classList.add("btn-secondary");
//   graph1show.classList.add("btn-info");
//   graph2show.classList.remove("btn-info");
//   graph3show.classList.remove("btn-info");
//   graph1Target.classList.remove("d-none");
//   graph2Target.classList.add("d-none");
//   graph3Target.classList.add("d-none");
//   sliceDataName.textContent = "";
//   sliceDataValue.textContent = "";
//   toolChoice.textContent = "Horizontal";
// })
// // graph-2 btn
// graph2show.addEventListener("click", () => {
//   graph3show.classList.add("btn-secondary");
//   graph1show.classList.add("btn-secondary");
//   graph1show.classList.remove("btn-info");
//   graph2show.classList.add("btn-info");
//   graph3show.classList.remove("btn-info");
//   graph1Target.classList.add("d-none");
//   graph2Target.classList.remove("d-none");
//   graph3Target.classList.add("d-none");
//   sliceDataName.textContent = "";
//   sliceDataValue.textContent = "";
//   toolChoice.textContent = "Vertical";
// })
// // graph-3 btn
// graph3show.addEventListener("click", () => {
//   graph1show.classList.add("btn-secondary");
//   graph2show.classList.add("btn-secondary");
//   graph1show.classList.remove("btn-info");
//   graph2show.classList.remove("btn-info");
//   graph3show.classList.add("btn-info");
//   graph1Target.classList.add("d-none");
//   graph2Target.classList.add("d-none");
//   graph3Target.classList.remove("d-none");
//   toolChoice.textContent = "Pie";
// });



// graph-3
function drawPieChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Conversion des couleurs et des données
  const formattedData = datas.map(item => ({
    value: parseInt(item.value, 10),
    color: bootstrapColors[item.color],
    label: item.name
  }));

  const total = formattedData.reduce((sum, item) => sum + item.value, 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY);
  let startAngle = 0;

  // Stocker les slices
  const slices = formattedData.map(item => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    const percentage = Math.round((item.value / total) * 100);

    const slice = {
      label: item.label,
      color: item.color,
      value: item.value,
      percentage, // Pourcentage calculé
      startAngle,
      endAngle,
    };

    startAngle = endAngle;
    return slice;
  });

  // Dessiner le graphique
  slices.forEach(slice => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, slice.startAngle, slice.endAngle);
    ctx.fillStyle = slice.color;
    ctx.fill();
    ctx.closePath();

    // Ajouter le pourcentage au centre de chaque slice
    const textAngle = (slice.startAngle + slice.endAngle) / 2;
    const textX = centerX + (radius / 1.5) * Math.cos(textAngle);
    const textY = centerY + (radius / 1.5) * Math.sin(textAngle);

    ctx.fillStyle = "#000"; // Couleur du texte
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${slice.percentage}%`, textX, textY);
  });

  // Détection de survol
  canvas.addEventListener("mousemove", event => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= radius) {
      const angle = Math.atan2(dy, dx) >= 0 ? Math.atan2(dy, dx) : Math.atan2(dy, dx) + 2 * Math.PI;

      // Trouver la slice survolée
      const hoveredSlice = slices.find(slice =>
        angle >= slice.startAngle && angle < slice.endAngle
      );
      if (hoveredSlice) {
        setTimeout(() => {
        sliceDataName.textContent = hoveredSlice.label;
        sliceDataName.style.color = hoveredSlice.color;
        sliceDataValue.textContent = `${hoveredSlice.value} (${hoveredSlice.percentage}%)`;
      }, 150)
      }
    }
  });
}

// Appel de la fonction avec l'ID du canvas
drawPieChart("graph-3-canvas");

// Handle Title
const titleText = document.getElementById('titleText');
const titleInput = document.getElementById('titleInput');
const showTitle = document.getElementById('titleToggle');
const editing = document.getElementById('editToggle');
const titleSave = document.getElementById('titleSaveBtn');
const titleCancel = document.getElementById('titleCancelBtn');
const titleEditIcon = document.getElementById('titleEditIcon');
// Title default
titleText.textContent = localStorage.getItem('dataTitle') || 'Title Default';


// Toggle
const toggleFunction = (show, hide) => {
  setTimeout(() => {
    show.classList.remove("d-none");
    hide.classList.add("d-none");
  }, 250);
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

Object.keys(bootstrapColors).forEach((colorKey, i) => {
  let optionBtn = document.getElementById("add-" + i);
  if (optionBtn) {
    optionBtn.addEventListener("click", function () {
      let choice = document.querySelector("#addChoiceColor");
      choice.classList.remove(...Object.keys(bootstrapColors));
      choice.classList.add(colorKey); // Clé ajoutée directement
    });
  }
});


// Obtenir les clés de bootstrapColors
const colorKeys = Object.keys(bootstrapColors); 

// Select color: add
for (let i = 0; i < colorKeys.length; i++) {
  let optionBtn = document.getElementById("add-" + i+1);
  if (optionBtn) {
    optionBtn.addEventListener("click", function () {
      let choice = document.querySelector("#addChoiceColor");
      choice.classList.remove(...colorKeys); 
      choice.classList.add(colorKeys[i]); 
    });
  }
}

// Select color: edit
for (let i = 0; i < colorKeys.length; i++) {
  let optionBtn = document.getElementById("edit-" + i);
  if (optionBtn) {
    optionBtn.addEventListener("click", function () {
      let choice = document.querySelector("#editChoiceColor");
      choice.classList.remove(...colorKeys); 
      choice.classList.add(colorKeys[i]); 
    });
  }
}

// Add show
let addShow = document.getElementById("addShow");
addShow.addEventListener("click", () => {
  setTimeout(() => {
    let addTarget = document.getElementById("addTarget");
    addTarget.classList.remove("hidden");
    addTarget.classList.add("show");
  }, 250);
});
// Add close
let addClose = document.getElementById("addClose");
addClose.addEventListener("click", () => {
  setTimeout(() => {
    let addTarget = document.getElementById("addTarget");
    addTarget.classList.remove("show");
    addTarget.classList.add("hidden");  
  }, 250);
});
// Edit close
let editClose = document.getElementById("editClose");
editClose.addEventListener("click", () => {
  setTimeout(() => {
    let editTarget = document.getElementById("editTarget");
    editTarget.classList.remove("show");
    editTarget.classList.add("hidden");
  }, 250);
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
        color: addSelect,
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
        document.getElementById("editSelect").value = data.color;
        // Apply the selected color
        const choiceColor = document.getElementById("editChoiceColor");
        choiceColor.classList.remove(...colorKeys);
        choiceColor.classList.add(data.color);
        // Show edit section
        setTimeout(() => {
          const editTarget = document.getElementById("editTarget");
          editTarget.classList.remove("hidden");
          editTarget.classList.add("show");
        }, 250);
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
              color: document.getElementById("editSelect").value
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
  setTimeout(() => {
    // querySelectorAll & forEach => to apply class for all items
    deleteBtnTargets.forEach( target => {
      target.classList.toggle("hidden");
      target.classList.toggle("show");
    });
  }, 250);
  loadData(); 
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

// Fonction de mise à jour globale
function updateChart() {
  drawPieChart("graph-3-canvas");
}

// updating percentage
function updatePercentages() {
  let totalValues = datas.reduce((sum, data) => sum + Number(data.value), 0);
  percentTab = datas.map(data => Math.round((data.value / totalValues) * 100));
}

// Function to refresh datas, attach events, and update percentages
function loadData() {
  app.datas = JSON.parse(localStorage.getItem("datas")) || [];
  updatePercentages(); updateChart();
  Vue.nextTick(() => {  attachEditEvent(); });
}

loadData(); // Initial load

// When I’ve just added a new data, I can’t see it if I click on the delete button.