import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import groupBy from 'lodash/groupBy';
import messageStore from '@/stores/message';
import withStores from '@/components/withStores';
import Loading from '@/components/Loading';
import { DIN_BEN_DON_HISTORY } from './messages';
import OrderCard from './OrderCard';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0 15px;
`;

@observer
class OrderList extends Component {
  componentDidMount() {
    const { userID, messageStore } = this.props;

    messageStore.getOrderInfo(userID);
  }

  render() {
    const { orderList, isLoading } = this.props.messageStore;
    const orderListByDate = groupBy(orderList || [], 'date');

    return (
      <Wrapper>
        <h3 className="mb-3">{DIN_BEN_DON_HISTORY}</h3>
        {isLoading ? (
          <Loading className="mx-auto mt-4" size={40} />
        ) : (
          Object.keys(orderListByDate).map((date, index, array) => {
            /* filter out last day because its messages may not be enough */
            if (index === array.length - 1) {
              return null;
            }

            return (
              <OrderCard
                key={date}
                date={date}
                shops={orderListByDate[date].filter(({ orders}) => orders.length)}
              />
            );
          })
        )}
      </Wrapper>
    );
  }
}

export default withStores(OrderList, { messageStore });