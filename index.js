let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");

// save input when clicked on save button
inputBtn.addEventListener("click", saveInput);

// save input when `Enter` key pressed
inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveInput();
    }
});

function saveInput() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    renderLeads();
}

function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
		<li>
		    <a href="${myLeads[i]}" target="_blank">${myLeads[i]}</a>
		</li>
		`
    }
    ulEl.innerHTML = listItems;
}
