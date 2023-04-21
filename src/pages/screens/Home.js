import { useEffect, useState } from "react";
// import { Loader } from "../../utils";
import { getProducts } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import MainLoader from "../../Components/MainLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});
    const navigate = useNavigate();
    const [location, setLocation] = useState(useLocation().search);

    const fetchData = async () => {
        setLoading(true);
        let query = new URLSearchParams(location);
        let limit = query.get("limit") ? query.get("limit") : 24;
        let offset = query.get("offset") ? query.get("offset") : 0;
        let data = await getProducts(limit, offset);
        if (data) {
            setProducts(data);
            setLoading(false);
        } else {
            alert("Something Went Wrong")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [location])

    return (
        <>
            <div className="filters mb-4" style={{ cursor: "pointer" }}>
                <div className="input-group">
                    <div className="form-outline border">
                        <input type="search" id="form1" style={{
                            border: "none",
                            outline: "none",
                            paddingLeft: 8,
                        }} placeholder="Search" />
                    </div>
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-search" />
                    </button>
                </div>
            </div>
            {
                loading ? <MainLoader /> : <>
                    <section>
                        <div className="text-center">
                            <div className="row">
                                {
                                    products.results.map((item) => (
                                        <ProductCard item={item} key={item.id} />
                                    ))
                                }
                            </div>
                        </div>
                    </section>

                    <nav
                        aria-label="Page navigation example"
                        className="d-flex justify-content-center mt-3"
                    >
                        <ul className="pagination" style={{ cursor: "pointer" }}>
                            <li className={products.previous ? "page-item" : "page-item disabled"} onClick={() => {
                                if (products.previous) {
                                    navigate(products.previous.slice(57))
                                    // fetchData();
                                    setLocation(products.previous.slice(57))
                                }
                            }}>
                                <a className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li className={products.next ? "page-item" : "page-item disabled"} onClick={() => {
                                if (products.next) {
                                    navigate(products.next.slice(57))
                                    // fetchData();
                                    setLocation(products.next.slice(57))
                                }
                            }}>
                                <a className="page-link" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            }
        </>
    )
}

export default Home;