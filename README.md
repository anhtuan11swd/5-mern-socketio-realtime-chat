# ChatApp - Ứng Dụng Chat Real-time

<div align="center">

![Version](https://img.shields.io/badge/phi%C3%AAn%20b%E1%BA%A3n-1.0.0-blue)
![Node](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-19-61dafb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-gray)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248)
![License](https://img.shields.io/badge/license-ISC-blue)

**Chat với bạn bè mọi lúc, mọi nơi** — Ứng dụng chat thời gian thực được xây dựng trên kiến trúc MERN (MongoDB, Express, React, Node.js) với Socket.io.

</div>

---

## Mục lục

- [Giới thiệu](#gi%E1%BB%9Bi-thi%E1%BB%87u)
- [Tính năng](#t%C3%ADnh-n%C4%83ng)
- [Công nghệ sử dụng](#c%C3%B4ng-ngh%E1%BB%87-s%E1%BB%AD-d%E1%BB%A5ng)
- [Cấu trúc dự án](#c%E1%BA%A5u-tr%C3%BAc-d%E1%BB%B1-%C3%A1n)
- [Yêu cầu hệ thống](#y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng)
- [Cài đặt](#c%C3%A0i-%C4%91%E1%BA%B7t)
- [Cấu hình môi trường](#c%E1%BA%A5u-h%C3%ACnh-m%C3%B4i-tr%C6%B0%E1%BB%9Dng)
- [Hướng dẫn sử dụng](#h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-s%E1%BB%AD-d%E1%BB%A5ng)
- [API Endpoints](#api-endpoints)
- [Kiểm thử dữ liệu mẫu](#ki%E1%BB%83m-th%E1%BB%AD-d%E1%BB%AF-li%E1%BB%87u-m%E1%BA%ABu)
- [License](#license)

---

## Giới thiệu

**ChatApp** là một ứng dụng chat thời gian thực (real-time chat) được phát triển bởi **Trần Anh Tuấn**, cho phép người dùng giao tiếp với nhau qua tin nhắn văn bản và hình ảnh một cách tức thời. Ứng dụng áp dụng kiến trúc **MERN Stack** kết hợp với **Socket.io** để đảm bảo trải nghiệm chat mượt mà, cùng với giao diện hiện đại sử dụng **Tailwind CSS** và **DaisyUI**.

---

## Tính năng

### Xác thực & Bảo mật

- Đăng ký / Đăng nhập / Đăng xuất với JWT (JSON Web Token)
- Mật khẩu được mã hóa với bcryptjs
- Cookie HTTP-only giúp bảo vệ token khỏi tấn công XSS
- Validation dữ liệu đầu vào ở cả client và server với Zod

### Trò chuyện thời gian thực

- Gửi và nhận tin nhắn tức thời qua Socket.io
- Gửi hình ảnh trong tin nhắn (upload lên Cloudinary)
- Hiển thị trạng thái **online/offline** theo thời gian thực
- Lịch sử tin nhắn được lưu trữ trên MongoDB
- Xóa tin nhắn (chỉ người gửi mới có quyền xóa)

### Giao diện & Trải nghiệm người dùng

- Giao diện responsive, tương thích mobile và desktop
- **33+ chủ đề giao diện (themes)** từ DaisyUI — tha hồ tùy chỉnh
- Form đăng nhập/đăng ký với validation chi tiết
- Hiển thị avatar người dùng
- Thông báo toast (react-hot-toast) cho mọi thao tác
- Sidebar danh sách bạn bè, lọc theo trạng thái online

### Profile

- Xem thông tin cá nhân (họ tên, email, ngày tham gia)
- Upload / thay đổi ảnh đại diện (lưu trên Cloudinary)

### API Documentation

- Tài liệu API đầy đủ với **Swagger UI** tại `/api-docs`

---

## Công nghệ sử dụng

### Backend

| Công nghệ                      | Mục đích                    |
| ------------------------------ | --------------------------- |
| **Node.js**                    | Nền tảng runtime JavaScript |
| **Express 5**                  | Web framework               |
| **MongoDB + Mongoose 9**       | Cơ sở dữ liệu NoSQL & ODM   |
| **Socket.io 4**                | WebSocket real-time         |
| **JSON Web Token (JWT)**       | Xác thực người dùng         |
| **bcryptjs**                   | Mã hóa mật khẩu             |
| **Cloudinary**                 | Lưu trữ hình ảnh            |
| **Zod 4**                      | Validation dữ liệu          |
| **Swagger UI / swagger-jsdoc** | Tài liệu API                |
| **Nodemon**                    | Hot-reload khi phát triển   |
| **Biome / ESLint**             | Linting và format code      |

### Frontend

| Công nghệ            | Mục đích                         |
| -------------------- | -------------------------------- |
| **React 19**         | UI library                       |
| **Vite 8**           | Build tool                       |
| **Tailwind CSS 4**   | CSS utility framework            |
| **DaisyUI 5**        | Component UI library             |
| **Zustand**          | State management                 |
| **React Router 7**   | Điều hướng trang                 |
| **Socket.io Client** | Kết nối WebSocket từ trình duyệt |
| **Zod 4**            | Validation form                  |
| **Axios**            | HTTP client                      |
| **Lucide React**     | Icon library                     |
| **React Hot Toast**  | Thông báo toast                  |

---

## Cấu trúc dự án

```
5-mern-socketio-realtime-chat/
│
├── backend/                          # Backend (Express + Socket.io)
│   ├── src/
│   │   ├── controllers/              # Xử lý logic nghiệp vụ
│   │   │   ├── auth.controller.js    #   Đăng ký, đăng nhập, logout
│   │   │   └── message.controller.js #   Gửi, xóa, lấy tin nhắn
│   │   ├── lib/                      # Tiện ích & cấu hình
│   │   │   ├── cloudinary.js         #   Cấu hình Cloudinary
│   │   │   ├── db.js                 #   Kết nối MongoDB
│   │   │   ├── socket.js             #   Khởi tạo Socket.io server
│   │   │   ├── swagger.js            #   Cấu hình Swagger API docs
│   │   │   ├── utils.js              #   Hàm tạo JWT token
│   │   │   └── validations.js        #   Schema Zod validation
│   │   ├── middleware/
│   │   │   └── auth.middleware.js     # Middleware xác thực JWT
│   │   ├── models/
│   │   │   ├── message.model.js      # Schema tin nhắn
│   │   │   └── user.model.js         # Schema người dùng
│   │   ├── routes/
│   │   │   ├── auth.route.js         # Route xác thực
│   │   │   └── message.route.js      # Route tin nhắn
│   │   ├── seeds/
│   │   │   └── user.seed.js          # Dữ liệu mẫu
│   │   └── index.js                  # Entry point của server
│   ├── .env                          # Biến môi trường
│   ├── package.json
│   └── biome.json
│
├── frontend/                         # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/               # Component tái sử dụng
│   │   │   ├── chat/                 #   Component chat
│   │   │   │   ├── ChatContainer.jsx #     Khung chat chính
│   │   │   │   ├── ChatHeader.jsx    #     Header hiện tại
│   │   │   │   ├── MessageInput.jsx  #     Ô nhập tin nhắn
│   │   │   │   └── NoChatSelected.jsx#     Màn hình trống
│   │   │   ├── sidebar/              #   Component sidebar
│   │   │   │   ├── Sidebar.jsx       #     Sidebar danh sách bạn
│   │   │   │   └── SidebarSkeleton.jsx #   Skeleton loading
│   │   │   ├── AuthImagePattern.jsx  #   Hình ảnh trang auth
│   │   │   └── Navbar.jsx            #   Thanh điều hướng
│   │   ├── constants/
│   │   │   └── themes.js             # Danh sách themes
│   │   ├── lib/
│   │   │   ├── axios.js              # Instance Axios
│   │   │   ├── utils.js              # Hàm tiện ích
│   │   │   └── validations.js        # Schema Zod validation
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Trang chat chính
│   │   │   ├── LoginPage.jsx         # Đăng nhập
│   │   │   ├── ProfilePage.jsx       # Hồ sơ cá nhân
│   │   │   ├── SettingsPage.jsx      # Cài đặt theme
│   │   │   └── SignupPage.jsx        # Đăng ký
│   │   ├── store/                    # Zustand stores
│   │   │   ├── useAuthStore.js       #   Auth + Socket state
│   │   │   ├── useChatStore.js       #   Chat state
│   │   │   └── useThemeStore.js      #   Theme state
│   │   ├── App.jsx                   # Component gốc + Router
│   │   ├── main.jsx                  # Entry point React
│   │   └── index.css                 # Global styles (Tailwind + DaisyUI)
│   ├── .env                          # Biến môi trường
│   ├── vite.config.js
│   └── package.json
│
├── package.json                      # Scripts root (build, start)
├── .gitignore
└── README.md
```

---

## Yêu cầu hệ thống

- **Node.js** 18.x trở lên
- **npm** 9.x trở lên
- **MongoDB** (local hoặc MongoDB Atlas)
- **Tài khoản Cloudinary** (để upload ảnh — miễn phí)
- Trình duyệt web hiện đại (Chrome, Firefox, Edge)

---

## Cài đặt

### 1. Clone dự án

```bash
git clone <url-của-repository>
cd 5-mern-socketio-realtime-chat
```

### 2. Cài đặt dependencies

#### Root project

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend/` và `frontend/` (hoặc sử dụng file có sẵn).

**Backend** (`backend/.env`):

```env
MONGO_DB_URI=mongodb://<username>:<password>@<host>:<port>/<database>?options
PORT=5001
JWT_SECRET=<một-chuỗi-bí-mật-mạnh>
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=<tên-cloud-trên-cloudinary>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
CLIENT_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):

```env
VITE_API_URL=http://localhost:5001
```

> **Lưu ý**: File `.env` đã được liệt kê trong `.gitignore` nên sẽ không bị commit lên repository. Các thông tin nhạy cảm (mật khẩu, secret key) cần được bảo vệ.

### 4. Seed dữ liệu mẫu (tùy chọn)

Chạy lệnh sau trong thư mục `backend/` để tạo 8 tài khoản người dùng mẫu:

```bash
cd backend
npx nodemon src/seeds/user.seed.js
```

Danh sách tài khoản mẫu:

| Email              | Mật khẩu      |
| ------------------ | ------------- |
| `admin@admin.com`  | `Admin@123`   |
| `alice@test.com`   | `Alice@123`   |
| `bob@test.com`     | `Bob@123`     |
| `charlie@test.com` | `Charlie@123` |
| `diana@test.com`   | `Diana@123`   |
| `eve@test.com`     | `Eve@123`     |
| `frank@test.com`   | `Frank@123`   |
| `grace@test.com`   | `Grace@123`   |

---

## Hướng dẫn sử dụng

### Chạy ở môi trường phát triển (Development)

#### Chạy Backend

```bash
cd backend
npm run dev
```

Server sẽ chạy tại: `http://localhost:5001`

#### Chạy Frontend

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

### Chạy ở môi trường production

```bash
# Từ thư mục gốc
npm run build    # Cài đặt dependencies và build frontend
npm start        # Chạy backend (phục vụ cả frontend đã build)
```

---

### Các script có sẵn

#### Backend

| Script                 | Mô tả                                |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Chạy server với Nodemon (hot-reload) |
| `npm start`            | Chạy server production               |
| `npm run lint`         | Kiểm tra code với ESLint             |
| `npm run lint:fix`     | Tự động sửa lỗi ESLint               |
| `npm run biome:check`  | Kiểm tra code với Biome              |
| `npm run biome:format` | Format code với Biome                |
| `npm run biome:lint`   | Lint code với Biome                  |

#### Frontend

| Script            | Mô tả                    |
| ----------------- | ------------------------ |
| `npm run dev`     | Chạy Vite dev server     |
| `npm run build`   | Build production         |
| `npm run preview` | Xem bản build            |
| `npm run lint`    | Kiểm tra code với ESLint |

---

### Luồng hoạt động chính

1. **Đăng ký** tài khoản mới hoặc **đăng nhập** bằng tài khoản có sẵn
2. Sau khi đăng nhập, bạn sẽ thấy **danh sách người dùng** ở sidebar bên trái
3. Nhấp vào một người dùng để **bắt đầu trò chuyện**
4. Gõ tin nhắn và nhấn **Send** (hoặc nhấn phím Enter) để gửi
5. Có thể **đính kèm hình ảnh** bằng nút camera bên cạnh ô nhập
6. Bạn có thể **xóa tin nhắn** của mình (chỉ tin nhắn do bạn gửi)
7. Sử dụng menu **Cài đặt** (hình bánh răng) để chọn **chủ đề giao diện** yêu thích
8. Truy cập **Hồ sơ** để xem thông tin và thay đổi **ảnh đại diện**
9. Dấu chấm **xanh lá** bên cạnh avatar cho biết người dùng đang **online**

---

## API Endpoints

### Xác thực (`/api/v1/auth`)

| Method | Endpoint          | Mô tả                         | Xác thực |
| ------ | ----------------- | ----------------------------- | -------- |
| `POST` | `/signup`         | Đăng ký tài khoản mới         | ✗        |
| `POST` | `/login`          | Đăng nhập                     | ✗        |
| `POST` | `/logout`         | Đăng xuất                     | ✗        |
| `PUT`  | `/update-profile` | Cập nhật ảnh đại diện         | ✓        |
| `GET`  | `/check`          | Kiểm tra trạng thái đăng nhập | ✓        |

### Tin nhắn (`/api/v1/messages`)

| Method   | Endpoint        | Mô tả                                   | Xác thực |
| -------- | --------------- | --------------------------------------- | -------- |
| `GET`    | `/users`        | Lấy danh sách người dùng (cho sidebar)  | ✓        |
| `GET`    | `/:userId`      | Lấy lịch sử tin nhắn với một người dùng | ✓        |
| `POST`   | `/send/:userId` | Gửi tin nhắn                            | ✓        |
| `DELETE` | `/:messageId`   | Xóa tin nhắn (chỉ người gửi)            | ✓        |

### Swagger API Docs

Truy cập **http://localhost:5001/api-docs** để xem tài liệu API trực quan sau khi chạy server.

---

## Kiểm thử dữ liệu mẫu

Dự án có sẵn seed script giúp tạo người dùng mẫu để kiểm thử:

```bash
cd backend
npx nodemon src/seeds/user.seed.js
```

Script này sẽ tạo (hoặc upsert) **8 tài khoản** với các mật khẩu mạnh đáp ứng đầy đủ yêu cầu validation (chữ hoa, chữ thường, số, ký tự đặc biệt). Bạn có thể sử dụng các tài khoản này để đăng nhập và test tính năng chat.

---

## License

Dự án được phân phối dưới giấy phép **ISC**.

---

<div align="center">
  <p>Phát triển bởi <strong>Trần Anh Tuấn</strong></p>
</div>
