const swaggerSpec = {
  info: {
    description: "API tài liệu cho ứng dụng chat realtime",
    title: "Chat App API",
    version: "1.0.0",
  },
  openapi: "3.0.0",
  paths: {
    "/api/v1/auth/check": {
      get: {
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    _id: {
                      example: "664f1a2b3c4d5e6f7a8b9c0d",
                      type: "string",
                    },
                    email: {
                      example: "nguyenvana@example.com",
                      type: "string",
                    },
                    fullName: { example: "Nguyễn Văn A", type: "string" },
                    profilePic: {
                      example:
                        "https://res.cloudinary.com/diq6ddzmc/image/upload/v1743357600/5-mern-socketio-realtime-chat/profiles/abc123xyz.jpg",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Người dùng đã đăng nhập",
          },
          401: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: {
                      example: "Không có quyền truy cập",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Chưa đăng nhập",
          },
        },
        security: [{ cookieAuth: [] }],
        summary: "Kiểm tra trạng thái đăng nhập",
        tags: ["Xác thực"],
      },
    },
    "/api/v1/auth/login": {
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  email: {
                    description: "Địa chỉ email",
                    example: "nguyenvana@example.com",
                    format: "email",
                    type: "string",
                  },
                  password: {
                    description: "Mật khẩu",
                    example: "MyP@ssw0rd",
                    format: "password",
                    type: "string",
                  },
                },
                required: ["email", "password"],
                type: "object",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    _id: {
                      example: "664f1a2b3c4d5e6f7a8b9c0d",
                      type: "string",
                    },
                    email: {
                      example: "nguyenvana@example.com",
                      type: "string",
                    },
                    fullName: { example: "Nguyễn Văn A", type: "string" },
                    profilePic: { example: "", type: "string" },
                  },
                  type: "object",
                },
              },
            },
            description: "Đăng nhập thành công",
          },
          401: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: {
                      example: "Email hoặc mật khẩu không hợp lệ",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Thông tin đăng nhập không hợp lệ",
          },
        },
        summary: "Đăng nhập",
        tags: ["Xác thực"],
      },
    },
    "/api/v1/auth/logout": {
      post: {
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: {
                      example: "Đăng xuất thành công",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Đăng xuất thành công",
          },
        },
        summary: "Đăng xuất",
        tags: ["Xác thực"],
      },
    },
    "/api/v1/auth/signup": {
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  email: {
                    description: "Địa chỉ email",
                    example: "nguyenvana@example.com",
                    format: "email",
                    type: "string",
                  },
                  fullName: {
                    description: "Họ và tên",
                    example: "Nguyễn Văn A",
                    type: "string",
                  },
                  password: {
                    description:
                      "Mật khẩu (tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt)",
                    example: "MyP@ssw0rd",
                    format: "password",
                    type: "string",
                  },
                },
                required: ["fullName", "email", "password"],
                type: "object",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    _id: {
                      example: "664f1a2b3c4d5e6f7a8b9c0d",
                      type: "string",
                    },
                    email: {
                      example: "nguyenvana@example.com",
                      type: "string",
                    },
                    fullName: { example: "Nguyễn Văn A", type: "string" },
                    profilePic: { example: "", type: "string" },
                  },
                  type: "object",
                },
              },
            },
            description: "Đăng ký thành công",
          },
          400: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: { example: "Email đã tồn tại", type: "string" },
                  },
                  type: "object",
                },
              },
            },
            description: "Lỗi dữ liệu đầu vào",
          },
        },
        summary: "Đăng ký tài khoản mới",
        tags: ["Xác thực"],
      },
    },
    "/api/v1/auth/update-profile": {
      put: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  profilePic: {
                    description: "Ảnh đại diện dạng base64",
                    example: "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
                    type: "string",
                  },
                },
                required: ["profilePic"],
                type: "object",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    _id: {
                      example: "664f1a2b3c4d5e6f7a8b9c0d",
                      type: "string",
                    },
                    email: {
                      example: "nguyenvana@example.com",
                      type: "string",
                    },
                    fullName: { example: "Nguyễn Văn A", type: "string" },
                    profilePic: {
                      example:
                        "https://res.cloudinary.com/diq6ddzmc/image/upload/v1743357600/5-mern-socketio-realtime-chat/profiles/abc123xyz.jpg",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Cập nhật thành công",
          },
          400: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: {
                      example: "Vui lòng chọn ảnh đại diện",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Thiếu ảnh đại diện",
          },
        },
        security: [{ cookieAuth: [] }],
        summary: "Cập nhật ảnh đại diện",
        tags: ["Xác thực"],
      },
    },
    "/api/v1/messages/{messageId}": {
      delete: {
        parameters: [
          {
            description: "ID tin nhắn cần xóa",
            in: "path",
            name: "messageId",
            required: true,
            schema: { example: "884f1a2b3c4d5e6f7a8b9c0f", type: "string" },
          },
        ],
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: { example: "Đã xóa tin nhắn", type: "string" },
                  },
                  type: "object",
                },
              },
            },
            description: "Đã xóa tin nhắn",
          },
          403: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: {
                      example: "Không có quyền xóa tin nhắn này",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Không có quyền xóa tin nhắn này",
          },
          404: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    message: {
                      example: "Tin nhắn không tồn tại",
                      type: "string",
                    },
                  },
                  type: "object",
                },
              },
            },
            description: "Tin nhắn không tồn tại",
          },
        },
        security: [{ cookieAuth: [] }],
        summary: "Xóa tin nhắn (chỉ người gửi mới được xóa)",
        tags: ["Tin nhắn"],
      },
    },
    "/api/v1/messages/{userId}": {
      get: {
        parameters: [
          {
            description: "ID người dùng cần xem lịch sử",
            in: "path",
            name: "userId",
            required: true,
            schema: { example: "774f1a2b3c4d5e6f7a8b9c0e", type: "string" },
          },
        ],
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  example: [
                    {
                      _id: "884f1a2b3c4d5e6f7a8b9c0f",
                      createdAt: "2026-07-30T08:30:00.000Z",
                      image: "",
                      receiverId: "774f1a2b3c4d5e6f7a8b9c0e",
                      senderId: "664f1a2b3c4d5e6f7a8b9c0d",
                      text: "Chào bạn, khỏe không?",
                    },
                    {
                      _id: "994f1a2b3c4d5e6f7a8b9c1a",
                      createdAt: "2026-07-30T08:31:00.000Z",
                      image:
                        "https://res.cloudinary.com/diq6ddzmc/image/upload/v1743357600/5-mern-socketio-realtime-chat/messages/ghi789xyz.jpg",
                      receiverId: "664f1a2b3c4d5e6f7a8b9c0d",
                      senderId: "774f1a2b3c4d5e6f7a8b9c0e",
                      text: "Mình khỏe, cảm ơn bạn!",
                    },
                  ],
                  items: {
                    properties: {
                      _id: {
                        example: "884f1a2b3c4d5e6f7a8b9c0f",
                        type: "string",
                      },
                      createdAt: {
                        example: "2026-07-30T08:30:00.000Z",
                        type: "string",
                      },
                      image: { example: "", type: "string" },
                      receiverId: {
                        example: "774f1a2b3c4d5e6f7a8b9c0e",
                        type: "string",
                      },
                      senderId: {
                        example: "664f1a2b3c4d5e6f7a8b9c0d",
                        type: "string",
                      },
                      text: {
                        example: "Chào bạn, khỏe không?",
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
              },
            },
            description: "Danh sách tin nhắn",
          },
        },
        security: [{ cookieAuth: [] }],
        summary: "Lấy lịch sử tin nhắn với một người dùng",
        tags: ["Tin nhắn"],
      },
    },
    "/api/v1/messages/send/{userId}": {
      post: {
        parameters: [
          {
            description: "ID người nhận",
            in: "path",
            name: "userId",
            required: true,
            schema: { example: "774f1a2b3c4d5e6f7a8b9c0e", type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  image: {
                    description: "Ảnh dạng base64 (không bắt buộc)",
                    example: "data:image/png;base64,iVBORw0...",
                    type: "string",
                  },
                  text: {
                    description: "Nội dung tin nhắn",
                    example: "Chào bạn, khỏe không?",
                    type: "string",
                  },
                },
                type: "object",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    _id: {
                      example: "884f1a2b3c4d5e6f7a8b9c0f",
                      type: "string",
                    },
                    createdAt: {
                      example: "2026-07-30T08:30:00.000Z",
                      type: "string",
                    },
                    image: { example: "", type: "string" },
                    receiverId: {
                      example: "774f1a2b3c4d5e6f7a8b9c0e",
                      type: "string",
                    },
                    senderId: {
                      example: "664f1a2b3c4d5e6f7a8b9c0d",
                      type: "string",
                    },
                    text: { example: "Chào bạn, khỏe không?", type: "string" },
                  },
                  type: "object",
                },
              },
            },
            description: "Tin nhắn đã gửi",
          },
        },
        security: [{ cookieAuth: [] }],
        summary: "Gửi tin nhắn",
        tags: ["Tin nhắn"],
      },
    },
    "/api/v1/messages/users": {
      get: {
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  example: [
                    {
                      _id: "664f1a2b3c4d5e6f7a8b9c0d",
                      email: "nguyenvana@example.com",
                      fullName: "Nguyễn Văn A",
                      profilePic: "",
                    },
                    {
                      _id: "774f1a2b3c4d5e6f7a8b9c0e",
                      email: "tranthibich@example.com",
                      fullName: "Trần Thị Bích",
                      profilePic:
                        "https://res.cloudinary.com/diq6ddzmc/image/upload/v1743357600/5-mern-socketio-realtime-chat/profiles/def456xyz.jpg",
                    },
                  ],
                  items: {
                    properties: {
                      _id: {
                        example: "664f1a2b3c4d5e6f7a8b9c0d",
                        type: "string",
                      },
                      email: {
                        example: "nguyenvana@example.com",
                        type: "string",
                      },
                      fullName: { example: "Nguyễn Văn A", type: "string" },
                      profilePic: {
                        example:
                          "https://res.cloudinary.com/diq6ddzmc/image/upload/v1743357600/5-mern-socketio-realtime-chat/profiles/abc123xyz.jpg",
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
              },
            },
            description: "Danh sách người dùng (không bao gồm password)",
          },
        },
        security: [{ cookieAuth: [] }],
        summary: "Lấy danh sách người dùng cho sidebar",
        tags: ["Tin nhắn"],
      },
    },
  },
  servers: [
    {
      description: "Máy chủ phát triển",
      url: "http://localhost:5001",
    },
  ],
  tags: [
    { description: "API xác thực người dùng", name: "Xác thực" },
    { description: "API nhắn tin", name: "Tin nhắn" },
  ],
};

export default swaggerSpec;
