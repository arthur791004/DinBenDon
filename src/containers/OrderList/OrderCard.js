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

const Wrapper = styled.div`
  .card-body,
  .card-footer {
    padding-left: 2.2rem;
  }
`;

const OrderCard = ({ date, shops }) => {
  const totalOrders = flatten(shops.map(shop => shop.orders));
  const totalPrice = totalOrders.reduce((acc, { price, count }) => acc + parseInt(price) * parseInt(count), 0);

  return (
    <Wrapper className="card mb-3">
      <Date date={date} />
      <div className="card-body py-2">
        {shops.length > 0 ? shops.map(({ name, floor, orders }) => (
          <Shop key={name} name={name} floor={floor} orders={orders} />
        )) : <EmptyOrder />}
      </div>
      <div className="card-footer">
        <Budget totalPrice={totalPrice} />
      </div>
    </Wrapper>
  );
};

export default OrderCard;