import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function TagInput() {
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      e.target.value = ""; // Reset input
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white flex flex-wrap gap-2 items-center">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm"
        >
          {tag}
          <button
            onClick={() => removeTag(index)}
            className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <IoCloseSharp />
          </button>
        </span>
      ))}
      <input
        type="text"
        className="flex-1 border-none outline-none bg-transparent px-2 py-1"
        placeholder="Nhập và nhấn Enter..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
