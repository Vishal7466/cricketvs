
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname)));

// Session config
app.use(
  session({
    secret: "cricketvs_admin_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

// 🔐 Hashed password of "admin1234"
const HASHED_PASS =
  "$2b$10$eFD9IyMUapkRXF/Nhy0HLOZstkMv6UIeKI6XUl6MG3Gvc3HdlZNDG";

// Serve Login Page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Login API
app.post("/api/login", async (req, res) => {
  const { password } = req.body;

  const match = await bcrypt.compare(password, HASHED_PASS);
  if (!match) return res.json({ success: false });

  req.session.logged = true;
  return res.json({ success: true });
});

// Secure admin page
app.get("/admin", (req, res) => {
  if (!req.session.logged) {
    return res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "index.html"));
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Start server
app.listen(3000, () => console.log("🔥 Server running at http://localhost:3000"));
