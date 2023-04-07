// dashboard js

function showSidebar() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("active");
    hideDropdown()
    hideNotificationPanel()
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
        hideNotificationPanel()
    }
}

function showNotificationPanel() {
    document.querySelector(".drop-down-notification").classList.add("active");
}

function hideNotificationPanel() {
    document.querySelector(".drop-down-notification").classList.remove("active");
}

function toggleNotificationPanel() {
    let notificationPanel = document.querySelector(".drop-down-notification");
    if (notificationPanel.classList.contains("active")) {
        notificationPanel.classList.remove("active");
    } else {
        notificationPanel.classList.add("active");
        hideSidebar()
        hideDropdown()
    }
}

function hideAllElements() {
    hideDropdown()
    hideSidebar()
    hideNotificationPanel()
}

function directTo(link) {
    window.location.href = link;
}

// showNotifications()
