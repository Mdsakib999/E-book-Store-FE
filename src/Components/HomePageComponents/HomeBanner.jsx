import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bookImage from "../../assets/bookImage1.png";
import { Fade, Slide, Zoom } from "react-awesome-reveal"; // smoother than Slide + Zoom

const slides = [
	{
		title: "Editor's Picks",
		subtitle: "Best Reads of February",
		description: "Explore handpicked books curated by Readify Editors.",
	},
	{
		title: "Romantic Escapes",
		subtitle: "Love is in the Pages",
		description: "Dive into timeless romantic novels this February.",
	},
	{
		title: "Thrilling Adventures",
		subtitle: "Heart-Racing Stories",
		description: "Get lost in suspense and excitement with these picks.",
	},
	{
		title: "Self-Growth Gems",
		subtitle: "Become Your Best Self",
		description: "Start your journey to personal growth and success.",
	},
];

const HomeBanner = () => {
	return (
		<div className="bg-pink-50 py-20">
			<div className="max-w-7xl mx-auto px-5">
				<Slide>
					<Carousel
						showThumbs={false}
						showStatus={false}
						showArrows={false}
						infiniteLoop
						autoPlay
						interval={5000}
						transitionTime={700}
						emulateTouch
					>
						{slides.map((slide, index) => (
							<div
								key={index}
								className="flex flex-col md:flex-row items-center justify-between gap-8"
							>
								<div className="flex-1 space-y-4 text-center md:text-left">
									<p className="text-gray-500 font-semibold">{slide.title}</p>
									<h1 className="text-3xl md:text-5xl font-bold leading-snug">
										{slide.subtitle}
									</h1>
									<p className="text-gray-600 text-base">{slide.description}</p>
									<button className="bg-black text-white px-10 py-2 mt-6 rounded shadow-md hover:bg-gray-800 transition">
										See More
									</button>
								</div>

								<Zoom duration={3000}>
									<div className="flex-1">
										<img
											src={bookImage}
											alt="Book Banner"
											className="w-full h-auto max-h-[300px] object-contain mx-auto"
										/>
									</div>
								</Zoom>
							</div>
						))}
					</Carousel>
				</Slide>
			</div>
		</div>
	);
};

export default HomeBanner;
