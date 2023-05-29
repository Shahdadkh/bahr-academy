export default function ShoppingSelectPayment({ setPaymentType }) {
  const handleChange = (value) => {
    const data = value.target.value;
    setPaymentType(data);
  };
  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm text-textHead-800 font-bold"
      >
        انتخاب روش پرداخت:
      </label>
      <select
        onChange={(event) => handleChange(event)}
        name="Payment"
        className="mt-1 block w-full pr-3 pl-10 py-2 bg-background-700 text-textHead-800 text-base border-gray-300 focus:outline-none  sm:text-sm rounded-md"
        defaultValue="پرداخت از طریق درگاه بانکی"
      >
        <option>پرداخت از طریق درگاه بانکی</option>
        <option>پرداخت از طریق کارت الکترونیک</option>
      </select>
    </div>
  );
}
