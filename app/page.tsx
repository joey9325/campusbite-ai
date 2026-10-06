import { getMenu } from "@/lib/menu";
import FoodSearch from "./food-search";

export default function Home() {
  const menu = getMenu();
  const featured = ["Soto ayam biasa", "Nasi ayam geprek", "Ramen", "Nasi uduk telor dadar", "Nasi ayam matah", "Sushi tuna"]
    .map((name) => menu.find((item) => item.name === name))
    .filter((item) => item !== undefined);
  return <FoodSearch featured={featured} />;
}
