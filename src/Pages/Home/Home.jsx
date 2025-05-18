import { useEffect } from "react";

const Home = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return <div></div>;
};

export default Home;
