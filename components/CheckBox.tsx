import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function CheckBox({
  onClick = () => {},
  initiallyActive = false,
  text,
}: {
  onClick;
  initiallyActive?: boolean;
  text?: string;
}) {
  const [active, setActive] = useState(initiallyActive);
  function checkBoxClick() {
    onClick();
    setActive(!active);
  }
  return (
    <button className="flex space-x-4 items-center" onClick={checkBoxClick}>
      <div
        className={`flex justify-center items-center h-4 w-4 rounded
            ${
              !active // We check for !active because it makes sense to write not active classes first
                ? `border border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-600 dark:hover:border-gray-400 active:bg-gray-200 active:border-gray-800 dark:active:bg-gray-600 dark:active:border-gray-300` // Not active
                : `bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 active:bg-blue-700 dark:active:bg-blue-700 text-white` // Active
            }
        `}
      >
        {active && <FaCheck size="10" />}
      </div>
      {text && <p>{text}</p>}
    </button>
  );
}
