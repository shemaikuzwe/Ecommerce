export default function InputGroup({
  type,
  placeholder,
  label,
  aria,
  Inputvalue,
}: {
  type: string;
  placeholder?: string;
  label: string;
  aria?: string;
  Inputvalue?: string | number;
}) {
  return (
    <>
      <label htmlFor={label} className={"capitalize mt-5"}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={label}
        className="block w-full mt-2 outline-0 rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        aria-describedby={aria}
        defaultValue={Inputvalue}
      />
    </>
  );
}
