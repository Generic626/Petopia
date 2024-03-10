import React, { useState } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import OrderTable from "../components/OrderTable";

const OrderPage = () => {
    return (
      <NavbarLayout>
        <div className="h-screen p-5 justify-left flex flex-col mx-24 my-20">
          <div className="text-left">
            <h1 className="text-[30px] font-semibold mb-4">Your Order</h1>
            <div className="w-full">
                <table className="w-full">
                    <thead>
                    {/* The table heading */}
                    <tr>
                        <th className="p-4 bg-primary text-white">Order ID</th>
                        <th className="p-4 bg-primary text-white">Order Total</th>
                        <th className="p-4 bg-primary text-white">Order Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* The data for the table */}
                    <OrderTable orderId="asfasfasf" orderTotal="369" orderStatus={1} />
                    <OrderTable orderId="ergerger" orderTotal="12412450" orderStatus={0} />
                    <OrderTable orderId="ergerger" orderTotal="12412450" orderStatus={2} />
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </NavbarLayout>
    );
  };
  
  
  export default OrderPage;