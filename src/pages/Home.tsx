import TableDemo from "@/components/Table";
import SEO from "../components/SEO";
import { fetchTodos } from "@/feature/todo/services/todoService";
import { useState, useEffect } from "react";
import { TodoModel } from "@/feature/todo/models/todoModel";

const Home = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  // const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        setTodos(data);
        setFilteredTodos(data);
        setLoading(false);
      })
      .catch(() => {
        // setError(err.message);
        setLoading(false);
      });
  }, []);

  const filterByStatus = (status: string) => {
    setSelectedTab(status);
    if (status === "all") {
      // If "All Tasks" tab is clicked, reset the filter to display all tasks
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) => todo.status === status);
      setFilteredTodos(filtered);
    }
  };

  return (
    <section className="p-8 px-20">
      <SEO
        title="Task Management"
        description="FAO's ultimate project management system"
        type="article"
      />
      <h1 className="text-bold text-xl text-white">Task Summary</h1>
      <div className="flex items-center justify-between">
        {/* All tasks */}
        <div
          className={`flex items-center gap-4 text-white w-52 p-2 rounded-md transition-all duration-200 cursor-pointer ${
            selectedTab === "all" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => filterByStatus("all")}
        >
          <div className="bg-violet-600 p-2 rounded-md">
            <img src="/tasks.svg" alt="all tasks" height={25} width={25} />
          </div>
          <div className="">
            <p className="text-sm text-gray-300">All Tasks</p>
            <p className="font-bold">45</p>
          </div>
        </div>

        {/* Ongoing tasks */}
        <div
          className={`flex items-center gap-4 text-white w-52 p-2 rounded-md transition-all duration-200 cursor-pointer ${
            selectedTab === "incomplete" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => filterByStatus("incomplete")}
        >
          <div className="bg-orange-600 p-2 rounded-md">
            <img
              src="/ongoing.svg"
              alt="ongoing tasks"
              height={25}
              width={25}
            />
          </div>
          <div className="">
            <p className="text-sm text-gray-300">Ongoing Tasks</p>
            <p className="font-bold">27</p>
          </div>
        </div>

        {/* Complete tasks */}
        <div
          className={`flex items-center gap-4 text-white w-52 p-2 rounded-md transition-all duration-200 cursor-pointer ${
            selectedTab === "complete" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => filterByStatus("complete")}
        >
          <div className="bg-green-600 p-2 rounded-md">
            <img
              src="/completed.svg"
              alt="completed tasks"
              height={25}
              width={25}
            />
          </div>
          <div className="">
            <p className="text-sm text-gray-300">Complete Tasks</p>
            <p className="font-bold">27</p>
          </div>
        </div>

        {/* Deleted tasks */}
        <div
          className={`flex items-center gap-4 text-white w-52 p-2 rounded-md transition-all duration-200 cursor-pointer ${
            selectedTab === "deleted" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => filterByStatus("deleted")}
        >
          <div className="bg-rose-600 p-2 rounded-md">
            <img src="/trash.svg" alt="deleted tasks" height={25} width={25} />
          </div>
          <div className="">
            <p className="text-sm text-gray-300">Deleted Tasks</p>
            <p className="font-bold">27</p>
          </div>
        </div>
      </div>

      {/* table */}
      {loading ? (
        <p className="text-white">Loading</p>
      ) : (
        <TableDemo caption={selectedTab} tasks={filteredTodos} />
      )}
    </section>
  );
};

export default Home;
