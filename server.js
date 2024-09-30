const express = require("express");
const translate = require("@vitalets/google-translate-api");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  try {
    const response = await translate(text, { to: targetLang });
    res.json({ translatedText: response.text });
  } catch (err) {
    res.status(500).json({ error: "Translation failed" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
