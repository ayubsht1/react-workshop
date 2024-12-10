import { useState, useEffect } from 'react';

function App() {
  const [todo, setToDo] = useState(
    localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
  );

  // Update localStorage whenever `todo` changes
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          ToDo App
        </h1>
        <input
          type="text"
          placeholder="Add a new task..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.target.value.trim()) {
              setToDo([...todo, event.target.value.trim()]);
              event.target.value = "";
            }
          }}
        />
        <hr className="my-4" />
        <div className="space-y-3">
          {todo.map((value, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <span className="text-gray-800">{value}</span>
              <button
                className="text-red-500 hover:text-red-700 font-medium"
                onClick={() => {
                  const newList = todo.filter((_, i) => i !== index);
                  setToDo(newList);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {todo.length > 0 && (
          <button
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => setToDo([])}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
