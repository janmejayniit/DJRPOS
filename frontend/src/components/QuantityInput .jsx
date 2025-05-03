import React, { useState } from 'react';

const QuantityInput = ({ item, onChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrease = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  return (
    <div className="input-group">
      <button className="btn btn-dark" type="button" style={{ borderRadius: '0px' }} onClick={decrease}>
        <i className="bi bi-dash"></i>
      </button>

      <input
        type="text"
        id="quantity"
        className="form-control text-center"
        value={quantity}
        readOnly
      />

      <button className="btn btn-dark" type="button" style={{ borderRadius: '0px' }} onClick={increase}>
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};
export default QuantityInput;