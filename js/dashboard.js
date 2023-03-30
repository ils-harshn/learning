// dashboard js

function showSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("active");
    hideDropdown()
}

function hideSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.remove("active");
}


function showDropdown() {
    let sidebar = document.getElementsByClassName("drop-down")[0];
    sidebar.classList.add("active");
}

function hideDropdown() {
    let sidebar = document.getElementsByClassName("drop-down")[0];
    sidebar.classList.remove("active");
}

function toggleDropdown() {
    let dropdown = document.getElementsByClassName("drop-down")[0];
    if (dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
    } else {
        dropdown.classList.add("active");
        hideSidebar()
    }
}

function hideAllElements() {
    hideDropdown()
    hideSidebar()
}