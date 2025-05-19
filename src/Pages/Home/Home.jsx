import { useEffect } from "react";
import HomeBanner from "../../Components/HomePageComponents/HomeBanner";
import { FeaturedCategories } from "../../Components/HomePageComponents/FeaturedCategories";
import Newsletter from "../../Components/HomePageComponents/Newsletter";
import { FeaturedBooks } from "../../Components/HomePageComponents/FeaturedBooks";
import { BestSelling } from "../../Components/HomePageComponents/BestSelling";
import { Offer } from "../../Components/HomePageComponents/Offer";

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
      <Offer />
      <Newsletter />
    </div>
  );
};

export default Home;
