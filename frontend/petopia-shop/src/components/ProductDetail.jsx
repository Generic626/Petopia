import React from 'react';

const ProductDetail = (props) => {
  const quantityOptions = Array.from({ length: props.stock }, (_, index) => index + 1);

  return (
    <div className="text-left grid grid-cols-2 gap-2 items-start mx-60 my-20">
      <div className="col-span-2 mb-4">
        <h1 className="text-[36px] font-semibold">{props.productName}</h1>
      </div>
      <div className="col-span-1">
        <img
          src={props.src}
          alt={props.alt}
          className="h-[581px] w-[646px] ring-2 rounded-lg ring-neutral-400 col-span-1"
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '36px', wordWrap: 'break-word' }}>
          {props.description}
        </p>
        <div className="ring-2 ring-neutral-400 rounded-full p-3 bg-white flex justify-center items-center mb-5 mt-10">
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '36px' }}>Quantity: </span>
          <select value={props.quantity} onChange={props.handleQuantityChange} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '36px' }}>
            {quantityOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button onClick={props.handleAddToCart} className="bg-primary rounded-full p-3 text-white" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '36px' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
