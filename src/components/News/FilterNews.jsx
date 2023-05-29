import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import http from "../../core/services/Interceptor";

const people = [{ name: "همه موارد" }, { name: "اخبار" }, { name: "مقالات" }];

export const FilterNews = ({ setSelectedNews }) => {
  const [selected, setSelected] = useState(people[0]);

  const handleChange = async (value) => {
    setSelected(value);
    if (value.name === "همه موارد") {
      try {
        const result = await http.get("/news", {
          // query URL without using browser cache
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setSelectedNews(result.data.result);
      } catch (error) {
        console.log(error);
      }
    } else if (value.name === "اخبار") {
      try {
        const result = await http.get("/news/category/news", {
          // query URL without using browser cache
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setSelectedNews(result.data.result);
      } catch (error) {
        console.log(error);
      }
    } else if (value.name === "مقالات") {
      try {
        const result = await http.get("/news/category/article", {
          // query URL without using browser cache
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setSelectedNews(result.data.result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="absolute w-40 top left-2 top-0 border-none">
      <Listbox value={selected} onChange={(e) => handleChange(e)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pr-3 pl-10 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex pr-2"></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-button-200 text-button-900"
                        : "text-textHead-800"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
