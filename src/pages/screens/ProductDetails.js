import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLoader from "../../Components/MainLoader";
import { addProductToCartFromID, getCartProducts, getProductDetailFromID, get_token, removeProductFromCartFromId } from "../../api";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const CartButton = ({ id, quantity, token, is_in_cart, setLoader }) => {
    const [isInCart, setIsInCart] = useState(is_in_cart);

    const handleAddToCart = async (event) => {
        let is_added = await addProductToCartFromID(id, quantity, token);
        if (is_added) {
            setIsInCart(true)
            setLoader(true)
        }
        else alert("Something Went Wrong");
    }

    const handleRemoveFromCart = async (event) => {
        let is_removed = await removeProductFromCartFromId(id, token);
        if (is_removed) {
            setIsInCart(false)
            setLoader(true)
        }
        else {
            alert("Something Went Wrong");
        };
    }

    return <>
        {
            isInCart ?
                <button className="btn btn-danger ms-1" onClick={handleRemoveFromCart}>
                    Remove
                    <i className="fas fa-shopping-cart ms-1" />
                </button>
                : <button className="btn btn-primary ms-1" onClick={handleAddToCart}>
                    Add
                    <i className="fas fa-shopping-cart ms-1" />
                </button>
        }
    </>
}



const ProductDetails = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    // const [added, setAdded] = useState(false);
    const [data, setData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const token = get_token();

    const fetchData = async () => {
        // setLoading(true);
        let data = await getProductDetailFromID(params.id, token);
        let carttotal = await getCartProducts(token);

        if (data && carttotal) {
            setData(data);
            setQuantity(data.is_in_cart ? data.quantity_added : 1)
            // setAdded(data.is_in_cart)
            setTotal(carttotal.length)
            setLoading(false);
        } else alert("No data found")
    }

    useEffect(() => {
        fetchData();
    }, [loading])

    return <>
        {loading ? <MainLoader /> : <>
            <Navbar cartcount={total} />
            <main className="mt-5 pt-4">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <img
                                src={data.product.img_url}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="p-4">
                                <a>
                                    <span className="badge bg-info me-1">Discount: {data.product.discount_percentage}%</span>
                                </a>
                                <div className="mb-3">
                                    <p>{data.product.title}</p>
                                </div>
                                <p className="lead">
                                    <span className="me-1">
                                        <del>₹{data.product.price}</del>
                                    </span>
                                    <span>{data.product.discounted_price}</span>
                                </p>
                                <strong>
                                    <p style={{ fontSize: 20 }}>Description</p>
                                </strong>
                                <p>
                                    {data.product.about_product}
                                </p>
                                <div className="d-flex justify-content-left align-items-center">
                                    Quantity
                                    <div className="form-outline me-1" style={{ width: 100, border: "1px solid black", marginLeft: 10 }}>
                                        <input type="number" value={quantity} className="form-control" onChange={(e) => setQuantity(e.target.value)} min={1} max={data.product.quantity} />
                                    </div>
                                    <CartButton id={data.product.id} token={token} quantity={quantity} is_in_cart={data.is_in_cart} setLoader={setLoading} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 text-center">
                            <h4 className="my-4 h4">Additional information</h4>
                            <p>Ratings: {data.product.rating}</p>
                            <p>Avialable Quantity: {data.product.quantity}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
        }
    </>
}

export default ProductDetails;