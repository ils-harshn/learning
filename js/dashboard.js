// dashboard js

function showSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("active");
}

function hideSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.remove("active");
}


function toggleSidebar() {
    showSidebar()
}