import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Cart from "./components/Cart";
import Category from "./components/Category";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import Elements from "./components/Elements";
import DetailsBlog from "./components/DetailsBlog";
import DetailsProduct from "./components/DetailsProduct";
import Tracking from "./components/Tracking";
import Login from "./components/Login";
import Logout from "./components/Logout";


function App() {
  return (
    <>
      <Header />
      <Routes basename="/">
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/detailsBlog" element={<DetailsBlog />} />
        <Route path="/detailsProduct" element={<DetailsProduct />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />





      </Routes>

      <Footer />
    </>
  );
}

export default App;
