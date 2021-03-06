import { observable, action } from 'mobx';
import * as SlackService from '@/services/Slack';
import { LUNCH_INFO } from '@/services/Slack/constants';
import { parseShop, parseOrder, parseCount } from './utils';

class MessageStore {
  @observable isLoading = false;
  @observable orderList = null;

  @action.bound
  getOrderInfo(userID) {
    const { CHANNEL_NAME, BOT_NAME } = LUNCH_INFO;
    const query = `from:@${BOT_NAME} in:${CHANNEL_NAME}`;

    this.setIsLoading(true);

    SlackService.searchMessages(query)
      .then(({ messages }) => this.setOrderList(messages, { userID }))
      .catch(error => this.setError(error))
      .then(() => this.setIsLoading(false));
  }

  @action.bound
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  @action.bound
  setOrderList(messages, options) {
    const { userID } = options;

    this.orderList = messages.matches
      .map(({ text, attachments }) => ({
        ...parseShop(text),
        orders: attachments
          .filter(({ text }) => text && text.includes(userID))
          .map(({ id, title, text }) => ({
            ...parseOrder(title),
            count: parseCount(text, userID),
            id,
          })),
      }));
  }

  @action.bound
  setError(error) {
    this.error = error.message;
  }
}

export default new MessageStore();