import coffee from "@/assets/menu-coffee.jpg";
import dessert from "@/assets/menu-dessert.jpg";
import snack from "@/assets/menu-snack.jpg";
import signature from "@/assets/menu-signature.jpg";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export const menu: Record<string, MenuItem[]> = {
  Coffee: [
    { name: "Single-Origin Pour Over", description: "Light, floral notes from Chikmagalur estate. Brewed slow.", price: 240, image: coffee },
    { name: "Cortado", description: "Equal parts espresso and steamed milk. Bold and balanced.", price: 220, image: coffee },
    { name: "Classic Cappuccino", description: "Rich double shot with velvet microfoam.", price: 230, image: coffee },
    { name: "Iced Americano", description: "Cold brew over ice for the long afternoons.", price: 210, image: coffee },
  ],
  Beverages: [
    { name: "Iced Matcha Latte", description: "Ceremonial-grade matcha, oat milk, light honey.", price: 280, image: signature },
    { name: "Spiced Chai Latte", description: "House-blended masala chai, simmered slow.", price: 200, image: signature },
    { name: "Hibiscus Cooler", description: "Bright, tart, garnished with mint.", price: 220, image: signature },
    { name: "Cold Brew Tonic", description: "24-hour cold brew, tonic water, orange peel.", price: 260, image: signature },
  ],
  Desserts: [
    { name: "Classic Tiramisu", description: "House-made mascarpone, espresso-soaked ladyfingers.", price: 320, image: dessert },
    { name: "Burnt Basque Cheesecake", description: "Caramelised crown, soft cloud center.", price: 340, image: dessert },
    { name: "Salted Caramel Brownie", description: "Fudgy, dark, finished with flaky sea salt.", price: 240, image: dessert },
    { name: "Lemon Olive Oil Cake", description: "Light, citrus-forward, dusted with sugar.", price: 260, image: dessert },
  ],
  "Snacks & Meals": [
    { name: "Avocado Toast", description: "Sourdough, smashed avocado, poached egg, chili.", price: 380, image: snack },
    { name: "Pesto Mushroom Panini", description: "Sourdough, basil pesto, gruyère, wild mushrooms.", price: 360, image: snack },
    { name: "Garden Grain Bowl", description: "Quinoa, roasted veg, tahini, pomegranate.", price: 420, image: snack },
    { name: "Eggs & Greens Plate", description: "Soft-scrambled eggs, sautéed greens, toast.", price: 340, image: snack },
  ],
};
