import { FC, ChangeEventHandler } from "react";
import NextLink from "next/link";
import { logoPath } from "@/utils/paths";

const FormBox = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="bg-gray-50 dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-lg">
        <div className="flex px-7 pt-7 pb-5 border-b border-gray-200">
          {/* 
          flex is needed because otherwise the <a> element extends horizontally
          */}
          <NextLink href="/">
            <a>
              <img src={logoPath} className="h-14" />
            </a>
          </NextLink>
        </div>
        <div className="py-4 px-7 space-y-4">{children}</div>
      </div>
    </div>
  );
};

const FormInput = ({
  placeholder = "",
  onChange = () => {},
}: {
  placeholder?: string;
  onChange?: ChangeEventHandler;
}) => {
  return (
    <input
      className="h-10 w-full px-4 rounded-md ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-900"
      placeholder={placeholder}
    />
  );
};

export { FormBox, FormInput };
