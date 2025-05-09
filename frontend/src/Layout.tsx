import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-dark-color">
      <Navbar />
      
      {/* pt-32 md:pt-20 */}
      <main className="min-h-screen">  
          <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;