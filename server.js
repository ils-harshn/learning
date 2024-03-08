const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const EventEmitter = require("events");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const delay = 10 * 1000;
const data = {
  creator: "Harsh N.",
  version: "V.2.2",
  locker: "Essential timestamp lock system"
};

// Create an event emitter
const eventEmitter = new EventEmitter();

app.post("/api/locker", (req, res) => {
  const { user_id, work_id, unlock } = req.body;

  if (!user_id || !work_id) {
    return res.status(400).json({
      error:
        "Invalid request. Please provide user_id, work_id, and unlock(boolean).",
    });
  }

  if (unlock) {
    if (data[work_id]) {
      delete data[work_id];
      // Emit event for change in data
      eventEmitter.emit("dataChanged", data);
      res.json({ status: "unlocked" });
    } else {
      res.json({ status: "unlocked" });
    }
  } else {
    if (data[work_id]) {
      const currTime = new Date();
      const locked_till = new Date(data[work_id].locked_till);
      const locked_by = data[work_id].user_id;

      if (locked_till > currTime && user_id !== locked_by) {
        res.status(400).json({
          ...data[work_id],
          locked_time_string: new Date(data[work_id].locked_till).toString(),
          locked: true,
        });
      } else {
        data[work_id].user_id = user_id;
        data[work_id].locked_till = +new Date() + delay;
        // Emit event for change in data
        eventEmitter.emit("dataChanged", data);
        res.json({
          ...data[work_id],
          locked_time_string: new Date(data[work_id].locked_till).toString(),
        });
      }
    } else {
      data[work_id] = {
        user_id,
        work_id,
        locked_till: +new Date() + delay,
      };
      // Emit event for change in data
      eventEmitter.emit("dataChanged", data);
      res.json({
        ...data[work_id],
        locked_time_string: new Date(data[work_id].locked_till).toString(),
      });
    }
  }
});

app.get("/api/locks", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Drafts those are/were locked</title>
      <script>
        // JavaScript event emitter listener
        const eventSource = new EventSource('/api/locks/events');
        eventSource.onmessage = function(event) {
          // Render updated data on the page
          const locksData = JSON.parse(event.data);
          document.getElementById('locksData').textContent = JSON.stringify(locksData, null, 4);
          document.getElementById('locksData').style.color = "green";
          setTimeout(() => {
            document.getElementById('locksData').style.color = "white";
          }, 500);
        };
        
      </script>
      <style>
        body {
          background-color: black;
        }
        
        h1 {
          color: white;
        }
        
        pre {
          color: white;
        }
      </style>
    </head>
    <body>
      <h1>Drafts those are/were locked</h1>
      <pre id="locksData">${JSON.stringify(data, null, 4)}</pre>
    </body>
    </html>
  `);
});


// Event source endpoint to stream events
app.get("/api/locks/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send initial data
  sendEvent(data);

  // Listen for data change events
  eventEmitter.on("dataChanged", (updatedData) => {
    sendEvent(updatedData);
  });

  // Clean up on client disconnect
  req.on("close", () => {
    eventEmitter.off("dataChanged");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
