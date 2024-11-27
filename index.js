// Export modal
fetch('_modal.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('_modal').innerHTML = html;
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
          }
        });
      }
    }
    // Ajouter un événement pour le bouton "Save" dans le modal
    document.getElementById("addData").addEventListener("click", function () {
      const dataName = document.getElementById("dataName").value;
      const dataValue = document.getElementById("dataValue").value;
      const selectedColor = document.getElementById("choice").innerHTML; 
      if (dataName && dataValue && selectedColor) {
        const newData = { 
          id: app.datas.length + 1, 
          name: dataName, 
          value: dataValue, 
          color: selectedColor
        };
        app.addData(newData);
        document.getElementById("dataName").value = ""; // Reset name
        document.getElementById("dataValue").value = ""; // Reset value
      } else {
        alert("you forgot somthing");
      }
    });
  });

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

let 
