const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
