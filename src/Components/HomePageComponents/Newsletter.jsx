import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { PrimaryButton } from "../Shared/Button/Button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 lg:my-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Join Our Newsletter
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Stay updated with the latest books, exclusive offers, and reading
          insights delivered straight to your inbox.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center text-black text-sm font-medium hover:text-blue-500 hover:underline cursor-pointer">
            <FiArrowRight className="mr-2" />
            Weekly Updates
          </div>
          <div className="flex items-center text-black text-sm font-medium hover:text-blue-500 hover:underline cursor-pointer">
            <FiArrowRight className="mr-2" />
            Exclusive Content
          </div>
          <div className="flex items-center text-black text-sm font-medium hover:text-blue-500 hover:underline cursor-pointer">
            <FiArrowRight className="mr-2" />
            Book Recommendations
          </div>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
          <PrimaryButton type="submit">Subscribe Now</PrimaryButton>
        </form>

        {subscribed && (
          <p className="mt-4 text-green-500 text-sm">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
