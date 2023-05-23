import { v4 as uuid } from "uuid";

import AIO from "../../images/AIO.jpg";
import Laptops from "../../images/LAPTOP.jpg";
import Printers from "../../images/PRINTER.jpg";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Laptops",
    description: `Companies, businesses, and government organizations use laptops for data storage, on-boarding, managing schedules, creating financial reports, and many more. People use laptops to watch and download videos or movies, songs, and other media files from the Internet. Also, the laptop is used for online and offline gaming.`,
    image: Laptops,
  },
  {
    _id: uuid(),
    categoryName: "AIO",
    description: `All-in-One (AIO) PCs are personal computers that have incorporated many components of a traditional desktop computer into a single, compact unit. These streamlined PCs can be more efficient, space-saving, and intuitive for users but have not seen significant sustained demand among consumers.`,
    image: AIO,
  },
  {
    _id: uuid(),
    categoryName: "Printers",
    description: `A printer is a device that accepts text and graphic output from a computer and transfers the information to paper, usually to standard-size, 8.5" by 11" sheets of paper. Printers vary in size, speed, sophistication and cost.`,
    image: Printers,
  },
];
