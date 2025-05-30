import { calculateDiscount } from './calculate-discount';

export const calculateBaseDiscountPrice = (quantity:number, totalAmount:number) => {
  /**
   * Рассчитываем итоговую  скидку.
   *
   * @param {number} quantity Количество товаров в заказе.
   * @param {number} totalAmount Общая сумма заказа.
   * @returns {number} Итоговая цена со скидкой.
   */
  const discount = calculateDiscount(quantity, totalAmount);
  const discountAmount = totalAmount * (discount / 100);
  const finalPrice = totalAmount - discountAmount;
  return finalPrice;
};
