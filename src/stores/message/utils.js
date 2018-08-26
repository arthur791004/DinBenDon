export const parseShop = (text) => {
  const [_, date, name, floor] = /(\d+\/\d+).*?『(.*)』.*?(\d+)樓/.exec(text);

  return {
    date,
    name,
    floor,
  };
};

export const parseOrder = (text) => {
  const [_, name, price] = /\(\d+\)(.*?)[＄|$](\d+)/.exec(text);

  return {
    name,
    price,
  };
};

export const parseCount = (text, userID) => {
  const regex = new RegExp(`<@${userID}>(?:\\((\\d+)\\))?`);
  const [_, count] = regex.exec(text);

  return count || 1;
};