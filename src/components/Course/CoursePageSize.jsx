export default function CoursePageSize({ setPageSize, setCurrentPage }) {
  const handleChange = (value) => {
    const data = value.target.value;
    setPageSize(data);
    setCurrentPage(0);
  };

  return (
    <div className="inline-block float-left mt-4">
      <select
        onChange={(event) => handleChange(event)}
        name="course"
        className="CourseLeftFloat mt-1 block pl-3 pr-4 py-2 ml-4 bg-background-800 text-textHead-900 text-base border focus:outline-none focus:ring-button-500 focus:border-button-500 sm:text-sm rounded-md"
        defaultValue="8"
      >
        <option>4</option>
        <option>8</option>
        <option>12</option>
      </select>
    </div>
  );
}
