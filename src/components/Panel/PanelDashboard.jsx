import { useState } from "react";
import { HiX } from "react-icons/hi";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { notepadAction } from "../../features/Root/RootSlice";

export default function PanelDashboard() {
  const localStore = localStorage.getItem("persist:root");
  const [notepad, setNotepad] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).noteList)
      : []
  );
  const dispatch = useDispatch();
  const today = new Date();

  const handleSubmit = (value) => {
    if (value.text !== "") {
      const date = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        dateStyle: "full",
      }).format(today);
      const time = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        timeStyle: "short",
      }).format(today);

      const newNote = [
        ...notepad,
        {
          id: notepad.length + 1,
          date: date,
          text: value.text,
          time: time,
        },
      ];
      setNotepad(newNote);
      dispatch(notepadAction(newNote));
      value.text = "";
    }
  };

  const handleDelete = (idnum) => {
    const newNote = notepad.filter((note) => note.id !== idnum);
    const upNote = newNote.map((item, index) => {
      return {
        id: index + 1,
        date: item.date,
        text: item.text,
        time: item.time,
      };
    });
    setNotepad(upNote);
    dispatch(notepadAction(upNote));
  };

  return (
    <div>
      <section className="m-10 py-6">
        <h2 className="font-semibold text-textHead-900">یادداشت‌های روزانه</h2>
        <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-toz">
          <Formik
            initialValues={{
              text: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form className="py-4 pr-8 sm:flex">
              <time dateTime={today} className="ml-2 py-2 flex-none">
                {new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
                  dateStyle: "full",
                }).format(today)}
              </time>
              <Field
                type="text"
                name="text"
                className="shadow-sm py-2 pr-3 block w-full sm:text-sm outline-none border-gray-300 rounded-md"
                placeholder="جهت یادآوری رویدادهای آتی خود را بنویسید"
              />
              <button
                type="submit"
                className="inline-flex items-center px-8 py-1 mx-2 border border-transparent text-md font-medium rounded shadow-sm text-white bg-button-600"
              >
                ثبت
              </button>
            </Form>
          </Formik>

          {notepad
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((note, index) => (
              <div key={index} className="relative">
                <button
                  type="button"
                  className="absolute top-4 text-gray-500 hover:text-toz"
                  onClick={() => handleDelete(note.id)}
                >
                  <HiX className="h-5 w-5" aria-hidden="true" />
                </button>
                <li className="py-4 pr-8 sm:flex">
                  <time dateTime={today} className="ml-2 flex-none">
                    {note.date}:
                  </time>

                  <p className="mt-2 flex-auto font-semibold text-textHead-800 sm:mt-0">
                    {note.text}
                  </p>
                  <p className="flex-none sm:ml-6">{note.time}</p>
                </li>
              </div>
            ))}
        </ol>
      </section>
    </div>
  );
}
