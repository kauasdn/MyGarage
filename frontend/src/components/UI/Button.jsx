export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium h-fit self-end"
    >
      {children}
    </button>
  );
}