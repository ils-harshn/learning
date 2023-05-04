import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../utils";
import { useEffect, useState } from "react";
import { getCartProducts, get_token } from "../api";

const Navbar = ({ cartcount }) => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(cartcount || 0);
    const token = get_token();

    const fetchData = async () => {
        let data = await getCartProducts(token);
        if (data) {
            setCartCount(data.length);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center" style={{ cursor: "pointer" }}>
                        <li className="nav-item" onClick={() => navigate("/")}>
                            <a className="nav-link">
                                <img style={{
                                    height: 40
                                }} src="https://raw.githubusercontent.com/codewithsadee/anon-ecommerce-website/master/assets/images/logo/logo.svg" />
                            </a>
                        </li>
                        <li className="nav-item active" onClick={() => navigate("/")}>
                            <a className="nav-link ">
                                Home
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => navigate("/product/search")}>
                            <a
                                className="nav-link"
                            >
                                Products
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => navigate("/orders")}>
                            <a
                                className="nav-link"
                            >
                                Orders
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center">
                    <Link className="nav-link me-3" to="/cart">
                        <i className="fas fa-shopping-cart" />
                        <span className="badge rounded-pill badge-notification bg-danger">{cartCount}</span>
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