

// Importing all products images with their respective categories
import { AccessoriesProducts } from "./Products/Accessories";
import { ClothingProducts } from "./Products/Clothings";
import { ElectronicsProducts } from "./Products/Electronics";
import { HomeProducts } from "./Products/Home";
import { SportsProducts } from "./Products/Sports";
import { FashionProducts } from "./Products/Fashion";

// export const categoryImages = {
//     All,
//     Accessories,
//     Clothing,
//     Fashion,
//     Home,
//     Sports,
//     Electronics,
// }

export const AllProducts = [
    ...AccessoriesProducts,
    ...ClothingProducts,
    ...ElectronicsProducts,
    ...HomeProducts,
    ...SportsProducts,
    ...FashionProducts,
];