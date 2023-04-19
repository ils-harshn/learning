import { useEffect, useState } from "react";
import CartItemCard from "../../Components/CartItemCard";
import { getCartProducts, get_token } from "../../api"
import MainLoader from "../../Components/MainLoader";


const CartDetails = () => {
    const [items, setItems] = useState({})
    const [loading, setLoading] = useState(true);
    const token = get_token();

    const fetchData = async () => {
        setLoading(true);
        let data = await getCartProducts(token);
        if (data) {
            setItems(data)
            setLoading(false);
        }
        else alert("Something went wrong")
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <>
        {
            loading ?
                <MainLoader /> :
                <section>
                    <div className="container h-100 py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-10">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                    <div>
                                        <p className="mb-0">
                                            <span className="text-muted">Total Items: {items.count}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-warning btn-block btn-lg">
                                            Proceed to Pay
                                        </button>
                                    </div>
                                </div>
                                {
                                    items.results.map(ele => (
                                        <CartItemCard product={ele.product} key={ele.id} quantity={ele.quantity}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
        }

    </>
}

export default CartDetails;