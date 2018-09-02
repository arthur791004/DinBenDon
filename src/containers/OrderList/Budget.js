import React from 'react';
import styled from 'styled-components';
import { BUDGETS } from './constants';
import { BUDGET_LEFT } from './messages';

const Wrapper = styled.div.attrs({
  className: 'text-danger font-weight-bold',
})`
  padding: 0 0.75rem;
`

const Budget = ({ totalPrice }) => (
  <Wrapper>{`${BUDGET_LEFT}: $${BUDGETS - totalPrice}`}</Wrapper>
);

export default Budget;