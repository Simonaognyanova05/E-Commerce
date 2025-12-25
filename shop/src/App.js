import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import Elements from "./components/Elements";
import DetailsBlog from "./components/DetailsBlog";
import DetailsProduct from "./components/DetailsProduct";
import Tracking from "./components/Tracking";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Create from "./components/Create";
import Shop from "./components/Shop/Shop";
import Edit from "./components/Edit";
import Register from "./components/Register";
import OrderSuccess from "./components/OrderSuccess";
import Orders from "./components/Orders";


function App() {
  return (
    <>
      <Header />
      <Routes basename="/">
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/detailsBlog" element={<DetailsBlog />} />
        <Route path="/product/:productId" element={<DetailsProduct />} />
        <Route path="/editProduct/:id" element={<Edit />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/createProduct" element={<Create />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />





      </Routes>

      <Footer />
    </>
  );
}

export default App;
