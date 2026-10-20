import FoodItem from "./FoodItem.js";

/**
 * Drink - A specific type of food item.
 *
 * INHERITANCE: Extends FoodItem, inheriting name, price, and common methods.
 * POLYMORPHISM: Overrides getType(), calculateDeliveryFee(), and describe()
 *               to provide Drink-specific behaviour.
 * ENCAPSULATION: Uses private field #isChilled to protect drink-specific data.
 */
class Drink extends FoodItem {
  // Private field specific to Drink
  #isChilled;

  /**
   * Creates a new Drink.
   * @param {string} name - The name of the drink (e.g., "Coca-Cola").
   * @param {number} price - The price of the drink.
   * @param {boolean} isChilled - Whether the drink is served chilled.
   */
  constructor(name, price, isChilled = true) {
    // Call the parent constructor (Inheritance)
    super(name, price);

    if (typeof isChilled !== "boolean") {
      throw new Error("isChilled must be a boolean value.");
    }
    this.#isChilled = isChilled;
  }

  /**
   * Gets whether this drink is chilled.
   * @returns {boolean} True if chilled, false otherwise.
   */
  getIsChilled() {
    return this.#isChilled;
  }

  /**
   * Returns the type of this food item.
   * POLYMORPHISM: Overrides FoodItem.getType().
   * @returns {string} "Drink"
   */
  getType() {
    return "Drink";
  }

  /**
   * Calculates the delivery fee based on whether the drink is chilled.
   * POLYMORPHISM: Overrides FoodItem.calculateDeliveryFee().
   * Chilled drinks require insulated packaging, so they cost more to deliver.
   * @returns {number} The delivery fee (R10 for chilled, R5 for room temperature).
   */
  calculateDeliveryFee() {
    return this.#isChilled ? 10.0 : 5.0;
  }

  /**
   * Returns a description of the drink.
   * POLYMORPHISM: Overrides FoodItem.describe().
   * @returns {string} A formatted description including chilled status.
   */
  describe() {
    const tempLabel = this.#isChilled ? "Chilled" : "Room Temp";
    return `Drink: ${this.getName()} (${tempLabel}) - R${this.getPrice().toFixed(2)}`;
  }
}

export default Drink;
