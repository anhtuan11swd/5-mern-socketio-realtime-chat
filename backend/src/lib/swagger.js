import swaggerJsdoc from "swagger-jsdoc";

const options = {
  apis: ["./src/routes/*.js"],
  definition: {
    info: {
      description: "API tài liệu cho ứng dụng chat realtime",
      title: "Chat App API",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Máy chủ phát triển",
        url: "http://localhost:5001",
      },
    ],
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
