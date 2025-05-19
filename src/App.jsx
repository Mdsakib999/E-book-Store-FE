import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer";
import { ScrollToTop } from "./Utils/ScrollToTop";

function App() {
  return (
    <div className="font-serif">
      <ScrollToTop />
      {/* Nav bar */}
      <Navbar></Navbar>

      {/* Children component */}
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default App;
