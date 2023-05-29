import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export const plans = [
  {
    name: "نام دوره",
    value: 1,
  },
  {
    name: "نام استاد",
    value: 2,
  },
  {
    name: "دسته بندی",
    value: 3,
  },
];

const AdvanceSearch = ({ setSelectedCourse }) => {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full py-4">
      <div className="mx-2 w-full max-w-lg">
        <RadioGroup
          value={selected}
          onChange={(opt) => {
            setSelected(opt);
            setSelectedCourse(opt);
          }}
        >
          <div className="mx-auto gap-x-2 grid grid-cols-3">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white  ring-opacity-60 ring-offset-2 ring-offset-button-300"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-button-900 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-4 py-2 shadow-md focus:outline-none`
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`text-xs  ${
                              checked ? "text-white" : "text-textHead-800"
                            }`}
                          >
                            بر اساس {plan.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default AdvanceSearch;
