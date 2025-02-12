import { useState } from "react";

export default function SmallToggleSwitch({ defaultState, onToggle }) {
  const [isOn, setIsOn] = useState(defaultState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState); // Cập nhật trạng thái trong toggle
    if (onToggle) onToggle(newState); // Gọi callback
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          isOn ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  );
}
