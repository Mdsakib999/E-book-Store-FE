import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar/Navbar";
import { ScrollToTop } from "./Utils/ScrollToTop";
import Footer from "./Components/Shared/Footer";

function App() {
  return (
    <div className="font-serif ">
      <ScrollToTop />
      <Navbar />
      {/* Children component */}
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
