import { useEffect, useState } from "react";
import { Loader } from "../../utils";
import { getProducts } from "../../api";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import MainLoader from "../../Components/MainLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});

    const fetchData = async () => {
        let data = await getProducts();
        if (data) {
            setProducts(data);
            setLoading(false);
        } else {
            alert("Something Went Wrong")
        }
    }

    useEffect(() => {
        fetchData();
    })

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
                                        <ProductCard item={item} key={item.id}/>
                                    ))
                                }
                            </div>
                        </div>
                    </section>

                    <nav
                        aria-label="Page navigation example"
                        className="d-flex justify-content-center mt-3"
                    >
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
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