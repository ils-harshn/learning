import { useEffect, useState } from "react";
import { getOrders, get_token } from "../../api";
import MainLoader from "../../Components/MainLoader";

const OrderItem = ({ order }) => {
    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center">
                    <div className="flex-column ms-4">
                        <p className="mb-2">{order.id}</p>
                    </div>
                </div>
            </th>
            <td className="align-middle">
                <p className="mb-0" style={{ fontWeight: 500 }}>
                    {order.address}
                </p>
            </td>
            <td className="align-middle">
                <div className="d-flex flex-row">
                    <p className="mb-0" style={{ fontWeight: 500 }}>
                        {order.pin_code}
                    </p>
                </div>
            </td>
            <td className="align-middle">
                <p className="mb-0" style={{ fontWeight: 500 }}>
                    { order.phone }
                </p>
            </td>
            <td className="align-middle">
                <p className="mb-0" style={{ fontWeight: 500 }}>
                    { order.ordered_date }
                </p>
            </td>
        </tr>
    )
}

const Orders = () => {
    const token = get_token();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchData = async () => {
        setLoading(true);
        let data = await getOrders(token);
        if (data) {
            setData(data);
            setLoading(false)
        }
        else alert("Something went wrong");
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <>
        {loading ? <MainLoader /> : <>
            <section className="h-custom">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="h5">
                                                Order ID
                                            </th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Pin Code</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Date Ordered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.results.map((order) => (
                                            <OrderItem order={order} key={order.id}/>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>}
    </>
}

export default Orders;