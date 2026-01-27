import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkIfAdmin } from '../services/checkIfAdmin';

export default function Header() {
    const { user } = useAuth();
    let isAdmin = checkIfAdmin(user);

    const adminLogged = (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/createProduct">Create</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
            </li>
        </>
    );
    const logged = (
        <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
        </li>
    );

    const unlogged = (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>
    )
    return (
        <header className="header_area">
            <div className="top_menu">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="float-left">
                                <p>Phone: +01 256 25 235</p>
                                <p>email: info@eiser.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_menu">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light w-100">
                        <Link className="navbar-brand logo_h" to="/">
                            <img src="img/logo.png" style={{ height: "60px", width: "60px" }} alt="" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="collapse navbar-collapse offset w-100" id="navbarSupportedContent">
                            <div className="row w-100 mr-0">
                                <div className="col-lg-7 pr-0">
                                    <ul className="nav navbar-nav center_nav pull-right">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/shop">Shop</Link>
                                        </li>
                                        {/* <li className="nav-item submenu dropdown">
                                            <Link to="/blog" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                                aria-expanded="false">Blog</Link>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/blog">Blog</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/detailsBlog">Blog Details</Link>
                                                </li>
                                            </ul>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact</Link>
                                        </li>
                                        {Boolean(user.email) ? logged : unlogged}
                                        {isAdmin ? adminLogged : ""}

                                    </ul>
                                </div>

                                <div className="col-lg-5 pr-0">
                                    <ul className="nav navbar-nav navbar-right right_nav pull-right">
                                        {
                                            Boolean(user.email)
                                                ?
                                                <li className="nav-item">
                                                    <Link to="/cart" className="icons">
                                                        <i className="ti-shopping-cart"></i>
                                                    </Link>
                                                </li>
                                                : ""
                                        }


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}