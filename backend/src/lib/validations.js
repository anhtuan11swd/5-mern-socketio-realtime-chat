import { z } from "zod";

const fullNameSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập họ tên")
  .refine((val) => val.length >= 2, {
    message: "Họ tên phải có ít nhất 2 ký tự",
  })
  .refine((val) => val.length <= 100, {
    message: "Họ tên không được vượt quá 100 ký tự",
  })
  .refine((val) => /[^\s]/.test(val), {
    message: "Họ tên không được chỉ chứa khoảng trắng",
  })
  .refine((val) => /[\p{L}]/u.test(val), {
    message: "Họ tên phải chứa ít nhất một chữ cái",
  })
  .refine((val) => /^[\p{L}\s'.-]+$/u.test(val), {
    message:
      "Họ tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch ngang (-), dấu nháy (') và dấu chấm (.)",
  })

  .transform((val) => val.replace(/\s+/g, " "));

const passwordSchema = z
  .string()
  .min(1, "Vui lòng nhập mật khẩu")
  .refine((val) => val.length >= 8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự",
  })
  .refine((val) => val.length <= 64, {
    message: "Mật khẩu không được vượt quá 64 ký tự",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Mật khẩu phải chứa ít nhất một chữ cái thường",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Mật khẩu phải chứa ít nhất một chữ cái hoa",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Mật khẩu phải chứa ít nhất một chữ số",
  })
  .refine((val) => /[!@#$%^&*()_+\-={}[\]|\\:;"<>?,./~`]/.test(val), {
    message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
  })
  .refine((val) => !/\s/.test(val), {
    message: "Mật khẩu không được chứa khoảng trắng",
  })
  .refine(
    (val) =>
      !/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(
        val,
      ),
    {
      message: "Mật khẩu không được chứa emoji",
    },
  );

const signupSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  fullName: fullNameSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID không hợp lệ");

const base64Schema = z
  .string()
  .min(1, "Vui lòng chọn ảnh")
  .refine((val) => /^data:image\/[a-z]+;base64,/.test(val), {
    message: "Ảnh không đúng định dạng base64",
  });

const updateProfileSchema = z.object({
  profilePic: base64Schema,
});

const sendMessageSchema = z
  .object({
    image: base64Schema.optional(),
    text: z
      .string()
      .max(5000, "Tin nhắn không được vượt quá 5000 ký tự")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.text || data.image, {
    message: "Vui lòng nhập nội dung tin nhắn hoặc chọn ảnh",
    path: ["text"],
  });

const mongoIdSchema = objectIdSchema;

export {
  loginSchema,
  mongoIdSchema,
  sendMessageSchema,
  signupSchema,
  updateProfileSchema,
};
