export default function Input(props){
  return (
    <input
      id="name"
      name="name"
      type="text"
      autoComplete="name"
      required
      className="pl-2	block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      padding
      placeholder={props.placeholder}
    />
  )
}
