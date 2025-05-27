export const calculateDiscount = (quantity : number , totalAmount : number) => {
  /**
   * Рассчитывает скидку на основе количества товаров и суммы заказа.
   *
   * @param {number} quantity Количество товаров в заказе (целое число).
   * @param {number} totalAmount Общая сумма заказа (число).
   * @returns {number} Скидка в процентах (число).
   */

  let baseDiscount = 0;

  if (quantity === 2) {
    baseDiscount = 3;
  } else if (quantity >= 3 && quantity <= 5) {
    baseDiscount = 5;
  } else if (quantity >= 6 && quantity <= 10) {
    baseDiscount = 10;
  } else if (quantity > 10) {
    baseDiscount = 15;
  }

  let discountAdjustment = 0;
  if (totalAmount >= 10000 && totalAmount <= 20000) {
    discountAdjustment = -1;
  } else if (totalAmount > 20000 && totalAmount <= 30000) {
    discountAdjustment = -2;
  } else if (totalAmount > 30000) {
    discountAdjustment = -3;
  }

  let finalDiscount = baseDiscount + discountAdjustment;

  finalDiscount = Math.max(0, finalDiscount);

  return finalDiscount;
};
