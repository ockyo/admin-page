const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');


const app = express();
const PORT = 5000;

// Secret key để ký token
const SECRET_KEY = "your-secret-key";

// URL kết nối MongoDB (thay đổi nếu bạn sử dụng MongoDB Atlas hoặc MongoDB khác)
const url = "mongodb+srv://trungnguyenkc5:nguyen0803@devtest.laahnze.mongodb.net/Dev01?retryWrites=true&w=majority&appName=DevTest";
const client = new MongoClient(url);

// Tên database và collection
const dbName = "AppLive";
const collectionName = "UserApp";

app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Kết nối MongoDB thành công");
  } catch (err) {
    console.error("Lỗi kết nối MongoDB:", err);
    process.exit(1); // Dừng ứng dụng nếu không kết nối được MongoDB
  }
}

// Middleware để kiểm tra dữ liệu của req và res
app.use((req, res, next) => {
  // In dữ liệu request (req)
  console.log("Request Method:", req.method);  // GET, POST, PUT, DELETE, v.v.
  console.log("Request URL:", req.url);  // URL của yêu cầu
  console.log("Request Headers:", req.headers);  // Headers của yêu cầu
  console.log("Request Body:", req.body);  // Body của yêu cầu (thường là đối với POST, PUT)
  console.log("Request Query:", req.query);  // Query params (nếu có)

  // Cài đặt một đoạn code để ghi lại thông tin response (res)
  const originalSend = res.send;  // Lưu lại phương thức send ban đầu
  res.send = function (body) {
    console.log("Response Body:", body);  // In dữ liệu phản hồi
    originalSend.call(res, body);  // Gọi lại phương thức send gốc để gửi phản hồi
  };

  next();  // Tiếp tục xử lý các route hoặc middleware khác
});

const getAllUsersFromDatabase = async () => {
  try {
    const db = client.db(dbName); // Kết nối tới cơ sở dữ liệu MongoDB
    const collection = db.collection(collectionName); // Truy cập collection cần lấy dữ liệu

    // Sử dụng find() để lấy tất cả dữ liệu trong collection và chuyển đổi thành mảng với toArray()
    const users = await collection.find({}).toArray(); // toArray() chuyển kết quả thành mảng

    // In tất cả dữ liệu ra console
    console.log("All users in the database:", users);

  } catch (error) {
    console.error("Error retrieving users from database:", error); // Xử lý lỗi nếu có
  }
};
getAllUsersFromDatabase();

// Hàm lấy người dùng từ MongoDB theo UserName
const getUserFromDatabase = async (userName) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return await collection.findOne({ UserName: userName });
};
// Endpoint đăng nhập
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Kiểm tra người dùng trong cơ sở dữ liệu
    const user = await getUserFromDatabase(username);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // So sánh mật khẩu đã mã hóa
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.UserName,
      },
      SECRET_KEY,
      { expiresIn: '1h' } // Token hết hạn sau 1 giờ
    );

    // Trả về token cho frontend
    return res.json({ token });

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
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

// Endpoint để lấy tất cả người dùng
app.get('/api/users', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// Khởi động server và kết nối MongoDB
app.listen(PORT, async () => {
  await connectToDatabase(); // Kết nối MongoDB
  console.log(`Server is running on http://localhost:${PORT}`);
});
