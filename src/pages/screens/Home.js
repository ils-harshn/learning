import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import MainLoader from "../../Components/MainLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});
    const navigate = useNavigate();
    const [location, setLocation] = useState(useLocation().search);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [rating, setRating] = useState("");

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
            {
                loading ? <MainLoader /> : <>
                    <section>
                        <section className="d-flex mb-4">
                            <input placeholder="Title" type="text" className="form-control" style={{ marginRight: 10 }} value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            <input placeholder="Price" type="number" className="form-control" style={{ marginRight: 10 }} value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            <input placeholder="Discounted Price" type="number" className="form-control" style={{ marginRight: 10 }} value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)}></input>
                            <input placeholder="Discount Percentage" type="number" className="form-control" style={{ marginRight: 10 }} value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)}></input>
                            <input placeholder="Rating" className="form-control" style={{ marginRight: 10 }} value={rating} onChange={(e) => setRating(e.target.value)}></input>
                            <button onClick={() => navigate(`/product/search?title=${title}&price=${price}&discounted_price=${discountedPrice}&discount_percentage=${discountPercentage}&rating=${rating}&page=1`)} className="btn btn-primary">Filter</button>
                        </section>
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