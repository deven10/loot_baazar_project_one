import { v4 as uuid } from "uuid";

import AIO from "../../images/AIO.png";
import Laptops from "../../images/LAPTOP.png";
import Printers from "../../images/PRINTER.png";
import laptopBag from "../../images/laptop bag.png";
import keyboard from "../../images/keyboard.png";
import mobile from "../../images/mobile.png";
import mouse from "../../images/mouse.png";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Laptops",
    image: Laptops,
  },
  {
    _id: uuid(),
    categoryName: "AIO",
    image: AIO,
  },
  {
    _id: uuid(),
    categoryName: "Printers",
    image: Printers,
  },
  {
    _id: uuid(),
    categoryName: "Keyboard",
    image: keyboard,
  },
  {
    _id: uuid(),
    categoryName: "Laptop Bag",
    image: laptopBag,
  },
  {
    _id: uuid(),
    categoryName: "Mobile",
    image: mobile,
  },
  {
    _id: uuid(),
    categoryName: "Mouse",
    image: mouse,
  },
];
