import { ChangeEventHandler, MouseEvent, MouseEventHandler, useState } from "react";
import NextLink from "next/link";
import { logoPath } from "@/utils/paths";
import CheckBox from "@/components/CheckBox";

const FormBox = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="bg-gray-50 dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-lg">
        <div className="flex px-9 pt-7 pb-5 border-b border-gray-200">
          {/* 
          flex is needed because otherwise the <a> element extends horizontally
          */}
          <NextLink href="/">
            <a>
              <img src={logoPath} className="h-14" />
            </a>
          </NextLink>
        </div>
        <div className="py-6 px-9 space-y-6">{children}</div>
      </div>
    </div>
  );
};

const FormInput = ({
  placeholder = "",
  onChange = () => { },
  type = "text",
  desc,
}: {
  placeholder?: string;
  onChange?: ChangeEventHandler;
  type?: string;
  desc?: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <input
        className="w-full px-4 h-11 rounded-md ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-900"
        placeholder={placeholder}
        onChange={onChange}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
      />
      {desc &&
        <div className={`mt-2 px-4 text-sm text-gray-500 dark:text-gray-400 ${type != "password" && `-mb-2`}`}>
          {desc}
        </div>
      }
      {type === "password" &&
        <>
          <div className={`${desc ? `mt-2` : `mt-3`}`} />
          <CheckBox text="Show password" onClick={() => setShowPassword(!showPassword)} />
        </>
      }
    </div>
  );
};

const FormSubmit = ({
  text = "",
  onClick = (event: MouseEvent) => { },
  disabled = true,
}: {
  text?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-blue-700 rounded-md bg-opacity-90 text-gray-100 text-lg py-1.5"
    >
      {text}
    </button>
  );
};

export { FormBox, FormInput, FormSubmit };
