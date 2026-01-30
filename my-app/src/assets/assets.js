import All from "../assets/Category/All.jpg";
import Accessories from "../assets/Category/Accessories.jpg";
import Clothing from "../assets/Category/Clothing.jpg";
import Fashion from "../assets/Category/Fashion.jpg";
import Home from "../assets/Category/Home.jpg";
import Sports from "../assets/Category/Sports.jpg";
import Electronics from "../assets/Category/Electronics.jpg";

// Importing all products images with their respective categories
import { AccessoriesProducts } from "./Products/Accessories";
import { ClothingProducts } from "./Products/Clothings";
import { ElectronicsProducts } from "./Products/Electronics";
import { HomeProducts } from "./Products/Home";
import { SportsProducts } from "./Products/Sports";
import { FashionProducts } from "./Products/Fashion";

export const categoryImages = {
    All,
    Accessories,
    Clothing,
    Fashion,
    Home,
    Sports,
    Electronics,
}

export const AllProducts = [
    ...AccessoriesProducts,
    ...ClothingProducts,
    ...ElectronicsProducts,
    ...HomeProducts,
    ...SportsProducts,
    ...FashionProducts,
];