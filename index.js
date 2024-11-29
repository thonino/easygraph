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

// add show
let addShow = document.getElementById("addShow")
addShow.addEventListener("click", () => {
  let addTarget = document.getElementById("addTarget");
  addTarget.classList.remove("hidden");
    addTarget.classList.add("show");
})
// add  close
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
    // push and save data
    datas.push(newData); 
    localStorage.setItem("datas", JSON.stringify(app.datas)); 
    
    // reset form
    document.getElementById("addName").value = ""; 
    document.getElementById("addValue").value = ""; 
    document.getElementById("addSelect").value = ""; 
    addTarget.classList.toggle("hidden");             
    
    loadData()

  } else {
    alert("you forgot somthing");
  }
});

// edit close
let editClose = document.getElementById("editClose")
editClose.addEventListener("click", () => {
  let editTarget = document.getElementById("editTarget");
    editTarget.classList.remove("show");
    editTarget.classList.add("hidden");
})

// handleEdit
for (let i = 0; i < datas.length; i++) {
  let editToggle = document.getElementById("item-" + (i + 1));
  editToggle.addEventListener("click", () => {
    console.log("editToggle : ", editToggle);
    const data = datas[i]; 
    // prefill form
    document.getElementById("editName").value = data.name;
    document.getElementById("editValue").value = data.value;
    document.getElementById("editSelect").value = data.id;
    // remove all color
    for (let j = 0; j < colors.length; j++) {
      if (colors[j] !== data.color) {
        document.getElementById("editChoiceColor").classList.remove(colors[j]);
      } else {
        document.getElementById("editChoiceColor").classList.add(colors[j]);
      }
    }
    
    console.log("id : ", data.id , "color : ", data.color); 
    
    // show edit
    let editTarget = document.getElementById("editTarget");
    editTarget.classList.remove("hidden");
    editTarget.classList.add("show");

    // handleUpdate
    let editData = document.getElementById("editData");
    editData.onclick = function () {
      datas[i].name = document.getElementById("editName").value;
      datas[i].value = document.getElementById("editValue").value;
      datas[i].color = colors[document.getElementById("editSelect").value];
      
      // save data
      localStorage.setItem("datas", JSON.stringify(app.datas)); 

      editTarget.classList.add("hidden"); 
      loadData()
    };
  });
}

  
// refreshing datas
function loadData() {
  app.datas = JSON.parse(localStorage.getItem("datas")) || [];
}  