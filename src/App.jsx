import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer";

function App() {
  return (
    <div className="font-serif">
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
