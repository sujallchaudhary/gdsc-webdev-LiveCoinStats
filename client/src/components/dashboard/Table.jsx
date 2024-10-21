import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-600 text-white">
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4 border border-gray-300">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              {columns.map((column, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border border-gray-300">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
