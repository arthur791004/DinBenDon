import StorageService from '@/services/Storage';
import { STORAGES } from '@/services/Storage/constants';
import { searchMessages } from '@/services/Slack';
import { LUNCH_INFO } from '@/services/Slack/constants';
import { parseOrder, parseShop } from '@/stores/message/utils';
import { saveData } from './utils';

/**
 * initialize setting
 */
require('dotenv').config();

StorageService.setItem(STORAGES.ACCESS_TOKEN, process.env.ACCESS_TOKEN);

/**
 * main
 */
(async () => {
  const { BOT_NAME, CHANNEL_NAME } = LUNCH_INFO;
  const query = `from:@${BOT_NAME} in:${CHANNEL_NAME}`;
  const count = 100;
  const results = [];

  let totalPage
  let page = 1;

  do {
    const { messages } = await searchMessages(query, { count, page });
    const { matches, paging } = messages;

    const shopList = matches
      .filter(({ text }) => !!text)
      .map(({ text, attachments }) => ({
        ...parseShop(text),
        orders: attachments
          .filter(({ title }) => !!title)
          .map(({ title }) => parseOrder(title))
      }));

    results.push(...shopList);

    totalPage = paging.pages;
    page++;
  } while (page <= totalPage);

  saveData('./data/shopList.json', results);
})();

