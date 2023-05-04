import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import MainLoader from "../../Components/MainLoader";
import { Banner } from "../../Components/Banner";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const Home = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/product/search/?title=${title}`)
    }
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});

    const fetchData = async () => {
        setLoading(true);
        let data = await getProducts(16, 0);
        if (data) {
            setProducts(data);
            setLoading(false);
        } else {
            alert("Something Went Wrong")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div style={{marginTop: 80}}><Navbar /></div>
            <Banner />
            <form style={{ padding: "10px 20% 10px 20%", display: "flex" }} onSubmit={handleSubmit}>
                <input placeholder="Search Products"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", marginRight: 10 }}></input>
                <button class="btn btn-primary ms-1" disabled={title.length == 0}>Search</button>
            </form>
            <div style={{ padding: "10px 20% 10px 20%" }}>
                <ul style={{ display: "flex", listStyle: "none", justifyContent: "space-between" }}>
                    <li style={{ marginRight: 20, textAlign: "center" }}
                        onClick={() => navigate(`/product/search/?title=Mobile`)}>
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/128/128/image/d64cae0f8081256a.png?q=100"
                            style={{ width: 60 }}
                        ></img><br />
                        Mobile & Tablet
                    </li>
                    <li style={{ marginRight: 20, textAlign: "center" }}
                        onClick={() => navigate(`/product/search/?title=Electronics`)}>
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/128/128/image/7dbcda527b648814.png?q=100"
                            style={{ width: 60 }}
                        ></img><br />
                        Electronics
                    </li>
                    <li style={{ marginRight: 20, textAlign: "center" }}
                        onClick={() => navigate(`/product/search/?title=TV`)}>
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/128/128/image/e29a070388d534a5.png?q=100"
                            style={{ width: 60 }}
                        ></img><br />
                        TVs & Appliances
                    </li>
                    <li style={{ marginRight: 20, textAlign: "center" }}
                        onClick={() => navigate(`/product/search/?title=`)}>
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/128/128/image/1350e22cff9663e7.png?q=100"
                            style={{ width: 60 }}
                        ></img><br />
                        Others
                    </li>
                </ul>
            </div>
            <div className="text-center container mt-4">
                <h2 className="mb-4">New Products</h2>
                <div className="row">

                    {
                        loading == false &&
                        products.results.map((item) => (
                            <ProductCard item={item} key={item.id} />
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;