export const calculateFinalPrice = (totalAmount:number, discount:number) => {
  /**
   * Рассчитывает итоговую цену с учетом скидки.
   *
   * @param {number} totalAmount Общая сумма заказа.
   * @returns {number} Итоговая цена со скидкой.
   */
  const discountAmount = totalAmount * (discount / 100);
  const finalPrice = totalAmount - discountAmount;
  return finalPrice;
};
