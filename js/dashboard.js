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

function showNotifications() {
    let badge = document.querySelector(".notification .badge");
    let drop_down = document.querySelector(".notification .drop-down-notification");

    let types = ['red', 'yellow', 'green', 'blue'];
    let examples = [
        'Registration successfull!',
        'Complete your verification',
        'Verify your mobile number to activate account',
        'New School added',
    ]

    badge.innerHTML = examples.length;
    let innerHTML = "";
    for (let i = 0; i < examples.length; i++) {
        innerHTML += `
        <li>
            <i class="${types[Math.floor(Math.random() * 4)]}-icon">
            </i>
            <a>${examples[i]}</a>
        </li>
        `
    }
    drop_down.innerHTML = innerHTML;
}

function hideAllElements() {
    hideDropdown()
    hideSidebar()
}

function directTo(link) {
    window.location.href = link;
}

showNotifications()