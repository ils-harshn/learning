// dashboard js

function hideSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("hide");
    let container = document.getElementsByClassName("container")[0];
    container.style.marginLeft = 0;
}

function showSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.remove("hide");
    sidebar.style.zIndex = 1;
}