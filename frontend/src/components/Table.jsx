export default function Table({ headers, data, renderRow }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden border dark:border-gray-700">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-sm">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-4 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                {renderRow(item)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="p-8 text-center text-gray-400">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}