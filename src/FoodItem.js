/**
 * FoodItem - Base class for all food items in the delivery system.
 *
 * ENCAPSULATION: Uses private fields (#name, #price) to protect sensitive data.
 * Data can only be accessed/modified through controlled getter and setter methods.
 *
 * ABSTRACTION: The getItemSummary() method hides internal implementation details,
 * providing a simple interface for retrieving item information.
 */
class FoodItem {
  // Private fields - cannot be accessed directly from outside the class
  #name;
  #price;

  /**
   * Creates a new FoodItem.
   * @param {string} name - The name of the food item.
   * @param {number} price - The price of the food item (must be a positive number).
   * @throws {Error} If name is empty or price is not a positive number.
   */
  constructor(name, price) {
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Food item name must be a non-empty string.");
    }
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      throw new Error("Price must be a positive number.");
    }

    this.#name = name.trim();
    this.#price = price;
  }

  // ─── Controlled Accessors (Encapsulation) ───

  /**
   * Gets the name of the food item.
   * @returns {string} The food item name.
   */
  getName() {
    return this.#name;
  }

  /**
   * Gets the price of the food item.
   * @returns {number} The food item price.
   */
  getPrice() {
    return this.#price;
  }

  /**
   * Sets a new price for the food item with validation.
   * @param {number} newPrice - The new price (must be a positive number).
   * @throws {Error} If newPrice is not a positive number.
   */
  setPrice(newPrice) {
    if (typeof newPrice !== "number" || isNaN(newPrice) || newPrice <= 0) {
      throw new Error("Price must be a positive number.");
    }
    this.#price = newPrice;
  }

  // ─── Methods to be Overridden (Polymorphism base) ───

  /**
   * Returns the type of the food item.
   * Subclasses override this to return their specific type.
   * @returns {string} The food item type.
   */
  getType() {
    return "Food Item";
  }

  /**
   * Calculates the delivery fee for this food item.
   * Subclasses override this to provide type-specific delivery fees.
   * POLYMORPHISM: Same method name, different behaviour per subclass.
   * @returns {number} The delivery fee.
   */
  calculateDeliveryFee() {
    return 0;
  }

  /**
   * Returns a human-readable description of the food item.
   * Subclasses override this to include type-specific details.
   * @returns {string} A description of the food item.
   */
  describe() {
    return `${this.getType()}: ${this.#name} - R${this.#price.toFixed(2)}`;
  }

  // ─── Abstraction ───

  /**
   * Returns a summary object with all relevant item information.
   * ABSTRACTION: Hides internal calculations and provides a simple interface.
   * Users of this method don't need to know how prices or fees are calculated.
   * @returns {Object} An object containing name, type, price, and deliveryFee.
   */
  getItemSummary() {
    return {
      name: this.#name,
      type: this.getType(),
      price: this.#price,
      deliveryFee: this.calculateDeliveryFee(),
    };
  }
}

export default FoodItem;
