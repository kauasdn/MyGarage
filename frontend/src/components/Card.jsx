export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h2>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">{value}</p>
        </div>
        {icon && <div className="text-red-500">{icon}</div>}
      </div>
    </div>
  );
}