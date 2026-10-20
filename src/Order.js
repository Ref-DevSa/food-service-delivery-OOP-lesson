import FoodItem from "./FoodItem.js";

/**
 * Order - Manages a collection of food items for a customer.
 *
 * ENCAPSULATION: Uses private fields (#items, #customerName) to protect order data.
 * ABSTRACTION: Methods like calculateTotal() hide the complexity of computing
 *              subtotals and delivery fees — users simply call one method.
 * POLYMORPHISM: When iterating over items to calculate delivery fees, the same
 *               calculateDeliveryFee() call produces different results depending
 *               on the actual food type (Pizza, Burger, Drink, Dessert).
 */
class Order {
  // Private fields - order data is protected from direct external access
  #items;
  #customerName;

  /**
   * Creates a new empty Order.
   * @param {string} customerName - The name of the customer placing the order.
   * @throws {Error} If customerName is not a valid non-empty string.
   */
  constructor(customerName) {
    if (
      !customerName ||
      typeof customerName !== "string" ||
      customerName.trim() === ""
    ) {
      throw new Error("Customer name must be a non-empty string.");
    }

    this.#customerName = customerName.trim();
    this.#items = [];
  }

  /**
   * Gets the customer name.
   * @returns {string} The customer's name.
   */
  getCustomerName() {
    return this.#customerName;
  }

  /**
   * Adds a food item to the order.
   * Validates that the item is a FoodItem instance before adding.
   * @param {FoodItem} foodItem - The food item to add.
   * @throws {Error} If the item is not a valid FoodItem instance.
   */
  addItem(foodItem) {
    if (!(foodItem instanceof FoodItem)) {
      throw new Error("Only FoodItem instances can be added to an order.");
    }
    this.#items.push(foodItem);
  }

  /**
   * Removes a food item from the order by index.
   * @param {number} index - The index of the item to remove.
   * @returns {FoodItem|null} The removed item, or null if the index is invalid.
   */
  removeItem(index) {
    if (index < 0 || index >= this.#items.length || !Number.isInteger(index)) {
      return null;
    }
    const removed = this.#items.splice(index, 1);
    return removed[0];
  }

  /**
   * Returns a copy of all items in the order.
   * Returns a copy (not a reference) to protect the internal array.
   * @returns {FoodItem[]} A copy of the items array.
   */
  getItems() {
    return [...this.#items];
  }

  /**
   * Returns the number of items in the order.
   * @returns {number} The item count.
   */
  getItemCount() {
    return this.#items.length;
  }

  /**
   * Calculates the subtotal (sum of all item prices).
   * ABSTRACTION: Hides the iteration and summing logic.
   * @returns {number} The subtotal price.
   */
  calculateSubtotal() {
    let subtotal = 0;
    for (const item of this.#items) {
      subtotal += item.getPrice();
    }
    return subtotal;
  }

  /**
   * Calculates the total delivery fees for all items.
   * POLYMORPHISM IN ACTION: Each item's calculateDeliveryFee() is called,
   * but the result depends on the actual type of food item (Pizza, Burger, etc.).
   * @returns {number} The total delivery fees.
   */
  calculateTotalDeliveryFees() {
    let totalFees = 0;
    for (const item of this.#items) {
      totalFees += item.calculateDeliveryFee();
    }
    return totalFees;
  }

  /**
   * Calculates the final order total (subtotal + delivery fees).
   * ABSTRACTION: Users call one simple method instead of manually
   * calculating subtotals and delivery fees separately.
   * @returns {number} The final order total.
   */
  calculateTotal() {
    return this.calculateSubtotal() + this.calculateTotalDeliveryFees();
  }

  /**
   * Displays a formatted order summary to the console.
   * Uses getItemSummary() on each item (Abstraction) — the Order doesn't
   * need to know the internal details of each food type.
   */
  displayOrderSummary() {
    const divider = "=".repeat(65);
    const line = "-".repeat(65);

    console.log("\n" + divider);
    console.log("  FOOD DELIVERY ORDER SUMMARY");
    console.log(`  Customer: ${this.#customerName}`);
    console.log(divider);

    // Table header
    console.log(
      "  " +
        "Item".padEnd(20) +
        "Type".padEnd(12) +
        "Price".padEnd(15) +
        "Delivery Fee"
    );
    console.log("  " + line.slice(2));

    // Table rows — using getItemSummary() (Abstraction + Polymorphism)
    for (const item of this.#items) {
      const summary = item.getItemSummary();
      console.log(
        "  " +
          summary.name.padEnd(20) +
          summary.type.padEnd(12) +
          `R${summary.price.toFixed(2)}`.padEnd(15) +
          `R${summary.deliveryFee.toFixed(2)}`
      );
    }

    console.log("  " + line.slice(2));

    // Totals
    const subtotal = this.calculateSubtotal();
    const deliveryFees = this.calculateTotalDeliveryFees();
    const total = this.calculateTotal();

    console.log("  " + "Subtotal:".padEnd(32) + `R${subtotal.toFixed(2)}`);
    console.log(
      "  " + "Total Delivery Fees:".padEnd(32) + `R${deliveryFees.toFixed(2)}`
    );
    console.log("  " + line.slice(2));
    console.log("  " + "TOTAL:".padEnd(32) + `R${total.toFixed(2)}`);
    console.log(divider + "\n");
  }
}

export default Order;
