import { DEFAULT_PRICE } from './constants';

export const parseShop = (text) => {
  const [_, date, name, floor] = /(\d+\/\d+).*?『(.*)』.*?(\d+)樓/.exec(text);

  return {
    name: name.trim(),
    date,
    floor,
  };
};

export const parseOrder = (text) => {
  const [_, name, price = DEFAULT_PRICE, limit] = /(?:\(\d+\))?(.*?)(?:[＄|$]\s*(\d+)\s*)?(?:\(?\s*限量\s*(\d+)\s*\)?\s*)?$/.exec(text);

  return {
    name: name.trim(),
    price,
    limit,
  };
};

export const parseCount = (text, userID) => {
  const regex = new RegExp(`<@${userID}>(?:\\((\\d+)\\))?`);
  const [_, count] = regex.exec(text);

  return count || 1;
};