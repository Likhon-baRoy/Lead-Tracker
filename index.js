let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const inputWrn = document.getElementById("input-warning");

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function saveTab(url) {
    if (myLeads.includes(url)) {
        inputWrn.innerText = "This URL is already saved";
        return;
    } else {
        myLeads.push(url);
    }

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

tabBtn.addEventListener('click', () => {
    if (typeof browser !== "undefined" && browser.tabs) {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            saveTab(tabs[0].url);
        })
    } else if (typeof chrome !== "undefined" && chrome.tabs) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            saveTab(tabs[0].url);
        })
    } else {
        alert("Tabs API not supported in this browser.");
    }
})

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
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
    const inputValue = inputEl.value;
    if (inputValue === "" || !inputValue.startsWith("http")) {
        inputWrn.innerText = "Please enter a valid URL";
        return;
    } else if (myLeads.includes(inputValue)) {
        inputWrn.innerText = "This URL is already saved";
        return;
    } else {
        myLeads.push(inputValue);
    }

    // clear input field
    inputEl.value = "";

    // convert array to string and save to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
		<li>
		    <a href="${leads[i]}" target="_blank">${leads[i]}</a>
		</li>
		`
    }
    ulEl.innerHTML = listItems;
}
