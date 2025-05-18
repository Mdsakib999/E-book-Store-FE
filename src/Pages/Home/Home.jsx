import { useEffect } from "react";
import HomeBanner from "../../Components/HomePageComponents/HomeBanner";
import { FeaturedCategories } from "../../Components/HomePageComponents/FeaturedCategories";
import Newsletter from "../../Components/Newsletter";
import { FeaturedBooks } from "../../Components/HomePageComponents/FeaturedBooks";
import { BestSelling } from "../../Components/HomePageComponents/BestSelling";

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
      <Newsletter />
    </div>
  );
};

export default Home;
