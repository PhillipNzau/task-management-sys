import { useState, useEffect } from "react";
import { fetchTodos } from "@/feature/todo/services/todoService";
import { TodoModel } from "@/feature/todo/models/todoModel";
import TaskFilter from "@/components/TaskFilter";
import TaskTable from "@/components/Table";
import SEO from "@/components/SEO";

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

      <h1 className="text-bold text-xl text-white my-4">Task Summary</h1>
      {/* Filter */}
      <TaskFilter selectedTab={selectedTab} onTabClick={filterByStatus} />

      {/* table */}
      {loading ? (
        <p className="text-white">Loading</p>
      ) : (
        <TaskTable caption={selectedTab} tasks={filteredTodos} />
      )}
    </section>
  );
};

export default Home;
