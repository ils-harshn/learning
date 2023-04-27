import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../utils";

const Navbar = () => {
    const navigate = useNavigate();
    return <>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{cursor: "pointer"}}>
                        <li className="nav-item active" onClick={() => navigate("/")}>
                            <a className="nav-link ">
                                Home
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => navigate("/orders")}>
                            <a
                                className="nav-link"
                            >
                                Orders
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                            >
                                My Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                            >
                                About
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center">
                    <Link className="nav-link me-3" to="/cart">
                        <i className="fas fa-shopping-cart" />
                    </Link>
                    <a className="nav-link me-3" href="#">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a className="nav-link me-3" href="#">
                        <i className="fab fa-twitter" />
                    </a>
                    <a
                        href="#"
                        className="border rounded px-2 nav-link"
                        onClick={() => {
                            clearToken();
                            navigate("/auth/login/");
                        }}
                    >
                        <i className="fa fa-sign-out me-2" />
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    </>

}

export default Navbar;