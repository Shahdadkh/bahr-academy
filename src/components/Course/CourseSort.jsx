
export default function CourseSort({ files, setFiles, setCurrentPage}) {
  const handleChange = (value) => {
    const data = value.target.value;
    const copyFiles = [...files];

    if (data === "پر ظرفیت ترین") {
      copyFiles.sort((a, b) => b.capacity - a.capacity);
      setFiles(copyFiles);
      setCurrentPage(0);
    }

    if (data === "محبوب ترین") {
      copyFiles.sort((a, b) => b.__v - a.__v);
      setFiles(copyFiles);
      setCurrentPage(0);
    }

    if (data === "ارزان ترین") {
      copyFiles.sort((a, b) => a.cost - b.cost);
      setFiles(copyFiles);
      setCurrentPage(0);
    }

    if (data === "همه دوره ها") {
      setFiles(files);
      setCurrentPage(0);
    }
  };

  return (
    <div className="inline-block">
      <select
        onChange={(event) => handleChange(event)}
        name="course"
        className="mt-4 block pl-3 pr-4 py-2 mr-4 text-base bg-background-800 text-textHead-900 border focus:outline-none focus:ring-button-500 focus:button-indigo-500 sm:text-sm rounded-md"
        defaultValue="همه دوره ها"
      >
        <option>پر ظرفیت ترین</option>
        <option>محبوب ترین</option>
        <option>ارزان ترین</option>
        <option>همه دوره ها</option>
      </select>
    </div>
  );
}
