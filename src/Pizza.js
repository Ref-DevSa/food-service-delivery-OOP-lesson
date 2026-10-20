import FoodItem from "./FoodItem.js";

/**
 * Pizza - A specific type of food item.
 *
 * INHERITANCE: Extends FoodItem, inheriting name, price, and common methods.
 * POLYMORPHISM: Overrides getType(), calculateDeliveryFee(), and describe()
 *               to provide Pizza-specific behaviour.
 * ENCAPSULATION: Uses private field #size to protect pizza-specific data.
 */
class Pizza extends FoodItem {
  // Private field specific to Pizza
  #size;

  /**
   * Creates a new Pizza.
   * @param {string} name - The name of the pizza (e.g., "Margherita").
   * @param {number} price - The price of the pizza.
   * @param {string} size - The size of the pizza ("Small", "Medium", or "Large").
   * @throws {Error} If size is not a valid pizza size.
   */
  constructor(name, price, size) {
    // Call the parent constructor (Inheritance)
    super(name, price);

    const validSizes = ["Small", "Medium", "Large"];
    if (!validSizes.includes(size)) {
      throw new Error(`Pizza size must be one of: ${validSizes.join(", ")}.`);
    }
    this.#size = size;
  }

  /**
   * Gets the size of the pizza.
   * @returns {string} The pizza size.
   */
  getSize() {
    return this.#size;
  }

  /**
   * Returns the type of this food item.
   * POLYMORPHISM: Overrides FoodItem.getType().
   * @returns {string} "Pizza"
   */
  getType() {
    return "Pizza";
  }

  /**
   * Calculates the delivery fee based on pizza size.
   * POLYMORPHISM: Overrides FoodItem.calculateDeliveryFee().
   * Larger pizzas require more careful handling, so they cost more to deliver.
   * @returns {number} The delivery fee (R15 for Small, R20 for Medium, R25 for Large).
   */
  calculateDeliveryFee() {
    switch (this.#size) {
      case "Small":
        return 15.0;
      case "Medium":
        return 20.0;
      case "Large":
        return 25.0;
      default:
        return 20.0;
    }
  }

  /**
   * Returns a description of the pizza.
   * POLYMORPHISM: Overrides FoodItem.describe().
   * @returns {string} A formatted description including size.
   */
  describe() {
    return `Pizza: ${this.getName()} (${this.#size}) - R${this.getPrice().toFixed(2)}`;
  }
}

export default Pizza;
