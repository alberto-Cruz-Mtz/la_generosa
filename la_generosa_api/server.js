const express = require("express");
const db = require("./index"); // Conexión a la base de datos
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de autenticación");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "Por favor, proporciona un usuario y una contraseña",
    });
  }

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(query, [username, password], (err) => {
    if (err) {
      return res
        .status(400)
        .json({ status: 400, message: "El usuario ya existe" });
    }
    res
      .status(201)
      .json({ status: 201, message: "Usuario registrado con éxito" });
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "Por favor, proporciona un usuario y una contraseña",
    });
  }

  // Buscar al usuario en la base de datos
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ status: 400, message: "Usuario o contraseña incorrectos" });
    }

    if (password === user.password) {
      res
        .status(200)
        .json({ status: 200, message: "Inicio de sesión exitoso" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "Usuario o contraseña incorrectos" });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
