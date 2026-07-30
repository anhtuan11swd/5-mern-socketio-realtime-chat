import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore.js";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isMessagesLoading } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImageFile(reader.result);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;

    const data = {};
    if (text.trim()) data.text = text.trim();
    if (imageFile) data.image = imageFile;

    const result = await sendMessage(data);
    if (result.success) {
      setText("");
      removeImage();
    }
  };

  return (
    <div className="border-base-300 border-t p-4">
      {imagePreview && (
        <div className="relative mb-3 inline-block">
          <img
            alt="Preview"
            className="h-24 w-24 rounded-lg object-cover"
            src={imagePreview}
          />
          <button
            className="btn btn-ghost btn-xs absolute -top-2 -right-2 rounded-full bg-base-100 shadow"
            onClick={removeImage}
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      <form className="flex items-center gap-2" onSubmit={handleSend}>
        <input
          accept="image/*"
          hidden
          onChange={handleImageChange}
          ref={fileInputRef}
          type="file"
        />
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Image className="size-5" />
        </button>
        <input
          className="input input-bordered w-full"
          disabled={isMessagesLoading}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tin nhắn..."
          type="text"
          value={text}
        />
        <button
          className="btn btn-primary"
          disabled={isMessagesLoading || (!text.trim() && !imageFile)}
          type="submit"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
