import React from 'react';
import styled from 'styled-components';
import { TRIANGLE_SIZE } from './constants';

const Month = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: #007bff;

  &:after {
    content: '月';
  }
`;

const Day = styled.span`
  display: flex;
  align-items: center;
  margin-left: 4px;
  font-size: 20px;
  font-weight: 600;
  color: #007bff;
`

const Wrapper = styled.div.attrs({
  className: 'p-1',
})`
  display: flex;
  position: absolute;
  left: -${TRIANGLE_SIZE}px;
  top: ${TRIANGLE_SIZE}px;
  background-color: #fefefe;
  border: solid 1px #007bff;

  &:before {
    content: '';
    position: absolute;
    left: -1px;
    top: -${TRIANGLE_SIZE + 1}px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 ${TRIANGLE_SIZE}px ${TRIANGLE_SIZE}px;
    border-color: transparent transparent #007bff transparent;
  }
`;

const padNumber = number => `0${number}`.slice(-2);

const Date = ({ date }) => {
  const [month, day] = date.split('/');

  return (
    <Wrapper>
      <Month>{padNumber(month)}</Month>
      <Day>{padNumber(day)}</Day>
    </Wrapper>
  );
};

export default Date;