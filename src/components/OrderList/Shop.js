import React from 'react';
import styled from 'styled-components';
import { FLOOR } from './messages';

const Td = styled.td`
  width: 55px;
`;

const Shop = ({ name, floor, orders }) => (
  <table className="table table-borderless d-flex flex-column mb-0">
    <thead>
      <tr>
        <td className="d-flex align-items-center">
          <h5 className="mr-2 mb-0 font-weight-bold text-primary d-flex align-items-center">
            {name}
          </h5>
          <span className="badge badge-pill badge-warning text-white d-flex align-items-center">
            {`${floor} ${FLOOR}`}
          </span>
        </td>
      </tr>
    </thead>
    <tbody>
      {orders.map(({ id, count, name, price }) => (
        <tr key={id} className="d-flex">
          <td className="flex-grow-1">{name}</td>
          <Td className="pl-0 text-right">{`x ${count}`}</Td>
          <Td className="pl-0 text-right">{`$${price}`}</Td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Shop;
