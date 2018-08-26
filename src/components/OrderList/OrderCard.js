import React from 'react';
import styled from 'styled-components';
import flatten from 'lodash/flatten';
import { BUDGETS } from './constants';
import {
  SHOP_NAME,
  ORDER_NAME,
  ORDER_COUNT,
  ORDER_PRICE,
} from './messages';
import Budget from './Budget';
import Date from './Date';
import Shop from './Shop';
import EmptyOrder from './EmptyOrder';

const OrderCard = ({ date, shops }) => {
  const totalOrders = flatten(shops.map(shop => shop.orders));
  const totalPrice = totalOrders.reduce((acc, { price, count }) => acc + parseInt(price) * parseInt(count), 0);

  return (
    <div className="card mb-3">
      <Date date={date} />
      <div className="card-body pl-4 py-2">
        {shops.length > 0 ? shops.map(({ name, floor, orders }) => (
          <Shop key={name} name={name} floor={floor} orders={orders} />
        )) : <EmptyOrder />}
      </div>
      <div className="card-footer pl-4">
        <Budget totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default OrderCard;