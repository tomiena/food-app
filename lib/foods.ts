export type FoodCategory =
  | "grain"
  | "vegetable"
  | "meat"
  | "fish"
  | "dairy_egg_soy"
  | "seasoning"
  | "drink"
  | "soup"
  | "prepared_food";

export type Food = {
  id: string;
  name: string;
  category: FoodCategory;
  image: string;
  water: number;
  sodium: number;
  potassium: number;
  phosphorus: number;
};

export const FOODS: Food[] = [

  // ── grain 主食・麺（使う順） ──
  { id: "rice", name: "白米", category: "grain", image: "/images/foods/rice.png", water: 60, sodium: 1, potassium: 29, phosphorus: 34 },
  { id: "onigiri", name: "おにぎり", category: "grain", image: "/images/foods/onigiri.png", water: 56, sodium: 220, potassium: 29, phosphorus: 40 },
  { id: "bread", name: "食パン", category: "grain", image: "/images/foods/bread.png", water: 38, sodium: 500, potassium: 97, phosphorus: 85 },
  { id: "toast", name: "トースト", category: "grain", image: "/images/foods/toast.png", water: 30, sodium: 500, potassium: 90, phosphorus: 80 },
  { id: "roll_bread", name: "ロールパン", category: "grain", image: "/images/foods/roll_bread.png", water: 32, sodium: 480, potassium: 95, phosphorus: 85 },
  { id: "sweet_bread", name: "菓子パン", category: "grain", image: "/images/foods/sweet_bread.png", water: 28, sodium: 380, potassium: 85, phosphorus: 75 },
  { id: "brown_rice", name: "玄米", category: "grain", image: "/images/foods/brown_rice.png", water: 60, sodium: 1, potassium: 95, phosphorus: 130 },
  { id: "udon", name: "うどん", category: "grain", image: "/images/foods/udon.png", water: 75, sodium: 200, potassium: 20, phosphorus: 18 },
  { id: "cold_udon", name: "冷やしうどん", category: "grain", image: "/images/foods/cold_udon.png", water: 75, sodium: 180, potassium: 20, phosphorus: 18 },
  { id: "soba", name: "そば", category: "grain", image: "/images/foods/soba.png", water: 68, sodium: 60, potassium: 100, phosphorus: 95 },
  { id: "somen", name: "そうめん", category: "grain", image: "/images/foods/somen.png", water: 70, sodium: 90, potassium: 15, phosphorus: 20 },
  { id: "spaghetti", name: "スパゲティ", category: "grain", image: "/images/foods/spaghetti.png", water: 65, sodium: 1, potassium: 55, phosphorus: 90 },
  { id: "whole_grain_bread", name: "全粒粉パン", category: "grain", image: "/images/foods/whole_grain_bread.png", water: 38, sodium: 450, potassium: 190, phosphorus: 170 },

  // ── soup 汁物 ──
  { id: "miso_soup", name: "みそ汁", category: "soup", image: "/images/foods/miso_soup.png", water: 93, sodium: 600, potassium: 80, phosphorus: 40 },
  { id: "vegetable_soup", name: "野菜スープ", category: "soup", image: "/images/foods/vegetable_soup.png", water: 93, sodium: 400, potassium: 200, phosphorus: 30 },
  { id: "clear_soup", name: "すまし汁", category: "soup", image: "/images/foods/clear_soup.png", water: 96, sodium: 250, potassium: 50, phosphorus: 15 },
  { id: "egg_drop_soup", name: "かきたま汁", category: "soup", image: "/images/foods/egg_drop_soup.png", water: 94, sodium: 300, potassium: 60, phosphorus: 35 },
  { id: "kenchin_soup", name: "けんちん汁", category: "soup", image: "/images/foods/kenchin_soup.png", water: 91, sodium: 350, potassium: 120, phosphorus: 45 },
  { id: "osuimono", name: "お吸い物", category: "soup", image: "/images/foods/osuimono.png", water: 97, sodium: 200, potassium: 30, phosphorus: 10 },
  { id: "clam_chowder", name: "クラムチャウダー", category: "soup", image: "/images/foods/clam_chowder.png", water: 85, sodium: 450, potassium: 150, phosphorus: 80 },
  { id: "potage", name: "ポタージュ", category: "soup", image: "/images/foods/potage.png", water: 85, sodium: 380, potassium: 180, phosphorus: 60 },
  { id: "minestrone", name: "ミネストローネ", category: "soup", image: "/images/foods/minestrone.png", water: 90, sodium: 350, potassium: 180, phosphorus: 40 },
  { id: "harusame_soup", name: "春雨スープ", category: "soup", image: "/images/foods/harusame_soup.png", water: 92, sodium: 400, potassium: 80, phosphorus: 20 },
  { id: "chicken_broth_soup", name: "鶏ガラスープ", category: "soup", image: "/images/foods/chicken_broth_soup.png", water: 95, sodium: 300, potassium: 90, phosphorus: 30 },
  { id: "consomme_soup", name: "コンソメスープ", category: "soup", image: "/images/foods/consomme_soup.png", water: 96, sodium: 350, potassium: 60, phosphorus: 20 },

  // ── drink 飲み物 ──
  { id: "water", name: "水", category: "drink", image: "/images/foods/water.png", water: 100, sodium: 0, potassium: 0, phosphorus: 0 },
  { id: "green_tea", name: "お茶（緑茶）", category: "drink", image: "/images/foods/green_tea.png", water: 100, sodium: 0, potassium: 27, phosphorus: 2 },
  { id: "coffee", name: "コーヒー", category: "drink", image: "/images/foods/coffee.png", water: 99, sodium: 1, potassium: 65, phosphorus: 7 },
  { id: "milk", name: "牛乳", category: "drink", image: "/images/foods/milk.png", water: 87, sodium: 40, potassium: 150, phosphorus: 90 },
  { id: "orange_juice", name: "オレンジジュース", category: "drink", image: "/images/foods/orange_juice.png", water: 89, sodium: 1, potassium: 200, phosphorus: 13 },
  { id: "apple_juice", name: "リンゴジュース", category: "drink", image: "/images/foods/apple_juice.png", water: 88, sodium: 1, potassium: 100, phosphorus: 10 },
  { id: "cola", name: "コーラ", category: "drink", image: "/images/foods/cola.png", water: 89, sodium: 4, potassium: 2, phosphorus: 12 },
  { id: "beer", name: "ビール", category: "drink", image: "/images/foods/beer.png", water: 93, sodium: 4, potassium: 34, phosphorus: 15 },

  // ── prepared_food 調理済み ──
  { id: "bento", name: "お弁当", category: "prepared_food", image: "/images/foods/bento.png", water: 55, sodium: 600, potassium: 150, phosphorus: 100 },
  { id: "curry_rice", name: "カレーライス", category: "prepared_food", image: "/images/foods/curry_rice.png", water: 65, sodium: 400, potassium: 120, phosphorus: 50 },
  { id: "fried_rice", name: "チャーハン", category: "prepared_food", image: "/images/foods/fried_rice.png", water: 55, sodium: 350, potassium: 70, phosphorus: 60 },
  { id: "omurice", name: "オムライス", category: "prepared_food", image: "/images/foods/omurice.png", water: 62, sodium: 450, potassium: 130, phosphorus: 120 },
  { id: "ramen", name: "ラーメン", category: "prepared_food", image: "/images/foods/ramen.png", water: 88, sodium: 800, potassium: 100, phosphorus: 50 },
  { id: "sushi", name: "寿司", category: "prepared_food", image: "/images/foods/sushi.png", water: 65, sodium: 250, potassium: 80, phosphorus: 80 },
  { id: "sandwich", name: "サンドイッチ", category: "prepared_food", image: "/images/foods/sandwich.png", water: 45, sodium: 500, potassium: 110, phosphorus: 90 },
  { id: "pizza", name: "ピザ", category: "prepared_food", image: "/images/foods/pizza.png", water: 45, sodium: 550, potassium: 120, phosphorus: 130 },

];

export function getFoodRisk(food: Food) {
  return {
    sodium: food.sodium > 300,
    potassium: food.potassium > 300,
  };
}