import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFiliteredProducts } from "../../api";
import MainLoader from "../../Components/MainLoader";
import ProductCard from "../../Components/ProductCard";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const SearchProducts = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(useLocation().search);
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState(searchParams.get("title") || "");
    const [price, setPrice] = useState(searchParams.get("price") || "");
    const [discountedPrice, setDiscountedPrice] = useState(searchParams.get("discountedPrice") || "");
    const [discountPercentage, setDiscountPercentage] = useState(searchParams.get("discountPercentage") || "");
    const [rating, setRating] = useState(searchParams.get("rating") || "");
    const [page, setPage] = useState(searchParams.get("page") || 1);

    const fetchData = async () => {
        navigate(`/product/search?title=${title}&price=${price}&discounted_price=${discountedPrice}&discount_percentage=${discountPercentage}&rating=${rating}&page=${page}`);
        let data = await getFiliteredProducts(title, price, discountedPrice, discountPercentage, rating, page);
        setProducts(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [page, loading])

    return <>
        <>
            <div style={{ marginTop: 80 }}><Navbar /></div>
            <div className="container" style={{
                display: "flex",
                minHeight: "100vh"
            }}>
                <div className="mb-4" style={{ width: "30%", padding: "10px 80px 10px 10px"}}>
                    <h2 style={{ marginBottom: 10}}>Filter Products</h2>
                    <input placeholder="Title" type="text" className="form-control" style={{ marginRight: 10, marginBottom: 10 }} value={title} onChange={(e) => { setTitle(e.target.value); setLoading(true)}}></input>
                    <input placeholder="Price" min={1} type="number" className="form-control" style={{ marginRight: 10, marginBottom: 10 }} value={price} onChange={(e) => { setPrice(e.target.value); setLoading(true)}}></input>
                    <input placeholder="Discounted Price" type="number" min={1} className="form-control" style={{ marginRight: 10, marginBottom: 10 }} value={discountedPrice} onChange={(e) => { setDiscountedPrice(e.target.value); setLoading(true)}}></input>
                    <input placeholder="Discount Percentage" type="number" min={1} max={100} className="form-control" style={{ marginRight: 10, marginBottom: 10 }} value={discountPercentage} onChange={(e) => { setDiscountPercentage(e.target.value); setLoading(true)}}></input>
                    <input placeholder="Rating" className="form-control" min={1} max={5} style={{ marginRight: 10, marginBottom: 10 }} value={rating} onChange={(e) => { setRating(e.target.value); setLoading(true)}}></input>
                    <button onClick={() => setLoading(true)} className="btn btn-primary">Filter</button>
                </div>
                <div className="searched-items" style={{ width: "70%"}}>
                    {
                        loading ? <MainLoader /> : <>
                            <section>
                                <div className="text-center">
                                    {products.results.length ? <div className="row">
                                        {
                                            products.results.map((item) => (
                                                <ProductCard item={item} key={item.id} />
                                            ))
                                        }
                                    </div> : <h2 className="mt-4">No Results Found</h2>}

                                </div>
                            </section>
{/* 
                            <nav
                                aria-label="Page navigation example"
                                className="d-flex justify-content-center mt-3"
                            >
                                <ul className="pagination" style={{ cursor: "pointer" }}>
                                    <li className={products.previous ? "page-item" : "page-item disabled"} onClick={() => {
                                        if (products.previous) {
                                            setPage(prev => parseInt(prev) - 1)
                                            setLoading(true)
                                        }
                                    }}>
                                        <a className="page-link" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                        </a>
                                    </li>
                                    <li className={products.next ? "page-item" : "page-item disabled"} onClick={() => {
                                        if (products.next) {
                                            setPage(prev => parseInt(prev) + 1)
                                            setLoading(true)
                                        }
                                    }}>
                                        <a className="page-link" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav> */}
                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    </>
}

export default SearchProducts;