import { useEffect } from "react";
import HomeBanner from "../../Components/HomePageComponents/HomeBanner";

const Home = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<div>
			<HomeBanner />
		</div>
	);
};

export default Home;
