type Item = { last_updated: string };

export const sortByRecent = (itemOne: Item, itemTwo: Item) => {
  const parsedDateOne = new Date(itemOne.last_updated);
  const parsedDateTwo = new Date(itemTwo.last_updated);
  return parsedDateTwo.getTime() - parsedDateOne.getTime();
};
