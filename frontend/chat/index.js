var username;

const receivedMsgAudio = document.getElementById("received-msg-audio");

if ("Notification" in window) {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
    } else {
      alert("Needed permission otherwise no access!\nThank You");
      alert("To continue on chat please enable, notification for this domain.");
      // window.location.href = "/frontend/";
    }
  });
} else {
  alert("Notifications not supported in your browser.");
}

function getCurrentTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}

function appendMsg(msg, username, received = true) {
  var $container = $("#msgs");
  var htmlToAppend = `
        <div class="msg msg-${received ? "received" : "send"}">
            <div class="msg-date">${getCurrentTime()}</div>
            <div class="msg-container">
                <div class="msg-item">
                <div class="msg-username">From ${username}</div>
                <div class="msg-content">
                    ${msg}
                </div>
                </div>
            </div>
        </div>
    `;
  $container.append(htmlToAppend);
  $container.scrollTop($container[0].scrollHeight);

  if (received) {
    receivedMsgAudio.play().catch((error) => {});
    console.log(document.visibilityState);
    if (document.visibilityState === "hidden") {
      if (Notification.permission === "granted") {
        new Notification(username, {
          body: `Message from ${username}`,
        });
      }
    }
  }
}

function appendUsers(users, id) {
  var $container = $("#users-list-scroller");
  $container.empty();
  var i = 0;
  var htmlToAppend = "";
  for (const [key, value] of Object.entries(users)) {
    i++;
    htmlToAppend += `<div class="users-list-item">
      <div class="users-list-username">${id === key ? "You" : value}</div>
      <div class="users-list-username-id">${key}</div>
    </div>\n`;
  }

  $container.append(htmlToAppend);
  $container.scrollTop($container[0].scrollHeight);

  var $countContainer = $("#users-count");
  $countContainer.text(i);
}

function appendLog(data) {
  var $container = $("#right-container");
  var htmlToAppend = `
        <div class="log ${data.type}">${data.msg}</div>
    `;
  $container.append(htmlToAppend);
  $container.scrollTop($container[0].scrollHeight);
}

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  username = urlParams.get("name");

  if (!username) {
    window.location.href = "/frontend/";
  }

  $("#msg-input-form").submit(function (e) {
    e.preventDefault();
    let msg = $("#msg-value").val();
    if (msg) {
      socket.emit("send-msg", msg);
      appendMsg(msg, username, false);
    }
    $("#msg-value").val("");
  });

  const socket = io("http://192.168.2.12:3000");
  socket.emit("add-user", username);
  appendLog({
    type: "user-connected",
    msg: "You Joined The Server",
  });

  appendMsg("Hii, I have joined the server!", username, false);

  socket.on("receive-msg", (data) => {
    appendMsg(data.msg, data.name);
  });

  socket.on("user-connected", (data) => {
    appendLog(data);
    appendMsg("Hii, I have joined the server!", data.name);
  });

  socket.on("user-disconnected", (data) => {
    appendLog(data);
    appendMsg("Left the server", data.name);
  });

  socket.on("update-users-list", (data) => {
    appendUsers(data.users, socket.id);
  });
});
