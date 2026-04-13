export default function Input({ label, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className="border rounded-lg px-3 py-2 w-full outline-none transition-colors
                   bg-white border-gray-300 text-gray-900 placeholder-gray-400
                   focus:ring-2 focus:ring-red-500 
                   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500
                   dark:focus:ring-red-400"
      />
    </div>
  );
}