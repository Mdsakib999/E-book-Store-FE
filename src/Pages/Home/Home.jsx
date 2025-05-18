import { useEffect } from "react";
import HomeBanner from "../../Components/HomePageComponents/HomeBanner";
import { FeaturedCategories } from "../../Components/HomePageComponents/FeaturedCategories";
import { BestSelling } from "../../Components/HomePageComponents/BestSelling";
import { FeaturedBooks } from "../../Components/HomePageComponents/FeaturedBooks";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <HomeBanner />
      <FeaturedCategories />
      <FeaturedBooks />
      <BestSelling />
    </div>
  );
};

export default Home;
