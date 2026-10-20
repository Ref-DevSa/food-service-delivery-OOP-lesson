import FoodItem from "./src/FoodItem.js";
import Pizza from "./src/Pizza.js";
import Burger from "./src/Burger.js";
import Drink from "./src/Drink.js";
import Dessert from "./src/Dessert.js";
import Order from "./src/Order.js";

// Encapsulation
console.log("=== DEMONSTRATING ENCAPSULATION ===\n");

const pizza = new Pizza("Margherita", 89.99, "Large");

// Accessing data through controlled getter methods (encapsulation)
console.log(`Pizza name (via getName()):  ${pizza.getName()}`);
console.log(`Pizza price (via getPrice()): R${pizza.getPrice().toFixed(2)}`);
console.log(`Pizza size (via getSize()):   ${pizza.getSize()}`);

// Attempting to access private fields directly would cause an error:
console.log("\n> Private fields (#name, #price, #size) cannot be accessed directly.");
console.log("> They are only accessible through getter/setter methods.\n");

// Modifying price through a controlled setter with validation
pizza.setPrice(99.99);
console.log(`Updated price (via setPrice()): R${pizza.getPrice().toFixed(2)}`);

// Demonstrating that invalid prices are rejected
try {
  pizza.setPrice(-50);
} catch (error) {
  console.log(`Rejected invalid price: ${error.message}`);
}

try {
  pizza.setPrice("free");
} catch (error) {
  console.log(`Rejected non-numeric price: ${error.message}`);
}

// Inheritance
console.log("\n=== DEMONSTRATING INHERITANCE ===\n");

const burger = new Burger("Classic Beef", 79.99, true);
const drink = new Drink("Coca-Cola", 24.99, true);
const dessert = new Dessert("Chocolate Cake", 59.99, true);

// All food types inherit common methods from FoodItem
console.log("All food types inherit getName() and getPrice() from FoodItem:");
console.log(`  Pizza:   ${pizza.getName()} - R${pizza.getPrice().toFixed(2)}`);
console.log(`  Burger:  ${burger.getName()} - R${burger.getPrice().toFixed(2)}`);
console.log(`  Drink:   ${drink.getName()} - R${drink.getPrice().toFixed(2)}`);
console.log(`  Dessert: ${dessert.getName()} - R${dessert.getPrice().toFixed(2)}`);

// Verifying inheritance with instanceof
console.log("\nAll food types are instances of FoodItem (instanceof check):");
console.log(`  Pizza instanceof FoodItem:   ${pizza instanceof FoodItem}`);
console.log(`  Burger instanceof FoodItem:  ${burger instanceof FoodItem}`);
console.log(`  Drink instanceof FoodItem:   ${drink instanceof FoodItem}`);
console.log(`  Dessert instanceof FoodItem: ${dessert instanceof FoodItem}`);

//Polymorphism
console.log("\n=== DEMONSTRATING POLYMORPHISM ===\n");

// The SAME method call produces DIFFERENT results based on the object's type
const items = [pizza, burger, drink, dessert];

console.log("Calling describe() on each item (same method, different output):");
for (const item of items) {
  console.log(`  ${item.describe()}`);
}

console.log("\nCalling calculateDeliveryFee() on each item (same method, different fee):");
for (const item of items) {
  console.log(
    `  ${item.getType().padEnd(10)} -> R${item.calculateDeliveryFee().toFixed(2)}`
  );
}

console.log("\nCalling getType() on each item (same method, different type):");
for (const item of items) {
  console.log(`  ${item.getName().padEnd(18)} -> ${item.getType()}`);
}

// Abstraction
console.log("\n=== DEMONSTRATING ABSTRACTION ===\n");

// getItemSummary() hides internal complexity — returns a clean object
console.log("getItemSummary() provides a simple interface without exposing internals:");
for (const item of items) {
  const summary = item.getItemSummary();
  console.log(`  ${JSON.stringify(summary)}`);
}

// Order Management
console.log("\n=== ORDER MANAGEMENT ===\n");

// Create a new order
const order = new Order("Thabo Mokoena");

// Create food items
const pizzaOrder = new Pizza("Pepperoni", 109.99, "Large");
const burgerOrder = new Burger("BBQ Bacon", 89.99, true);
const drinkOrder = new Drink("Sprite", 19.99, true);
const dessertOrder = new Dessert("Cheesecake", 64.99, true);
const drinkOrder2 = new Drink("Still Water", 14.99, false);

// Add items to the order
order.addItem(pizzaOrder);
order.addItem(burgerOrder);
order.addItem(drinkOrder);
order.addItem(dessertOrder);
order.addItem(drinkOrder2);

console.log(`Order created for: ${order.getCustomerName()}`);
console.log(`Items in order: ${order.getItemCount()}`);

// Display the full order summary
// This uses ABSTRACTION (calculateTotal hides complexity)
// and POLYMORPHISM (each item's delivery fee is calculated by its own class)
order.displayOrderSummary();

//Item Removal
console.log("=== DEMONSTRATING ITEM REMOVAL ===\n");

console.log(`Items before removal: ${order.getItemCount()}`);
const removedItem = order.removeItem(4); // Remove the Still Water
console.log(`Removed: ${removedItem.describe()}`);
console.log(`Items after removal: ${order.getItemCount()}`);

// Try to remove an invalid index
const invalidRemoval = order.removeItem(99);
console.log(`Removing invalid index returns: ${invalidRemoval}`);

// Display updated order
order.displayOrderSummary();

// ADDITIONAL FOOD TYPE — Dessert works seamlessly
console.log("=== ADDITIONAL FOOD TYPE (DESSERT) ===\n");

const dessert1 = new Dessert("Tiramisu", 74.99, true);
const dessert2 = new Dessert("Cookies", 34.99, false);

console.log("Desserts work with all inherited and overridden methods:");
console.log(`  ${dessert1.describe()}`);
console.log(`  Delivery fee: R${dessert1.calculateDeliveryFee().toFixed(2)}`);
console.log(`  ${dessert2.describe()}`);
console.log(`  Delivery fee: R${dessert2.calculateDeliveryFee().toFixed(2)}`);

// Add desserts to a new order — no changes needed to Order class
const dessertOnlyOrder = new Order("Naledi Khumalo");
dessertOnlyOrder.addItem(dessert1);
dessertOnlyOrder.addItem(dessert2);
dessertOnlyOrder.displayOrderSummary();

console.log("=== APPLICATION COMPLETE ===");
