// Data from localStorage
const datas = JSON.parse(localStorage.getItem("datas")) || [];
const app = Vue.createApp({ data() { return { datas }; }, }).mount("#dataJson");

// Color list
let colors = ["bg-success", "bg-primary", "bg-info", "bg-warning", "bg-danger"];

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

        // Handle update
        let editData = document.getElementById("editData");
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
      };
    }
  });
}

// Function to refresh datas and attach events
function loadData() {
  app.datas = JSON.parse(localStorage.getItem("datas")) || [];
  Vue.nextTick(() => {
    attachEditEvent();
  });
}

// Initial load
loadData();
