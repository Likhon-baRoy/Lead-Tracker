let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    renderLeads();
});

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
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
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
