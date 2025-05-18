import { useEffect } from "react";
import HomeBanner from "../../Components/HomePageComponents/HomeBanner";
import { FeaturedCategories } from "../../Components/HomePageComponents/FeaturedCategories";

const Home = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<div>
			<HomeBanner />
			<FeaturedCategories />
		</div>
	);
};

export default Home;
