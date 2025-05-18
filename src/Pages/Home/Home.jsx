import { useEffect } from "react";
import { FeaturedCategories } from "../../Components/HomePageComponents/FeaturedCategories";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <FeaturedCategories />
    </div>
  );
};

export default Home;
