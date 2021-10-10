import { RadioGroup } from "@headlessui/react";

interface option {
  value: string;
  label: string;
  desc?: string;
}

export default function RadioGroupComponents({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: any;
  onChange: any;
  options: option[];
}) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label>
        <h2>{label}</h2>
      </RadioGroup.Label>
      <div
        className="rounded-md ring-1 ring-gray-200 dark:ring-gray-700 divide-y divide-solid divide-gray-200 dark:divide-gray-700 my-4
    "
      >
        {options.map((option, index) => (
          <RadioGroup.Option value={option.value}>
            {({ checked }) => (
              <div
                className={`px-4 py-2 hover:cursor-pointer
               active:bg-blue-300 dark:active:bg-blue-800
               ${index === 0 && `rounded-t-md`}
               ${index === options.length - 1 && `rounded-b-md`}
              ${
                checked
                  ? `bg-blue-200 dark:bg-blue-700`
                  : `hover:bg-blue-100 dark:hover:bg-gray-800/50 dark:bg-gray-900`
              }`}
              >
                <RadioGroup.Label className="text-lg">
                  {option.label}
                </RadioGroup.Label>
                {option.desc && (
                  <RadioGroup.Description className="text-sm text-gray-500 dark:text-gray-400">
                    {option.desc}
                  </RadioGroup.Description>
                )}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
