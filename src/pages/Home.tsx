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
    </section>
  );
};

export default Home;
