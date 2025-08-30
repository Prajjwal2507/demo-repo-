const express = require("express");
const app = express();

const users = [
  {
    names: "john",
    kidneys: [
      {
        health: false,
      },
      {
        health: true,
      },
    ],
  },
];

app.use(express.json());

// request and response
app.get("/", function (req, res) {
  const jonhKidneys = users[0].kidneys;
  const numberOfKindeys = jonhKidneys.length;
  let numberOfHealthyKindeys = 0;
  for (let i = 0; i < jonhKidneys.length; i++) {
    if (jonhKidneys[i].health) {
      numberOfHealthyKindeys++;
    }
  }
  const numberOfUnhealthyKindeys = numberOfKindeys - numberOfHealthyKindeys;

  res.json({
    numberOfKindeys,
    numberOfHealthyKindeys,
    numberOfUnhealthyKindeys,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    health: isHealthy,
  });

  res.json({
    msg: "Done!",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].health = true;
  }

  res.json({ msg: "All kidneys are now healthy!" });
});

app.delete("/", function (req, res) {
  if (isThereAnyUnhealtyKidney()) {
    const newKedneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].health) {
        newKedneys.push({
          health: true,
        });
      }
    }
    users[0].kidneys = newKedneys;
    res.json({ msg: "All unhealthy kidneys are now removed!" });
  } else {
    res.status(411).json({ msg: "you have no bad kidneys" });
  }
});

function isThereAnyUnhealtyKidney() {
  let atleastOneUnhealty = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].health) {
      atleastOneUnhealty = true;
    }
  }
  return atleastOneUnhealty;
}
app.listen(3000);
