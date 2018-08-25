import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStoresConsumer } from '@/components/StoresContext';

@observer
class OrderList extends Component {
  componentDidMount() {
    const { userID, messageStore } = this.props;

    messageStore.getOrderInfo(userID);
  }

  render() {
    const { orderList } = this.props.messageStore;

    return (
      <div>
        <h1>OrderList</h1>
        {orderList && orderList.map(({ text, orders }, index) => (
          <div key={index}>
            <h3>{text}</h3>
            <ul>
              {orders.map(order => (
                <li key={order.id}>{order.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default withStoresConsumer(OrderList, [
  'messageStore',
]);