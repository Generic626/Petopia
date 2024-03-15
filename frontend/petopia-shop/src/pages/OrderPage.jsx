import React, { useState, useEffect } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import OrderTable from "../components/OrderTable";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import useSnackbar from "../hook/useSnackbar";
import EmptyData from "../components/EmptyData";

const OrderPage = () => {
  const { id } = useParams();
  const [orderList, setOrderList] = useState([]);
  const { setError } = useSnackbar();
  const navigate = useNavigate();

  // fetch all orders of the customer
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5290/api/customerorders/customer/${id}`
        );

        console.log(response.data);
        setOrderList(response.data);
      } catch (error) {
        setError((prev) => [...prev, "Cannot access orders at this time"]);
        navigate("/");
      }
    };
    fetchData();
  }, []);
  return (
    <NavbarLayout>
      <div className="h-screen p-5 justify-left flex flex-col mx-24 my-20">
        <div className="text-left">
          <h1 className="text-[30px] font-semibold mb-4">Your Order</h1>
          {/* Table */}
          {orderList.map((order, index) => (
            <OrderTable order={order} key={index} />
          ))}
          {orderList.length == 0 && (
            <EmptyData message={"Nothing to see here"} />
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default OrderPage;
