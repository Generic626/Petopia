import React from "react";

const CheckoutProduct = (props) => {
    return (
        <div className="flex flex-row m-auto p-5 place-content-evenly items-center ">
            <img 
                src={props.src}
                alt={props.alt}
                className="h-[60px] w-[60px] ring-2 rounded-lg ring-neutral-400"
            />
            <p>{props.name}</p>
            <p>Quantity: {props.qty}</p>
            <p>HK${props.price}</p>
        </div>
    );
};

export default CheckoutProduct;