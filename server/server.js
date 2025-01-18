const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Secret key để ký token
const SECRET_KEY = "your-secret-key";

app.use(cors());
app.use(bodyParser.json());

// Endpoint xử lý đăng nhập
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Đọc dữ liệu từ file users.json
  fs.readFile("server/users.json", "utf8", (err, data) => {
    if (err) {
      console.log("read users file failed");
      return res.status(500).json({ message: "Error reading users file" });
    }
    console.log("read users file successed");
    const users = JSON.parse(data);
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Tạo token JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        SECRET_KEY,
        { expiresIn: "1h" } // Token hết hạn sau 1 giờ
      );

      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

// Endpoint để xác thực token
app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Xác minh token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    res.json({ message: "Access granted", user: decoded });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// // API login (ví dụ)
// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;
//   if (email === "user@example.com" && password === "password123") {
//     res.json({ token: "mock-jwt-token" });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// });