/**
 * ============================================================
 *  FOOD DELIVERY SYSTEM — Test Suite
 *  JavaScript Essentials 2 — OOP Practical
 * ============================================================
 *
 *  Comprehensive tests covering all functional and OOP requirements.
 *  Uses a simple built-in test framework (no external dependencies).
 * ============================================================
 */

import FoodItem from "./src/FoodItem.js";
import Pizza from "./src/Pizza.js";
import Burger from "./src/Burger.js";
import Drink from "./src/Drink.js";
import Dessert from "./src/Dessert.js";
import Order from "./src/Order.js";

// ─── Simple Test Framework ───

let passed = 0;
let failed = 0;

/**
 * Runs a single test case.
 * @param {string} description - What the test verifies.
 * @param {Function} fn - The test function (should throw on failure).
 */
function test(description, fn) {
  try {
    fn();
    passed++;
    console.log(`  \u2713 ${description}`);
  } catch (error) {
    failed++;
    console.log(`  \u2717 ${description}`);
    console.log(`    Error: ${error.message}`);
  }
}

/**
 * Asserts that a condition is true.
 * @param {boolean} condition - The condition to check.
 * @param {string} message - Error message if assertion fails.
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

/**
 * Asserts that a value is approximately equal to an expected value.
 * Handles floating-point precision issues.
 */
function assertApprox(actual, expected, message) {
  if (Math.abs(actual - expected) > 0.01) {
    throw new Error(
      message || `Expected approximately ${expected}, got ${actual}`
    );
  }
}

// ════════════════════════════════════════════════════════════
//  TEST 1: FoodItem Creation
// ════════════════════════════════════════════════════════════
console.log("\n--- 1. FoodItem Creation Tests ---");

test("Can create a FoodItem with valid name and price", () => {
  const item = new FoodItem("Test Item", 25.99);
  assert(item !== null, "Item should not be null");
});

test("getName() returns the correct name", () => {
  const item = new FoodItem("Salad", 45.0);
  assert(item.getName() === "Salad", `Expected 'Salad', got '${item.getName()}'`);
});

test("getPrice() returns the correct price", () => {
  const item = new FoodItem("Salad", 45.0);
  assert(item.getPrice() === 45.0, `Expected 45.0, got ${item.getPrice()}`);
});

test("getType() returns 'Food Item' for base class", () => {
  const item = new FoodItem("Salad", 45.0);
  assert(
    item.getType() === "Food Item",
    `Expected 'Food Item', got '${item.getType()}'`
  );
});

test("Creating FoodItem with negative price throws an error", () => {
  let threw = false;
  try {
    new FoodItem("Bad Item", -10);
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error for negative price");
});

test("Creating FoodItem with zero price throws an error", () => {
  let threw = false;
  try {
    new FoodItem("Free Item", 0);
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error for zero price");
});

test("Creating FoodItem with string price throws an error", () => {
  let threw = false;
  try {
    new FoodItem("Bad Item", "ten");
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error for string price");
});

test("Creating FoodItem with empty name throws an error", () => {
  let threw = false;
  try {
    new FoodItem("", 25.0);
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error for empty name");
});

// ════════════════════════════════════════════════════════════
//  TEST 2: Encapsulation
// ════════════════════════════════════════════════════════════
console.log("\n--- 2. Encapsulation Tests ---");

test("Price can be updated via setPrice()", () => {
  const item = new FoodItem("Test", 10.0);
  item.setPrice(20.0);
  assert(item.getPrice() === 20.0, `Expected 20.0, got ${item.getPrice()}`);
});

test("setPrice() rejects negative values", () => {
  const item = new FoodItem("Test", 10.0);
  let threw = false;
  try {
    item.setPrice(-5);
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error for negative price");
});

test("setPrice() rejects non-numeric values", () => {
  const item = new FoodItem("Test", 10.0);
  let threw = false;
  try {
    item.setPrice("abc");
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error for non-numeric price");
});

test("getItemSummary() returns correct object structure", () => {
  const item = new FoodItem("Test", 30.0);
  const summary = item.getItemSummary();
  assert(summary.name === "Test", "Name should be 'Test'");
  assert(summary.type === "Food Item", "Type should be 'Food Item'");
  assert(summary.price === 30.0, "Price should be 30.0");
  assert(summary.deliveryFee === 0, "Base delivery fee should be 0");
});

test("Private fields are not accessible directly", () => {
  const item = new FoodItem("Test", 30.0);
  // Accessing item.#name or item.#price would be a SyntaxError at parse time.
  // Instead, we verify that regular property access returns undefined.
  assert(item.name === undefined, "item.name should be undefined (private)");
  assert(item.price === undefined, "item.price should be undefined (private)");
});

// ════════════════════════════════════════════════════════════
//  TEST 3: Inheritance
// ════════════════════════════════════════════════════════════
console.log("\n--- 3. Inheritance Tests ---");

test("Pizza is an instance of FoodItem", () => {
  const p = new Pizza("Test", 50, "Medium");
  assert(p instanceof FoodItem, "Pizza should be instanceof FoodItem");
});

test("Burger is an instance of FoodItem", () => {
  const b = new Burger("Test", 50, false);
  assert(b instanceof FoodItem, "Burger should be instanceof FoodItem");
});

test("Drink is an instance of FoodItem", () => {
  const d = new Drink("Test", 20, true);
  assert(d instanceof FoodItem, "Drink should be instanceof FoodItem");
});

test("Dessert is an instance of FoodItem", () => {
  const d = new Dessert("Test", 40, false);
  assert(d instanceof FoodItem, "Dessert should be instanceof FoodItem");
});

test("Pizza inherits getName() from FoodItem", () => {
  const p = new Pizza("Hawaiian", 85, "Large");
  assert(p.getName() === "Hawaiian", "Pizza should inherit getName()");
});

test("Burger inherits getPrice() from FoodItem", () => {
  const b = new Burger("Veggie", 65, false);
  assert(b.getPrice() === 65, "Burger should inherit getPrice()");
});

test("Drink inherits setPrice() from FoodItem", () => {
  const d = new Drink("Juice", 30, true);
  d.setPrice(35);
  assert(d.getPrice() === 35, "Drink should inherit setPrice()");
});

// ════════════════════════════════════════════════════════════
//  TEST 4: Pizza-Specific Tests
// ════════════════════════════════════════════════════════════
console.log("\n--- 4. Pizza Tests ---");

test("Can create a Pizza with size", () => {
  const p = new Pizza("Margherita", 89.99, "Large");
  assert(p !== null, "Pizza should be created");
});

test("getSize() returns the correct size", () => {
  const p = new Pizza("Margherita", 89.99, "Medium");
  assert(p.getSize() === "Medium", `Expected 'Medium', got '${p.getSize()}'`);
});

test("getType() returns 'Pizza'", () => {
  const p = new Pizza("Margherita", 89.99, "Large");
  assert(p.getType() === "Pizza", `Expected 'Pizza', got '${p.getType()}'`);
});

test("Small pizza delivery fee is R15.00", () => {
  const p = new Pizza("Mini", 49.99, "Small");
  assert(p.calculateDeliveryFee() === 15.0, "Small pizza fee should be 15");
});

test("Medium pizza delivery fee is R20.00", () => {
  const p = new Pizza("Regular", 69.99, "Medium");
  assert(p.calculateDeliveryFee() === 20.0, "Medium pizza fee should be 20");
});

test("Large pizza delivery fee is R25.00", () => {
  const p = new Pizza("Family", 99.99, "Large");
  assert(p.calculateDeliveryFee() === 25.0, "Large pizza fee should be 25");
});

test("describe() includes pizza information", () => {
  const p = new Pizza("Pepperoni", 95.0, "Large");
  const desc = p.describe();
  assert(desc.includes("Pizza"), "Description should include 'Pizza'");
  assert(desc.includes("Pepperoni"), "Description should include 'Pepperoni'");
  assert(desc.includes("Large"), "Description should include 'Large'");
});

test("Invalid pizza size throws an error", () => {
  let threw = false;
  try {
    new Pizza("Bad Pizza", 50, "Huge");
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should throw for invalid pizza size");
});

// ════════════════════════════════════════════════════════════
//  TEST 5: Burger-Specific Tests
// ════════════════════════════════════════════════════════════
console.log("\n--- 5. Burger Tests ---");

test("Can create a Burger with combo flag", () => {
  const b = new Burger("Classic Beef", 79.99, true);
  assert(b !== null, "Burger should be created");
});

test("getIsCombo() returns the correct value", () => {
  const b = new Burger("Classic Beef", 79.99, true);
  assert(b.getIsCombo() === true, "Should be a combo");
});

test("getType() returns 'Burger'", () => {
  const b = new Burger("Classic Beef", 79.99, false);
  assert(b.getType() === "Burger", `Expected 'Burger', got '${b.getType()}'`);
});

test("Combo burger delivery fee is R18.00", () => {
  const b = new Burger("Combo Burger", 89.99, true);
  assert(b.calculateDeliveryFee() === 18.0, "Combo fee should be 18");
});

test("Non-combo burger delivery fee is R12.00", () => {
  const b = new Burger("Single Burger", 59.99, false);
  assert(b.calculateDeliveryFee() === 12.0, "Non-combo fee should be 12");
});

test("describe() includes burger information", () => {
  const b = new Burger("BBQ Bacon", 85.0, true);
  const desc = b.describe();
  assert(desc.includes("Burger"), "Description should include 'Burger'");
  assert(desc.includes("BBQ Bacon"), "Description should include 'BBQ Bacon'");
  assert(desc.includes("Combo"), "Description should include 'Combo'");
});

// ════════════════════════════════════════════════════════════
//  TEST 6: Drink-Specific Tests
// ════════════════════════════════════════════════════════════
console.log("\n--- 6. Drink Tests ---");

test("Can create a Drink with chilled flag", () => {
  const d = new Drink("Coca-Cola", 24.99, true);
  assert(d !== null, "Drink should be created");
});

test("getIsChilled() returns the correct value", () => {
  const d = new Drink("Coca-Cola", 24.99, true);
  assert(d.getIsChilled() === true, "Should be chilled");
});

test("getType() returns 'Drink'", () => {
  const d = new Drink("Coca-Cola", 24.99, true);
  assert(d.getType() === "Drink", `Expected 'Drink', got '${d.getType()}'`);
});

test("Chilled drink delivery fee is R10.00", () => {
  const d = new Drink("Cold Drink", 20, true);
  assert(d.calculateDeliveryFee() === 10.0, "Chilled fee should be 10");
});

test("Non-chilled drink delivery fee is R5.00", () => {
  const d = new Drink("Room Temp Drink", 15, false);
  assert(d.calculateDeliveryFee() === 5.0, "Non-chilled fee should be 5");
});

test("describe() includes drink information", () => {
  const d = new Drink("Fanta", 22, true);
  const desc = d.describe();
  assert(desc.includes("Drink"), "Description should include 'Drink'");
  assert(desc.includes("Fanta"), "Description should include 'Fanta'");
  assert(desc.includes("Chilled"), "Description should include 'Chilled'");
});

// ════════════════════════════════════════════════════════════
//  TEST 7: Dessert-Specific Tests (Additional Food Type)
// ════════════════════════════════════════════════════════════
console.log("\n--- 7. Dessert Tests (Additional Food Type) ---");

test("Can create a Dessert with refrigerated flag", () => {
  const d = new Dessert("Chocolate Cake", 59.99, true);
  assert(d !== null, "Dessert should be created");
});

test("getIsRefrigerated() returns the correct value", () => {
  const d = new Dessert("Chocolate Cake", 59.99, true);
  assert(d.getIsRefrigerated() === true, "Should be refrigerated");
});

test("getType() returns 'Dessert'", () => {
  const d = new Dessert("Brownie", 35, false);
  assert(d.getType() === "Dessert", `Expected 'Dessert', got '${d.getType()}'`);
});

test("Refrigerated dessert delivery fee is R22.00", () => {
  const d = new Dessert("Ice Cream", 45, true);
  assert(d.calculateDeliveryFee() === 22.0, "Refrigerated fee should be 22");
});

test("Non-refrigerated dessert delivery fee is R8.00", () => {
  const d = new Dessert("Cookies", 30, false);
  assert(d.calculateDeliveryFee() === 8.0, "Non-refrigerated fee should be 8");
});

test("describe() includes dessert information", () => {
  const d = new Dessert("Tiramisu", 74.99, true);
  const desc = d.describe();
  assert(desc.includes("Dessert"), "Description should include 'Dessert'");
  assert(desc.includes("Tiramisu"), "Description should include 'Tiramisu'");
  assert(desc.includes("Refrigerated"), "Description should include 'Refrigerated'");
});

test("Dessert is an instance of FoodItem (works with existing system)", () => {
  const d = new Dessert("Pie", 42, false);
  assert(d instanceof FoodItem, "Dessert should be instanceof FoodItem");
});

// ════════════════════════════════════════════════════════════
//  TEST 8: Polymorphism
// ════════════════════════════════════════════════════════════
console.log("\n--- 8. Polymorphism Tests ---");

test("Different food types return different delivery fees from the same method", () => {
  const pizza = new Pizza("Test", 50, "Large");
  const burger = new Burger("Test", 50, true);
  const drink = new Drink("Test", 20, true);
  const dessert = new Dessert("Test", 40, true);

  // All have calculateDeliveryFee() but return different values
  assert(pizza.calculateDeliveryFee() === 25.0, "Pizza should be 25");
  assert(burger.calculateDeliveryFee() === 18.0, "Burger should be 18");
  assert(drink.calculateDeliveryFee() === 10.0, "Drink should be 10");
  assert(dessert.calculateDeliveryFee() === 22.0, "Dessert should be 22");
});

test("Different food types return different types from getType()", () => {
  const pizza = new Pizza("P", 50, "Small");
  const burger = new Burger("B", 50, false);
  const drink = new Drink("D", 20, false);
  const dessert = new Dessert("S", 40, false);

  assert(pizza.getType() === "Pizza", "Pizza type");
  assert(burger.getType() === "Burger", "Burger type");
  assert(drink.getType() === "Drink", "Drink type");
  assert(dessert.getType() === "Dessert", "Dessert type");
});

test("Different food types return different descriptions from describe()", () => {
  const pizza = new Pizza("Margherita", 89.99, "Large");
  const burger = new Burger("Classic", 79.99, false);

  assert(pizza.describe() !== burger.describe(), "Descriptions should differ");
  assert(pizza.describe().includes("Pizza"), "Pizza description");
  assert(burger.describe().includes("Burger"), "Burger description");
});

test("getItemSummary() works correctly for all types (polymorphic)", () => {
  const items = [
    new Pizza("P", 50, "Small"),
    new Burger("B", 60, true),
    new Drink("D", 20, true),
    new Dessert("S", 40, true),
  ];

  for (const item of items) {
    const summary = item.getItemSummary();
    assert(summary.name !== undefined, "Summary should have name");
    assert(summary.type !== undefined, "Summary should have type");
    assert(summary.price > 0, "Summary should have positive price");
    assert(summary.deliveryFee > 0, "Summary should have positive delivery fee");
  }
});

// ════════════════════════════════════════════════════════════
//  TEST 9: Order Management
// ════════════════════════════════════════════════════════════
console.log("\n--- 9. Order Management Tests ---");

test("Can create an empty order", () => {
  const order = new Order("Test Customer");
  assert(order.getItemCount() === 0, "New order should have 0 items");
});

test("getCustomerName() returns the correct name", () => {
  const order = new Order("Jane Doe");
  assert(
    order.getCustomerName() === "Jane Doe",
    `Expected 'Jane Doe', got '${order.getCustomerName()}'`
  );
});

test("Can add items to an order", () => {
  const order = new Order("Test");
  order.addItem(new Pizza("Test", 50, "Small"));
  order.addItem(new Burger("Test", 40, false));
  assert(order.getItemCount() === 2, "Order should have 2 items");
});

test("addItem() rejects non-FoodItem objects", () => {
  const order = new Order("Test");
  let threw = false;
  try {
    order.addItem({ name: "Fake", price: 10 });
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should throw for non-FoodItem objects");
});

test("getItemCount() returns the correct count", () => {
  const order = new Order("Test");
  assert(order.getItemCount() === 0, "Should be 0 initially");
  order.addItem(new Drink("Water", 10, false));
  assert(order.getItemCount() === 1, "Should be 1 after adding one item");
  order.addItem(new Drink("Juice", 25, true));
  assert(order.getItemCount() === 2, "Should be 2 after adding two items");
});

test("Can remove items from an order", () => {
  const order = new Order("Test");
  order.addItem(new Pizza("Remove Me", 50, "Small"));
  order.addItem(new Burger("Keep Me", 40, false));

  const removed = order.removeItem(0);
  assert(removed !== null, "Should return the removed item");
  assert(removed.getName() === "Remove Me", "Should remove correct item");
  assert(order.getItemCount() === 1, "Should have 1 item left");
});

test("removeItem() with invalid index returns null", () => {
  const order = new Order("Test");
  order.addItem(new Drink("Test", 10, true));

  assert(order.removeItem(-1) === null, "Negative index should return null");
  assert(order.removeItem(5) === null, "Out-of-bounds index should return null");
});

test("calculateSubtotal() returns the correct sum of prices", () => {
  const order = new Order("Test");
  order.addItem(new Pizza("P", 100, "Large"));   // 100
  order.addItem(new Burger("B", 50, false));      // 50
  order.addItem(new Drink("D", 25, true));        // 25

  assertApprox(order.calculateSubtotal(), 175.0, "Subtotal should be 175");
});

test("calculateTotalDeliveryFees() returns the correct sum of fees", () => {
  const order = new Order("Test");
  order.addItem(new Pizza("P", 100, "Large"));   // fee: 25
  order.addItem(new Burger("B", 50, true));       // fee: 18
  order.addItem(new Drink("D", 25, true));        // fee: 10

  assertApprox(
    order.calculateTotalDeliveryFees(),
    53.0,
    "Total delivery fees should be 53"
  );
});

test("calculateTotal() returns subtotal + delivery fees", () => {
  const order = new Order("Test");
  order.addItem(new Pizza("P", 100, "Large"));   // 100 + 25 = 125
  order.addItem(new Burger("B", 50, true));       // 50 + 18 = 68
  order.addItem(new Drink("D", 25, true));        // 25 + 10 = 35

  const expected = 175.0 + 53.0; // 228
  assertApprox(order.calculateTotal(), expected, `Total should be ${expected}`);
});

test("displayOrderSummary() runs without error", () => {
  const order = new Order("Display Test");
  order.addItem(new Pizza("Margherita", 89.99, "Large"));
  order.addItem(new Drink("Water", 14.99, false));

  // Suppress console output for this test
  const originalLog = console.log;
  console.log = () => {};
  try {
    order.displayOrderSummary();
  } finally {
    console.log = originalLog;
  }
  assert(true, "displayOrderSummary should complete without error");
});

test("Creating an order with empty customer name throws an error", () => {
  let threw = false;
  try {
    new Order("");
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should throw for empty customer name");
});

// ════════════════════════════════════════════════════════════
//  TEST 10: Integration Test
// ════════════════════════════════════════════════════════════
console.log("\n--- 10. Integration Test ---");

test("Full order with all food types calculates correct totals", () => {
  const order = new Order("Integration Test Customer");

  const pizza = new Pizza("Pepperoni", 109.99, "Large");     // price: 109.99, fee: 25
  const burger = new Burger("BBQ Bacon", 89.99, true);       // price: 89.99,  fee: 18
  const drink = new Drink("Sprite", 19.99, true);            // price: 19.99,  fee: 10
  const dessert = new Dessert("Cheesecake", 64.99, true);    // price: 64.99,  fee: 22

  order.addItem(pizza);
  order.addItem(burger);
  order.addItem(drink);
  order.addItem(dessert);

  assert(order.getItemCount() === 4, "Should have 4 items");

  const expectedSubtotal = 109.99 + 89.99 + 19.99 + 64.99; // 284.96
  const expectedFees = 25 + 18 + 10 + 22;                    // 75
  const expectedTotal = expectedSubtotal + expectedFees;      // 359.96

  assertApprox(order.calculateSubtotal(), expectedSubtotal, "Subtotal mismatch");
  assertApprox(order.calculateTotalDeliveryFees(), expectedFees, "Fees mismatch");
  assertApprox(order.calculateTotal(), expectedTotal, "Total mismatch");

  // Verify polymorphism: each item produces different delivery fees
  const items = order.getItems();
  const fees = items.map((item) => item.calculateDeliveryFee());
  assert(fees[0] === 25, "Pizza fee should be 25");
  assert(fees[1] === 18, "Burger fee should be 18");
  assert(fees[2] === 10, "Drink fee should be 10");
  assert(fees[3] === 22, "Dessert fee should be 22");
});

// ════════════════════════════════════════════════════════════
//  TEST SUMMARY
// ════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(50));
console.log(`  TEST RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
console.log("=".repeat(50));

if (failed === 0) {
  console.log("  All tests passed! ✓\n");
} else {
  console.log(`  ${failed} test(s) failed. ✗\n`);
  process.exit(1);
}
