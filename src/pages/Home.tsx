import SEO from "../components/SEO";

const Home = () => {
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
        <div className="flex items-center gap-4 text-white bg-gray-700 w-52 p-2 rounded-md transition-all duration-200 cursor-pointer">
          <div className="bg-violet-600 p-2 rounded-md">
            <img src="/tasks.svg" alt="all tasks" height={25} width={25} />
          </div>
          <div className="">
            <p className="text-sm text-gray-300">All Tasks</p>
            <p className="font-bold">45</p>
          </div>
        </div>

        {/* Ongoing tasks */}
        <div className="flex items-center gap-4 text-white hover:bg-gray-700 w-52 p-2 rounded-md transition-all duration-200 cursor-pointer">
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
        <div className="flex items-center gap-4 text-white hover:bg-gray-700 w-52 p-2 rounded-md transition-all duration-200 cursor-pointer">
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
        <div className="flex items-center gap-4 text-white hover:bg-gray-700 w-52 p-2 rounded-md transition-all duration-200 cursor-pointer">
          <div className="bg-rose-600 p-2 rounded-md">
            <img src="/trash.svg" alt="deleted tasks" height={25} width={25} />
          </div>
          <div className="">
            <p className="text-sm text-gray-300">Deleted Tasks</p>
            <p className="font-bold">27</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
