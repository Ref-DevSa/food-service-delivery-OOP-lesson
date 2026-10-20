# Food Delivery System — OOP Principles Explanation

## Where Each OOP Principle Is Demonstrated

---

### 1. Encapsulation

**What it is:** Protecting internal data from direct outside access, and controlling how that data is read or modified through methods.

**Where it is demonstrated:**

| File | Implementation |
|------|---------------|
| `src/FoodItem.js` | `#name` and `#price` are **private fields** (using the `#` syntax). They cannot be accessed or changed directly from outside the class. |
| `src/FoodItem.js` | `getName()` and `getPrice()` are **getter methods** that provide controlled read access to the private data. |
| `src/FoodItem.js` | `setPrice(newPrice)` is a **setter method** that validates the new value before allowing the price to be changed. Invalid values (negative, zero, non-numeric) are rejected with an error. |
| `src/Pizza.js` | `#size` is a private field with a `getSize()` getter. |
| `src/Burger.js` | `#isCombo` is a private field with a `getIsCombo()` getter. |
| `src/Drink.js` | `#isChilled` is a private field with a `getIsChilled()` getter. |
| `src/Dessert.js` | `#isRefrigerated` is a private field with a `getIsRefrigerated()` getter. |
| `src/Order.js` | `#items` and `#customerName` are private fields. `getItems()` returns a **copy** of the array, not the original reference, preventing external code from directly modifying the order's internal item list. |

---

### 2. Inheritance

**What it is:** Creating new classes that reuse, extend, and specialise the behaviour of existing classes, avoiding code duplication.

**Where it is demonstrated:**

| Child Class | Parent Class | What Is Inherited |
|-------------|-------------|-------------------|
| `Pizza` | `FoodItem` | `getName()`, `getPrice()`, `setPrice()`, `getItemSummary()`, constructor validation logic |
| `Burger` | `FoodItem` | Same as above |
| `Drink` | `FoodItem` | Same as above |
| `Dessert` | `FoodItem` | Same as above |

- Each child class calls `super(name, price)` in its constructor to invoke the parent's constructor.
- Common properties (`#name`, `#price`) and methods (`getName()`, `getPrice()`, `setPrice()`, `getItemSummary()`) are defined **once** in `FoodItem` and inherited by all child classes.
- This avoids duplicating validation logic, getter/setter methods, and the summary generation in every food type class.

---

### 3. Abstraction

**What it is:** Hiding complex internal implementation details and providing a simple interface for users of the class.

**Where it is demonstrated:**

| Method | Class | How It Demonstrates Abstraction |
|--------|-------|-------------------------------|
| `getItemSummary()` | `FoodItem` | Returns a clean object `{ name, type, price, deliveryFee }` without exposing how the type is determined or how the delivery fee is calculated internally. The caller does not need to know the implementation details. |
| `calculateTotal()` | `Order` | Returns the final total by internally calling `calculateSubtotal()` and `calculateTotalDeliveryFees()`. The user of this method simply calls one function and gets the answer, without needing to know the step-by-step calculation process. |
| `displayOrderSummary()` | `Order` | Produces a fully formatted order summary. The caller does not need to know how the formatting, looping, or calculations work internally. |
| `addItem()` | `Order` | Handles validation (checking the item is a FoodItem instance) internally. The caller simply passes an item and the method handles the rest. |

---

### 4. Polymorphism

**What it is:** Different objects responding differently to the same method call. The same operation produces different results depending on the type of object.

**Where it is demonstrated:**

| Method | Behaviour Per Type |
|--------|-------------------|
| `calculateDeliveryFee()` | **Pizza:** R15 / R20 / R25 depending on size. **Burger:** R18 (combo) / R12 (single). **Drink:** R10 (chilled) / R5 (room temp). **Dessert:** R22 (refrigerated) / R8 (non-refrigerated). |
| `getType()` | Returns `"Pizza"`, `"Burger"`, `"Drink"`, or `"Dessert"` depending on the actual object type. The base `FoodItem` returns `"Food Item"`. |
| `describe()` | Each food type returns a description formatted with its own specific properties (size, combo status, chilled status, refrigeration status). |

**Key example in `Order.calculateTotalDeliveryFees()`:** The method iterates over all items and calls `item.calculateDeliveryFee()` on each one. Even though the same method name is called, each item returns a different fee based on its actual type. This is polymorphism in action — the Order class does not need to know what type each item is; it simply calls the method and each type responds appropriately.

```javascript
// From Order.js — Polymorphism in action
calculateTotalDeliveryFees() {
    let totalFees = 0;
    for (const item of this.#items) {
        // Same method call, different result per food type
        totalFees += item.calculateDeliveryFee();
    }
    return totalFees;
}
```

---

## Project Structure

```
food-delivery-system/
├── package.json          # Project configuration (ES modules)
├── main.js               # Main application — demonstrates all OOP principles
├── test.js               # Comprehensive test suite (64 tests)
└── src/
    ├── FoodItem.js       # Base class (encapsulation, abstraction)
    ├── Pizza.js          # Inherits FoodItem (inheritance, polymorphism)
    ├── Burger.js         # Inherits FoodItem (inheritance, polymorphism)
    ├── Drink.js          # Inherits FoodItem (inheritance, polymorphism)
    ├── Dessert.js        # Additional food type (inheritance, polymorphism)
    └── Order.js          # Order management (encapsulation, abstraction, polymorphism)
```
