import FoodItem from "./FoodItem.js";

/**
 * Dessert - An additional food type added to the system.
 *
 * INHERITANCE: Extends FoodItem, inheriting name, price, and common methods.
 * POLYMORPHISM: Overrides getType(), calculateDeliveryFee(), and describe()
 *               to provide Dessert-specific behaviour.
 * ENCAPSULATION: Uses private field #isRefrigerated to protect dessert-specific data.
 *
 * This class demonstrates that the system is extensible — new food types can be
 * added without modifying the Order class or any existing food type classes.
 */
class Dessert extends FoodItem {
  // Private field specific to Dessert
  #isRefrigerated;

  /**
   * Creates a new Dessert.
   * @param {string} name - The name of the dessert (e.g., "Chocolate Cake").
   * @param {number} price - The price of the dessert.
   * @param {boolean} isRefrigerated - Whether the dessert requires refrigeration.
   */
  constructor(name, price, isRefrigerated = false) {
    // Call the parent constructor (Inheritance)
    super(name, price);

    if (typeof isRefrigerated !== "boolean") {
      throw new Error("isRefrigerated must be a boolean value.");
    }
    this.#isRefrigerated = isRefrigerated;
  }

  /**
   * Gets whether this dessert requires refrigeration.
   * @returns {boolean} True if refrigerated, false otherwise.
   */
  getIsRefrigerated() {
    return this.#isRefrigerated;
  }

  /**
   * Returns the type of this food item.
   * POLYMORPHISM: Overrides FoodItem.getType().
   * @returns {string} "Dessert"
   */
  getType() {
    return "Dessert";
  }

  /**
   * Calculates the delivery fee based on whether refrigeration is needed.
   * POLYMORPHISM: Overrides FoodItem.calculateDeliveryFee().
   * Refrigerated desserts need cold storage during delivery, increasing the cost.
   * @returns {number} The delivery fee (R22 for refrigerated, R8 for non-refrigerated).
   */
  calculateDeliveryFee() {
    return this.#isRefrigerated ? 22.0 : 8.0;
  }

  /**
   * Returns a description of the dessert.
   * POLYMORPHISM: Overrides FoodItem.describe().
   * @returns {string} A formatted description including refrigeration status.
   */
  describe() {
    const storageLabel = this.#isRefrigerated ? "Refrigerated" : "Room Temp";
    return `Dessert: ${this.getName()} (${storageLabel}) - R${this.getPrice().toFixed(2)}`;
  }
}

export default Dessert;
