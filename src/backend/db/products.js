import { v4 as uuid } from "uuid";

import laptop1 from "../../images/Products/laptops/laptop-1/laptop-1.jpg";
import laptop2 from "../../images/Products/laptops/laptop-2/laptop-2.jpg";
import laptop3 from "../../images/Products/laptops/laptop-3/laptop-3.jpg";
import laptop4 from "../../images/Products/laptops/laptop-4/laptop-4.jpg";

import printer1 from "../../images/Products/printers/printer-1.jpg";
import printer3 from "../../images/Products/printers/printer-3.jpg";
import printer4 from "../../images/Products/printers/printer-4.jpg";

import aio1 from "../../images/Products/aio/aio-1.jpg";
import aio2 from "../../images/Products/aio/aio-2.jpg";
import aio3 from "../../images/Products/aio/aio-3.jpg";
import aio4 from "../../images/Products/aio/aio-4.jpg";
/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  // {
  //   _id: uuid(),
  //   title: "You Can WIN",
  //   author: "Shiv Khera",
  //   price: "5000",
  //   categoryName: "non-fiction",
  // },
  {
    _id: uuid(),
    name: `Lenovo Yoga 6 AMD Ryzen 7 5700U 13.3"(33.78cm) FHD+ IPS 2in1 (16GB/512GB SSD/Win 11/Office 2021/Backlit KB/Fingerprint/Digital Pen/3Yr Warranty/Alexa/3 Month Game Pass/Dark Teal/1.37Kg),82UD0068IN`,
    liked: false,
    image: laptop1,
    price: 86990,
    mrp: 103999,
    categoryName: "Laptops",
    productRating: 3,
  },
  {
    _id: uuid(),
    name: `Epson EcoTank L6270 A4 Wi-Fi Duplex All-in-One Ink Tank Printer with ADF`,
    liked: false,
    image: printer1,
    price: 25699,
    mrp: 35499,
    categoryName: "Printers",
    productRating: 4,
  },
  {
    _id: uuid(),
    name: `Lenovo Yoga AIO 7 27 4K UHD Touchscreen All-in-One Desktop (AMD Ryzen 7 5800H/16GB/1TB SSD/Windows 11/ Home 64/Office 2021/AMD Radeon RX6600M 8GB GDDR6), Grey`,
    liked: false,
    image: aio1,
    price: 169990,
    mrp: 218999,
    categoryName: "AIO",
    productRating: 5,
  },
  {
    _id: uuid(),
    name: `Lenovo Legion5Pro Intel Core i7 11thGen (40cm) QHD 16:10 IPS Gaming Laptop(16GB/1TB SSD/RTX 3060 6GB Graphics/165Hz/Windows 11/MS Office/Blue Backlit/3months Game Pass/Stingray/2.5Kg),82JD005KIN`,
    liked: false,
    image: laptop2,
    price: 124990,
    mrp: 162999,
    categoryName: "Laptops",
    productRating: 3,
  },
  {
    _id: uuid(),
    name: `Lenovo IdeaCentre AIO 3 12th Gen Intel i3 27" FHD IPS 3-Side Edgeless All-in-One Desktop with Alexa Built-in (8GB/512GB SSD/Win11/MS Office 2021/5.0MP Camera/Wireless Keyboard & Mouse) F0GJ00C2IN`,
    liked: false,
    image: aio2,
    price: 52990,
    mrp: 64999,
    categoryName: "AIO",
    productRating: 4,
  },
  {
    _id: uuid(),
    name: `Lenovo IdeaCentre AIO 5 23.8 FHD IPS Touchscreen All-in-One Desktop 11th Gen Intel Core i7/16GB/512GB SSD/Windows 11 Home/Office 2021/NVIDIA MX450 2GB GDDR6 (Graphite Grey)`,
    liked: false,
    image: aio3,
    price: 115990,
    mrp: 139999,
    categoryName: "AIO",
    productRating: 4,
  },
  {
    _id: uuid(),
    name: `Epson EcoTank L8180 Multifunction A3+ InkTank Photo Printer`,
    liked: false,
    image: printer3,
    price: 45990,
    mrp: 58999,
    categoryName: "Printers",
    productRating: 2,
  },
  {
    _id: uuid(),
    name: `ASUS ROG Flow Z13 (2022), 13.4" (34.03 cms) FHD+ 16:10, 120Hz Touch, Intel Core i5 12th Gen, 2-in-1 Gaming Laptop (16GB/512GB SSD/Win 11/Integrated Graphics/Office 2021/Black/1.12 kg) GZ301ZA-LD049WS`,
    liked: false,
    image: laptop3,
    price: 95990,
    mrp: 110999,
    categoryName: "Laptops",
    productRating: 5,
  },
  {
    _id: uuid(),
    name: `MSI Raider GE78HX, Intel 13th Gen. i9-13980HX, 43CM QHD+ 240Hz Gaming Laptop (64GB/2TB NVMe SSD/Windows 11 Home/Nvidia GeForce RTX4090, 16GB GDDR6/Black/3.1Kg), 13VI-087IN`,
    liked: false,
    image: laptop4,
    price: 459990,
    mrp: 525999,
    categoryName: "Laptops",
    productRating: 4,
  },
  {
    _id: uuid(),
    name: `Epson L850 Multi-Function Printer (Black)`,
    liked: false,
    image: printer4,
    price: 37999,
    mrp: 46999,
    categoryName: "Printers",
    productRating: 3,
  },
  {
    _id: uuid(),
    name: `HP Pavilion All-in-One Desktop PC, 27-inch Full HD IPS Touchscreen, Powerful Ryzen 7 4800 Processor, 16 GB RAM, 1 TB PCIe NVMe SSD Storage, AMD Radeon Graphics (Keyboard and Mouse, Snowflake White)`,
    liked: false,
    image: aio4,
    price: 184999,
    mrp: 210999,
    categoryName: "AIO",
    productRating: 4,
  },
];
