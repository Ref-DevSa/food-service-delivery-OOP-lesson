import FoodItem from "./FoodItem.js";

/**
 * Burger - A specific type of food item.
 *
 * INHERITANCE: Extends FoodItem, inheriting name, price, and common methods.
 * POLYMORPHISM: Overrides getType(), calculateDeliveryFee(), and describe()
 *               to provide Burger-specific behaviour.
 * ENCAPSULATION: Uses private field #isCombo to protect burger-specific data.
 */
class Burger extends FoodItem {
  // Private field specific to Burger
  #isCombo;

  /**
   * Creates a new Burger.
   * @param {string} name - The name of the burger (e.g., "Classic Beef").
   * @param {number} price - The price of the burger.
   * @param {boolean} isCombo - Whether this burger is a combo meal (includes fries & drink).
   */
  constructor(name, price, isCombo = false) {
    // Call the parent constructor (Inheritance)
    super(name, price);

    if (typeof isCombo !== "boolean") {
      throw new Error("isCombo must be a boolean value.");
    }
    this.#isCombo = isCombo;
  }

  /**
   * Gets whether this burger is a combo meal.
   * @returns {boolean} True if combo, false otherwise.
   */
  getIsCombo() {
    return this.#isCombo;
  }

  /**
   * Returns the type of this food item.
   * POLYMORPHISM: Overrides FoodItem.getType().
   * @returns {string} "Burger"
   */
  getType() {
    return "Burger";
  }

  /**
   * Calculates the delivery fee based on whether it's a combo.
   * POLYMORPHISM: Overrides FoodItem.calculateDeliveryFee().
   * Combo meals are larger and need more packaging, so they cost more to deliver.
   * @returns {number} The delivery fee (R18 for combo, R12 for single).
   */
  calculateDeliveryFee() {
    return this.#isCombo ? 18.0 : 12.0;
  }

  /**
   * Returns a description of the burger.
   * POLYMORPHISM: Overrides FoodItem.describe().
   * @returns {string} A formatted description including combo status.
   */
  describe() {
    const comboLabel = this.#isCombo ? "Combo" : "Single";
    return `Burger: ${this.getName()} (${comboLabel}) - R${this.getPrice().toFixed(2)}`;
  }
}

export default Burger;
