// Cart.js
import React, { useContext } from 'react';

const Cart = ({book}) => {

    return (
        <div>
            <h1>Корзина</h1>
            <h1>{book}</h1>
        </div>
    );
};

export default Cart;
