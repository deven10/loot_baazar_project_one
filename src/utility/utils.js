export const categories = [
  "Laptops",
  "AIO",
  "Printers",
  "Keyboard",
  "Laptop Bag",
  "Mobile",
  "Mouse",
];

export const stripProductName = (name) =>
  name.length > 100 ? name.slice(0, 100) + "..." : name;
