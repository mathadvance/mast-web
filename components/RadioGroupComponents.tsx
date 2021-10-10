import { RadioGroup } from "@headlessui/react";

export function RadioOptionWrapper({ children }) {
  return (
    <div
      className="rounded-md ring-1 ring-gray-200 dark:ring-gray-700 divide-y divide-solid divide-gray-200 dark:divide-gray-700 my-4
    "
    >
      {children}
    </div>
  );
}

export function RadioOption({
  value,
  label,
  desc,
}: {
  value: string;
  label: string;
  desc?: string;
}) {
  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <div
          className={`px-4 py-2 hover:cursor-pointer
           active:bg-blue-300 dark:active:bg-blue-800
          ${
            checked
              ? `bg-blue-200 dark:bg-blue-700`
              : `hover:bg-blue-100 dark:hover:bg-gray-800/50 dark:bg-gray-900`
          }`}
        >
          <RadioGroup.Label className={`text-lg ${checked ? `` : ``}`}>
            {label}
          </RadioGroup.Label>
          {desc && (
            <RadioGroup.Description
              className={`text-sm ${
                checked ? `` : `text-gray-500 dark:text-gray-400`
              }`}
            >
              {desc}
            </RadioGroup.Description>
          )}
        </div>
      )}
    </RadioGroup.Option>
  );
}
