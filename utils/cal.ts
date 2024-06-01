type SubTotal = {
  subTotal: number;
};

export const subTotalCal = (arr: SubTotal[]): number => {
  return arr.reduce((acc, curr) => {
    return acc + curr.subTotal;
  }, 0);
};

export const shippingChargeCal = (price: number): number => {
  if (price < 100) {
    return 0;
  }

  return price * 0.05;
};

export const totalPriceCal = (...args: number[]): number => {
  return args.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};
