export type Category = "single-origin" | "blend" | "decaf";
export type Weight = 250 | 1000;

export interface Product {
  id: string;
  name: string;
  producer: string;
  region: string;
  country: string;
  category: Category;
  process: string;
  varietal: string;
  altitude: string;
  roast: 1 | 2 | 3 | 4 | 5;
  notes: [string, string, string];
  description: string;
  price250: number;
  score: number;
  badge?: string;
  accent: string;
  image: string;
  recipe: {
    method: string;
    ratio: string;
    grind: string;
    temp: string;
    time: string;
  };
}

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All coffee" },
  { id: "single-origin", label: "Single origin" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const ROAST_LABELS: Record<number, string> = {
  1: "Light",
  2: "Lightâ€“medium",
  3: "Medium",
  4: "Mediumâ€“dark",
  5: "Dark",
};

export const PRODUCTS: Product[] = [
  {
    id: "guji",
    name: "Guji Highlands",
    producer: "Hambela Buku Abel",
    region: "Oromia",
    country: "Ethiopia",
    category: "single-origin",
    process: "Washed Â· 72 h ferment",
    varietal: "Heirloom 74110",
    altitude: "2,100 masl",
    roast: 1,
    notes: ["Jasmine", "Bergamot", "White peach"],
    description:
      "A shimmering heirloom lot from the Hambela valley, fermented 72 hours before washing. It opens like a bouquet â€” jasmine and bergamot up front, then a long, silky finish of ripe white peach.",
    price250: 21,
    score: 92.4,
    badge: "New harvest",
    accent: "#e8b06b",
    image: "/coffee/Guji Highlands.png",
    recipe: { method: "V60 pour-over", ratio: "1 : 16", grind: "Medium-fine", temp: "94 Â°C", time: "2:45" },
  },
  {
    id: "mirador",
    name: "El Mirador",
    producer: "The Rojas family",
    region: "Huila",
    country: "Colombia",
    category: "single-origin",
    process: "Washed",
    varietal: "Pink Bourbon",
    altitude: "1,750 masl",
    roast: 2,
    notes: ["Caramel", "Red apple", "Cacao nib"],
    description:
      "Third-generation Pink Bourbon from a twelve-hectare family farm above GarzÃ³n. Sweet and structured â€” buttery caramel wrapped around bright red-apple acidity, drying out on a clean cocoa note.",
    price250: 19.5,
    score: 89.8,
    badge: "Staff pick",
    accent: "#c4674a",
    image: "/coffee/El Mirador.png",
    recipe: { method: "Kalita Wave", ratio: "1 : 15.5", grind: "Medium", temp: "93 Â°C", time: "3:00" },
  },
  {
    id: "nyeri",
    name: "Nyeri AA",
    producer: "Gatomboya Factory",
    region: "Nyeri",
    country: "Kenya",
    category: "single-origin",
    process: "Double-washed",
    varietal: "SL28 Â· SL34",
    altitude: "1,800 masl",
    roast: 2,
    notes: ["Blackcurrant", "Ruby grapefruit", "Demerara"],
    description:
      "Classic highland Kenyan intensity from the slopes of the Aberdares. Double fermentation gives it a wine-dark fruit punch â€” blackcurrant and grapefruit held together by raw demerara sweetness.",
    price250: 22.5,
    score: 91.2,
    badge: "Limited Â· 8 bags",
    accent: "#8e4a5b",
    image: "/coffee/Nyeri AA.png",
    recipe: { method: "V60 pour-over", ratio: "1 : 16.5", grind: "Medium-fine", temp: "95 Â°C", time: "2:30" },
  },
  {
    id: "cerrado",
    name: "Cerrado Natural",
    producer: "Fazenda Boa Vista",
    region: "Minas Gerais",
    country: "Brazil",
    category: "single-origin",
    process: "Natural Â· patio dried",
    varietal: "Yellow CatuaÃ­",
    altitude: "1,150 masl",
    roast: 3,
    notes: ["Toasted hazelnut", "Milk chocolate", "Dried fig"],
    description:
      "A patio-dried natural from the red soils of the Cerrado. Round, comforting and dangerously drinkable â€” hazelnut and milk chocolate with a whisper of dried fig. Our default recommendation for espresso with milk.",
    price250: 18,
    score: 87.5,
    accent: "#c9a35c",
    image: "/coffee/Cerrado Natural.png",
    recipe: { method: "Espresso", ratio: "1 : 2 in 28 s", grind: "Fine", temp: "93 Â°C", time: "0:28" },
  },
  {
    id: "night-owl",
    name: "Night Owl Espresso",
    producer: "House blend Â· seasonal",
    region: "Brazil Â· Ethiopia",
    country: "â€”",
    category: "blend",
    process: "Natural + washed",
    varietal: "Seasonal components",
    altitude: "Mixed",
    roast: 4,
    notes: ["Dark chocolate", "Molasses", "Roasted almond"],
    description:
      "Our after-dark espresso: 70% Brazilian natural for body, 30% washed Ethiopian for lift. Roasted a shade deeper to stay syrupy through milk â€” dark chocolate and molasses with an almond-butter finish.",
    price250: 17.5,
    score: 88,
    badge: "Best seller",
    accent: "#6f7f52",
    image: "/coffee/Night Owl Espresso.png",
    recipe: { method: "Espresso", ratio: "1 : 2 in 30 s", grind: "Fine", temp: "92 Â°C", time: "0:30" },
  },
  {
    id: "sugarcane-decaf",
    name: "Sugarcane Decaf",
    producer: "La Palma cooperative",
    region: "Cauca",
    country: "Colombia",
    category: "decaf",
    process: "Sugarcane E.A.",
    varietal: "Castillo Â· Caturra",
    altitude: "1,700 masl",
    roast: 3,
    notes: ["Toffee", "Orange zest", "Marzipan"],
    description:
      "Decaffeinated the gentle way â€” with sugarcane-derived ethyl acetate from Colombia's own cane fields. You get the whole cup: toffee sweetness, a flick of orange zest, and a soft marzipan landing. 99.9% caffeine-free.",
    price250: 19,
    score: 87.9,
    accent: "#8fa07a",
    image: "/coffee/Sugarcane Decaf.png",
    recipe: { method: "French press", ratio: "1 : 14", grind: "Coarse", temp: "96 Â°C", time: "4:00" },
  },
];

export const HERO_IMAGE = "/coffee/HERO_IMAGE.png";

export const priceFor = (p: Product, w: Weight): number =>
  w === 250 ? p.price250 : Math.round(p.price250 * 3.4 * 2) / 2;

export const weightLabel = (w: Weight): string => (w === 250 ? "250 g" : "1 kg");

export const fmt = (n: number): string => `$${n.toFixed(2)}`;

export const findProduct = (id: string): Product =>
  PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];

/** Next roast day: the coming Monday or Thursday. */
export function nextRoastDate(): string {
  const d = new Date();
  for (let i = 1; i <= 7; i++) {
    const t = new Date(d);
    t.setDate(d.getDate() + i);
    if (t.getDay() === 1 || t.getDay() === 4) {
      return t.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  }
  return "Mon";
}

