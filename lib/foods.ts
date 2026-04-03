export type FoodCategory =
  | "grain"          // 主食・麺
  | "vegetable"      // 野菜・果物
  | "meat"           // 肉
  | "fish"           // 魚介
  | "dairy_egg_soy"  // 卵・大豆・乳製品
  | "seasoning"      // 調味料
  | "drink"          // 飲み物
  | "soup"           // 汁物
  | "prepared_food"; // 調理済み・惣菜

export type Food = {
  id: string;
  name: string;
  category: FoodCategory;
  image: string;
  water: number;      // ml per 100g
  sodium: number;     // mg per 100g
  potassium: number;  // mg per 100g
  phosphorus: number; // mg per 100g
};

// Values are approximate per 100g (cooked/as-served unless noted)
export const FOODS: Food[] = [

  // ── grain 主食・麺 ─────────────────────────────────────────
  { id: "rice",           name: "白米",           category: "grain",         image: "/images/foods/rice.png",           water: 60,  sodium:   1, potassium:  29, phosphorus:  34 },
  { id: "brown_rice",     name: "玄米",           category: "grain",         image: "/images/foods/brown_rice.png",     water: 60,  sodium:   1, potassium:  95, phosphorus: 130 },
  { id: "onigiri",        name: "おにぎり",       category: "grain",         image: "/images/foods/onigiri.png",        water: 56,  sodium: 220, potassium:  29, phosphorus:  40 },
  { id: "rice_porridge",  name: "お粥",           category: "grain",         image: "/images/foods/rice_porridge.png",  water: 84,  sodium:   1, potassium:  14, phosphorus:  17 },
  { id: "bread",          name: "食パン",         category: "grain",         image: "/images/foods/bread.png",          water: 38,  sodium: 500, potassium:  97, phosphorus:  85 },
  { id: "croissant",      name: "クロワッサン",   category: "grain",         image: "/images/foods/croissant.png",      water: 20,  sodium: 500, potassium:  80, phosphorus: 100 },
  { id: "pancake",        name: "ホットケーキ",   category: "grain",         image: "/images/foods/pancake.png",        water: 40,  sodium: 340, potassium: 100, phosphorus: 130 },
  { id: "udon",           name: "うどん",         category: "grain",         image: "/images/foods/udon.png",           water: 75,  sodium: 200, potassium:  20, phosphorus:  18 },
  { id: "soba",           name: "そば",           category: "grain",         image: "/images/foods/soba.png",           water: 68,  sodium:  60, potassium: 100, phosphorus:  95 },
  { id: "spaghetti",      name: "スパゲティ",     category: "grain",         image: "/images/foods/spaghetti.png",      water: 65,  sodium:   1, potassium:  55, phosphorus:  90 },

  // ── soup 汁物 ──────────────────────────────────────────────
  { id: "miso_soup",      name: "みそ汁",         category: "soup",          image: "/images/foods/miso_soup.png",      water: 93,  sodium: 600, potassium:  80, phosphorus:  40 },
  { id: "tonjiru",        name: "豚汁",           category: "soup",          image: "/images/foods/tonjiru.png",        water: 90,  sodium: 550, potassium: 130, phosphorus:  50 },
  { id: "consomme",       name: "コンソメスープ", category: "soup",          image: "/images/foods/consomme.png",       water: 94,  sodium: 500, potassium: 100, phosphorus:  20 },
  { id: "chinese_soup",   name: "中華スープ",     category: "soup",          image: "/images/foods/chinese_soup.png",   water: 93,  sodium: 550, potassium:  90, phosphorus:  20 },
  { id: "tomato_soup",    name: "トマトスープ",   category: "soup",          image: "/images/foods/tomato_soup.png",    water: 91,  sodium: 450, potassium: 220, phosphorus:  30 },
  { id: "potage",         name: "ポタージュ",     category: "soup",          image: "/images/foods/potage.png",         water: 88,  sodium: 400, potassium: 180, phosphorus:  60 },
  { id: "corn_potage",    name: "コーンポタージュ",category: "soup",         image: "/images/foods/corn_potage.png",    water: 88,  sodium: 400, potassium: 160, phosphorus:  55 },
  { id: "stew",           name: "シチュー",       category: "soup",          image: "/images/foods/stew.png",           water: 82,  sodium: 450, potassium: 200, phosphorus:  60 },
  { id: "nabe",           name: "鍋（水炊き）",   category: "soup",          image: "/images/foods/nabe.png",           water: 92,  sodium: 350, potassium: 150, phosphorus:  60 },
  { id: "curry_liquid",   name: "カレー（汁）",   category: "soup",          image: "/images/foods/curry_liquid.png",   water: 80,  sodium: 500, potassium: 150, phosphorus:  50 },

  // ── drink 飲み物 ───────────────────────────────────────────
  { id: "water_drink",    name: "水",             category: "drink",         image: "/images/foods/water_drink.png",    water: 100, sodium:   0, potassium:   0, phosphorus:   0 },
  { id: "green_tea",      name: "お茶（緑茶）",   category: "drink",         image: "/images/foods/green_tea.png",      water: 100, sodium:   0, potassium:  27, phosphorus:   2 },
  { id: "barley_tea",     name: "麦茶",           category: "drink",         image: "/images/foods/barley_tea.png",     water: 100, sodium:   1, potassium:   6, phosphorus:   2 },
  { id: "black_tea",      name: "紅茶",           category: "drink",         image: "/images/foods/black_tea.png",      water: 100, sodium:   1, potassium:   8, phosphorus:   2 },
  { id: "coffee",         name: "コーヒー",       category: "drink",         image: "/images/foods/coffee.png",         water:  99, sodium:   1, potassium:  65, phosphorus:   7 },
  { id: "milk_latte",     name: "カフェラテ",     category: "drink",         image: "/images/foods/milk_latte.png",     water:  89, sodium:  50, potassium: 150, phosphorus:  90 },
  { id: "cocoa",          name: "ココア（調製）", category: "drink",         image: "/images/foods/cocoa.png",          water:  87, sodium:  55, potassium: 220, phosphorus: 100 },
  { id: "soy_milk",       name: "豆乳（無調整）", category: "drink",         image: "/images/foods/soy_milk.png",       water:  91, sodium:  51, potassium: 190, phosphorus:  44 },
  { id: "orange_juice",   name: "オレンジジュース（100%）", category: "drink", image: "/images/foods/orange_juice.png", water: 89,  sodium:   1, potassium: 200, phosphorus:  13 },
  { id: "fruit_juice",    name: "100%果汁ジュース", category: "drink",       image: "/images/foods/fruit_juice.png",    water:  88, sodium:   2, potassium: 180, phosphorus:  12 },
  { id: "vegetable_juice",name: "野菜ジュース",   category: "drink",         image: "/images/foods/vegetable_juice.png",water: 94,  sodium: 120, potassium: 250, phosphorus:  15 },
  { id: "sports_drink",   name: "スポーツドリンク",category: "drink",        image: "/images/foods/sports_drink.png",   water:  94, sodium:  49, potassium:  20, phosphorus:   4 },
  { id: "cola",           name: "コーラ",         category: "drink",         image: "/images/foods/cola.png",           water:  89, sodium:   4, potassium:   2, phosphorus:  12 },
  { id: "carbonated_juice",name:"炭酸ジュース",   category: "drink",         image: "/images/foods/carbonated_juice.png",water: 90, sodium:   5, potassium:  10, phosphorus:   5 },
  { id: "beer",           name: "ビール",         category: "drink",         image: "/images/foods/beer.png",           water:  93, sodium:   4, potassium:  34, phosphorus:  15 },
  { id: "sake",           name: "日本酒",         category: "drink",         image: "/images/foods/sake.png",           water:  80, sodium:   2, potassium:   5, phosphorus:   5 },
  { id: "shochu",         name: "焼酎",           category: "drink",         image: "/images/foods/shochu.png",         water:  72, sodium:   1, potassium:   1, phosphorus:   1 },
  { id: "wine_red",       name: "赤ワイン",       category: "drink",         image: "/images/foods/wine_red.png",       water:  88, sodium:   4, potassium: 110, phosphorus:  15 },
  { id: "wine_white",     name: "白ワイン",       category: "drink",         image: "/images/foods/wine_white.png",     water:  88, sodium:   3, potassium:  60, phosphorus:  13 },
  { id: "whisky",         name: "ウイスキー",     category: "drink",         image: "/images/foods/whisky.png",         water:  60, sodium:   1, potassium:   1, phosphorus:   1 },

  // ── meat 肉 ────────────────────────────────────────────────
  { id: "chicken_b",      name: "鶏むね肉",       category: "meat",          image: "/images/foods/chicken_b.png",      water: 74,  sodium:  60, potassium: 330, phosphorus: 220 },
  { id: "chicken_t",      name: "鶏もも肉",       category: "meat",          image: "/images/foods/chicken_t.png",      water: 72,  sodium:  70, potassium: 290, phosphorus: 200 },
  { id: "sasami",         name: "鶏ささみ",       category: "meat",          image: "/images/foods/sasami.png",         water: 75,  sodium:  40, potassium: 320, phosphorus: 210 },
  { id: "chicken_wing",   name: "手羽元",         category: "meat",          image: "/images/foods/chicken_wing.png",   water: 68,  sodium:  85, potassium: 250, phosphorus: 160 },
  { id: "liver_chicken",  name: "鶏レバー",       category: "meat",          image: "/images/foods/liver_chicken.png",  water: 75,  sodium:  85, potassium: 330, phosphorus: 300 },
  { id: "duck",           name: "鴨肉",           category: "meat",          image: "/images/foods/duck.png",           water: 65,  sodium:  67, potassium: 280, phosphorus: 170 },
  { id: "pork_loin",      name: "豚ロース",       category: "meat",          image: "/images/foods/pork_loin.png",      water: 63,  sodium:  60, potassium: 290, phosphorus: 200 },
  { id: "pork_belly",     name: "豚バラ",         category: "meat",          image: "/images/foods/pork_belly.png",     water: 49,  sodium:  50, potassium: 230, phosphorus: 130 },
  { id: "pork_shoulder",  name: "豚肩ロース",     category: "meat",          image: "/images/foods/pork_shoulder.png",  water: 64,  sodium:  65, potassium: 310, phosphorus: 195 },
  { id: "liver_pork",     name: "豚レバー",       category: "meat",          image: "/images/foods/liver_pork.png",     water: 71,  sodium:  55, potassium: 290, phosphorus: 340 },
  { id: "beef",           name: "牛もも肉",       category: "meat",          image: "/images/foods/beef.png",           water: 68,  sodium:  60, potassium: 290, phosphorus: 175 },
  { id: "beef_belly",     name: "牛バラ",         category: "meat",          image: "/images/foods/beef_belly.png",     water: 54,  sodium:  55, potassium: 230, phosphorus: 130 },
  { id: "minced",         name: "ひき肉（合い挽き）", category: "meat",      image: "/images/foods/minced.png",         water: 61,  sodium:  70, potassium: 280, phosphorus: 160 },
  { id: "lamb",           name: "ラム肉",         category: "meat",          image: "/images/foods/lamb.png",           water: 68,  sodium:  70, potassium: 280, phosphorus: 160 },

  // ── fish 魚介 ──────────────────────────────────────────────
  { id: "salmon",         name: "さけ（生）",     category: "fish",          image: "/images/foods/salmon.png",         water: 72,  sodium:  66, potassium: 350, phosphorus: 240 },
  { id: "salmon_salt",    name: "塩さけ",         category: "fish",          image: "/images/foods/salmon_salt.png",    water: 65,  sodium: 700, potassium: 320, phosphorus: 230 },
  { id: "tuna",           name: "まぐろ",         category: "fish",          image: "/images/foods/tuna.png",           water: 70,  sodium:  43, potassium: 380, phosphorus: 270 },
  { id: "mackerel",       name: "さば",           category: "fish",          image: "/images/foods/mackerel.png",       water: 62,  sodium: 110, potassium: 330, phosphorus: 220 },
  { id: "aji",            name: "あじ",           category: "fish",          image: "/images/foods/aji.png",            water: 75,  sodium: 120, potassium: 320, phosphorus: 200 },
  { id: "iwashi",         name: "いわし",         category: "fish",          image: "/images/foods/iwashi.png",         water: 67,  sodium: 150, potassium: 290, phosphorus: 230 },
  { id: "buri",           name: "ぶり",           category: "fish",          image: "/images/foods/buri.png",           water: 59,  sodium:  65, potassium: 380, phosphorus: 130 },
  { id: "tai",            name: "たい",           category: "fish",          image: "/images/foods/tai.png",            water: 75,  sodium:  55, potassium: 340, phosphorus: 220 },
  { id: "cod",            name: "たら",           category: "fish",          image: "/images/foods/cod.png",            water: 81,  sodium: 110, potassium: 350, phosphorus: 230 },
  { id: "flatfish",       name: "ひらめ",         category: "fish",          image: "/images/foods/flatfish.png",       water: 77,  sodium:  95, potassium: 440, phosphorus: 230 },
  { id: "shrimp",         name: "えび",           category: "fish",          image: "/images/foods/shrimp.png",         water: 79,  sodium: 170, potassium: 230, phosphorus: 200 },
  { id: "squid",          name: "いか",           category: "fish",          image: "/images/foods/squid.png",          water: 80,  sodium: 200, potassium: 290, phosphorus: 250 },
  { id: "octopus",        name: "たこ",           category: "fish",          image: "/images/foods/octopus.png",        water: 81,  sodium: 280, potassium: 290, phosphorus: 160 },
  { id: "oyster",         name: "かき（牡蠣）",   category: "fish",          image: "/images/foods/oyster.png",         water: 85,  sodium: 520, potassium: 190, phosphorus: 100 },
  { id: "scallop",        name: "ほたて",         category: "fish",          image: "/images/foods/scallop.png",        water: 83,  sodium: 120, potassium: 310, phosphorus: 160 },
  { id: "canned_mackerel",name: "さば缶（水煮）", category: "fish",          image: "/images/foods/canned_mackerel.png",water: 70,  sodium: 470, potassium: 270, phosphorus: 230 },
  { id: "canned_tuna",    name: "ツナ缶（水煮）", category: "fish",          image: "/images/foods/canned_tuna.png",    water: 72,  sodium: 330, potassium: 230, phosphorus: 180 },
  { id: "dried_fish",     name: "ひもの（あじ）", category: "fish",          image: "/images/foods/dried_fish.png",     water: 50,  sodium: 1200,potassium: 350, phosphorus: 250 },

  // ── dairy_egg_soy 卵・大豆・乳製品 ────────────────────────
  { id: "egg",            name: "卵",             category: "dairy_egg_soy", image: "/images/foods/egg.png",            water: 76,  sodium: 140, potassium: 130, phosphorus: 180 },
  { id: "tofu_m",         name: "豆腐（木綿）",   category: "dairy_egg_soy", image: "/images/foods/tofu_m.png",         water: 87,  sodium:   5, potassium: 110, phosphorus: 110 },
  { id: "tofu_k",         name: "絹豆腐",         category: "dairy_egg_soy", image: "/images/foods/tofu_k.png",         water: 89,  sodium:   5, potassium: 140, phosphorus:  88 },
  { id: "natto",          name: "納豆",           category: "dairy_egg_soy", image: "/images/foods/natto.png",          water: 60,  sodium:   2, potassium: 660, phosphorus: 190 },
  { id: "abura_age",      name: "油揚げ",         category: "dairy_egg_soy", image: "/images/foods/abura_age.png",      water: 39,  sodium:   1, potassium: 150, phosphorus: 170 },
  { id: "atsuage",        name: "厚揚げ",         category: "dairy_egg_soy", image: "/images/foods/atsuage.png",        water: 63,  sodium:   5, potassium: 120, phosphorus: 150 },
  { id: "ganmodoki",      name: "がんもどき",     category: "dairy_egg_soy", image: "/images/foods/ganmodoki.png",      water: 64,  sodium:   1, potassium: 140, phosphorus: 180 },
  { id: "edamame",        name: "枝豆",           category: "dairy_egg_soy", image: "/images/foods/edamame.png",        water: 72,  sodium:   1, potassium: 490, phosphorus: 170 },
  { id: "soy_beans",      name: "大豆（ゆで）",   category: "dairy_egg_soy", image: "/images/foods/soy_beans.png",      water: 66,  sodium:   1, potassium: 530, phosphorus: 190 },
  { id: "milk",           name: "牛乳",           category: "dairy_egg_soy", image: "/images/foods/milk.png",           water: 87,  sodium:  40, potassium: 150, phosphorus:  90 },
  { id: "cheese",         name: "チーズ（プロセス）", category: "dairy_egg_soy", image: "/images/foods/cheese.png",     water: 45,  sodium: 800, potassium:  90, phosphorus: 630 },
  { id: "yogurt",         name: "ヨーグルト",     category: "dairy_egg_soy", image: "/images/foods/yogurt.png",         water: 87,  sodium:  40, potassium: 170, phosphorus: 100 },

  // ── vegetable 野菜・果物 ───────────────────────────────────
  { id: "cabbage",        name: "キャベツ",       category: "vegetable",     image: "/images/foods/cabbage.png",        water: 93,  sodium:   5, potassium: 200, phosphorus:  27 },
  { id: "cucumber",       name: "きゅうり",       category: "vegetable",     image: "/images/foods/cucumber.png",       water: 95,  sodium:   1, potassium: 200, phosphorus:  36 },
  { id: "tomato",         name: "トマト",         category: "vegetable",     image: "/images/foods/tomato.png",         water: 94,  sodium:   7, potassium: 210, phosphorus:  26 },
  { id: "broccoli",       name: "ブロッコリー",   category: "vegetable",     image: "/images/foods/broccoli.png",       water: 89,  sodium:  14, potassium: 360, phosphorus:  89 },
  { id: "lettuce",        name: "レタス",         category: "vegetable",     image: "/images/foods/lettuce.png",        water: 96,  sodium:   4, potassium: 200, phosphorus:  22 },
  { id: "moyashi",        name: "もやし",         category: "vegetable",     image: "/images/foods/moyashi.png",        water: 95,  sodium:   2, potassium:  69, phosphorus:  51 },
  { id: "eggplant",       name: "なす",           category: "vegetable",     image: "/images/foods/eggplant.png",       water: 93,  sodium:   0, potassium: 220, phosphorus:  30 },
  { id: "green_pepper",   name: "ピーマン",       category: "vegetable",     image: "/images/foods/green_pepper.png",   water: 93,  sodium:   1, potassium: 190, phosphorus:  22 },
  { id: "daikon",         name: "大根",           category: "vegetable",     image: "/images/foods/daikon.png",         water: 95,  sodium:  16, potassium: 230, phosphorus:  18 },
  { id: "onion",          name: "玉ねぎ",         category: "vegetable",     image: "/images/foods/onion.png",          water: 90,  sodium:   2, potassium: 150, phosphorus:  31 },
  { id: "carrot",         name: "にんじん",       category: "vegetable",     image: "/images/foods/carrot.png",         water: 89,  sodium:  30, potassium: 270, phosphorus:  26 },
  { id: "pumpkin",        name: "かぼちゃ",       category: "vegetable",     image: "/images/foods/pumpkin.png",        water: 87,  sodium:   1, potassium: 450, phosphorus:  43 },
  { id: "potato",         name: "じゃがいも",     category: "vegetable",     image: "/images/foods/potato.png",         water: 81,  sodium:   1, potassium: 410, phosphorus:  47 },
  { id: "sweet_potato",   name: "さつまいも",     category: "vegetable",     image: "/images/foods/sweet_potato.png",   water: 66,  sodium:   1, potassium: 480, phosphorus:  47 },
  { id: "spinach",        name: "ほうれん草",     category: "vegetable",     image: "/images/foods/spinach.png",        water: 92,  sodium:  16, potassium: 690, phosphorus:  47 },
  { id: "komatsuna",      name: "小松菜",         category: "vegetable",     image: "/images/foods/komatsuna.png",      water: 95,  sodium:  15, potassium: 500, phosphorus:  45 },
  { id: "chinese_cabbage",name: "白菜",           category: "vegetable",     image: "/images/foods/chinese_cabbage.png",water: 95,  sodium:   6, potassium: 220, phosphorus:  33 },
  { id: "shiitake",       name: "しいたけ",       category: "vegetable",     image: "/images/foods/shiitake.png",       water: 91,  sodium:   2, potassium: 290, phosphorus:  57 },
  { id: "enoki",          name: "えのき",         category: "vegetable",     image: "/images/foods/enoki.png",          water: 88,  sodium:   2, potassium: 340, phosphorus:  96 },
  { id: "corn",           name: "とうもろこし",   category: "vegetable",     image: "/images/foods/corn.png",           water: 77,  sodium:   1, potassium: 290, phosphorus: 100 },
  { id: "asparagus",      name: "アスパラガス",   category: "vegetable",     image: "/images/foods/asparagus.png",      water: 92,  sodium:   2, potassium: 270, phosphorus:  60 },
  { id: "celery",         name: "セロリ",         category: "vegetable",     image: "/images/foods/celery.png",         water: 95,  sodium:  28, potassium: 410, phosphorus:  39 },
  { id: "burdock",        name: "ごぼう",         category: "vegetable",     image: "/images/foods/burdock.png",        water: 81,  sodium:  18, potassium: 320, phosphorus:  62 },
  { id: "lotus_root",     name: "れんこん",       category: "vegetable",     image: "/images/foods/lotus_root.png",     water: 81,  sodium:  24, potassium: 440, phosphorus:  74 },
  { id: "chives",         name: "にら",           category: "vegetable",     image: "/images/foods/chives.png",         water: 92,  sodium:   1, potassium: 510, phosphorus:  45 },
  { id: "bamboo_shoot",   name: "たけのこ",       category: "vegetable",     image: "/images/foods/bamboo_shoot.png",   water: 89,  sodium:   1, potassium: 520, phosphorus:  62 },
  { id: "okra",           name: "オクラ",         category: "vegetable",     image: "/images/foods/okra.png",           water: 90,  sodium:   4, potassium: 260, phosphorus:  58 },
  { id: "green_beans",    name: "いんげん",       category: "vegetable",     image: "/images/foods/green_beans.png",    water: 91,  sodium:   1, potassium: 260, phosphorus:  41 },
  { id: "shungiku",       name: "春菊",           category: "vegetable",     image: "/images/foods/shungiku.png",       water: 91,  sodium:  73, potassium: 460, phosphorus:  44 },
  { id: "taro",           name: "里いも",         category: "vegetable",     image: "/images/foods/taro.png",           water: 84,  sodium:   1, potassium: 640, phosphorus:  55 },
  { id: "apple",          name: "りんご",         category: "vegetable",     image: "/images/foods/apple.png",          water: 84,  sodium:   0, potassium: 120, phosphorus:  12 },
  { id: "mikan",          name: "みかん",         category: "vegetable",     image: "/images/foods/mikan.png",          water: 87,  sodium:   1, potassium: 150, phosphorus:  15 },
  { id: "pear",           name: "なし",           category: "vegetable",     image: "/images/foods/pear.png",           water: 88,  sodium:   0, potassium: 140, phosphorus:  11 },
  { id: "peach",          name: "もも",           category: "vegetable",     image: "/images/foods/peach.png",          water: 88,  sodium:   0, potassium: 180, phosphorus:  18 },
  { id: "watermelon",     name: "すいか",         category: "vegetable",     image: "/images/foods/watermelon.png",     water: 90,  sodium:   1, potassium: 120, phosphorus:   8 },
  { id: "strawberry",     name: "いちご",         category: "vegetable",     image: "/images/foods/strawberry.png",     water: 90,  sodium:   0, potassium: 170, phosphorus:  31 },
  { id: "grape",          name: "ぶどう",         category: "vegetable",     image: "/images/foods/grape.png",          water: 83,  sodium:   1, potassium: 130, phosphorus:  15 },
  { id: "banana",         name: "バナナ",         category: "vegetable",     image: "/images/foods/banana.png",         water: 75,  sodium:   0, potassium: 360, phosphorus:  27 },
  { id: "kiwi",           name: "キウイ",         category: "vegetable",     image: "/images/foods/kiwi.png",           water: 84,  sodium:   2, potassium: 300, phosphorus:  32 },
  { id: "melon",          name: "メロン",         category: "vegetable",     image: "/images/foods/melon.png",          water: 87,  sodium:   7, potassium: 350, phosphorus:  14 },
  { id: "pineapple",      name: "パイナップル",   category: "vegetable",     image: "/images/foods/pineapple.png",      water: 86,  sodium:   0, potassium: 150, phosphorus:   9 },
  { id: "mango",          name: "マンゴー",       category: "vegetable",     image: "/images/foods/mango.png",          water: 82,  sodium:   1, potassium: 170, phosphorus:  12 },
  { id: "grapefruit",     name: "グレープフルーツ",category: "vegetable",    image: "/images/foods/grapefruit.png",     water: 89,  sodium:   1, potassium: 140, phosphorus:  17 },
  { id: "fig",            name: "いちじく",       category: "vegetable",     image: "/images/foods/fig.png",            water: 84,  sodium:   2, potassium: 170, phosphorus:  23 },
  { id: "persimmon",      name: "柿",             category: "vegetable",     image: "/images/foods/persimmon.png",      water: 83,  sodium:   1, potassium: 170, phosphorus:  14 },
  { id: "lemon",          name: "レモン",         category: "vegetable",     image: "/images/foods/lemon.png",          water: 85,  sodium:   4, potassium: 130, phosphorus:  15 },

  // ── seasoning 調味料 ───────────────────────────────────────
  { id: "soy_tbsp",       name: "醤油",           category: "seasoning",     image: "/images/foods/soy_tbsp.png",       water: 67,  sodium: 7000,potassium: 390, phosphorus: 170 },
  { id: "miso_tbsp",      name: "みそ",           category: "seasoning",     image: "/images/foods/miso_tbsp.png",      water: 43,  sodium: 4200,potassium: 380, phosphorus: 170 },
  { id: "salt_tsp",       name: "塩",             category: "seasoning",     image: "/images/foods/salt_tsp.png",       water:  0,  sodium:39000,potassium: 100, phosphorus:   0 },
  { id: "mayonnaise",     name: "マヨネーズ",     category: "seasoning",     image: "/images/foods/mayonnaise.png",     water: 15,  sodium: 860, potassium:  15, phosphorus:  30 },
  { id: "ketchup",        name: "ケチャップ",     category: "seasoning",     image: "/images/foods/ketchup.png",        water: 66,  sodium: 1200,potassium: 420, phosphorus:  40 },
  { id: "worcestershire", name: "ウスターソース", category: "seasoning",     image: "/images/foods/worcestershire.png", water: 58,  sodium: 1700,potassium: 390, phosphorus:  50 },
  { id: "vinegar",        name: "酢（米酢）",     category: "seasoning",     image: "/images/foods/vinegar.png",        water: 93,  sodium:   6, potassium:   4, phosphorus:   6 },
  { id: "butter",         name: "バター",         category: "seasoning",     image: "/images/foods/butter.png",         water: 16,  sodium: 750, potassium:  28, phosphorus:  17 },
  { id: "dressing",       name: "ドレッシング",   category: "seasoning",     image: "/images/foods/dressing.png",       water: 50,  sodium: 900, potassium:  60, phosphorus:  30 },
  { id: "cream",          name: "生クリーム",     category: "seasoning",     image: "/images/foods/cream.png",          water: 57,  sodium:  40, potassium:  90, phosphorus:  70 },

  // ── prepared_food 調理済み・惣菜 ──────────────────────────
  { id: "karaage",        name: "から揚げ",       category: "prepared_food", image: "/images/foods/karaage.png",        water: 54,  sodium: 400, potassium: 290, phosphorus: 230 },
  { id: "yakizakana",     name: "焼き魚",         category: "prepared_food", image: "/images/foods/yakizakana.png",     water: 65,  sodium: 200, potassium: 320, phosphorus: 220 },
  { id: "hamburger",      name: "ハンバーグ",     category: "prepared_food", image: "/images/foods/hamburger.png",      water: 55,  sodium: 500, potassium: 280, phosphorus: 160 },
  { id: "tonkatsu",       name: "とんかつ",       category: "prepared_food", image: "/images/foods/tonkatsu.png",       water: 45,  sodium: 450, potassium: 280, phosphorus: 180 },
  { id: "croquette",      name: "コロッケ",       category: "prepared_food", image: "/images/foods/croquette.png",      water: 52,  sodium: 420, potassium: 320, phosphorus:  90 },
  { id: "tamagoyaki",     name: "玉子焼き",       category: "prepared_food", image: "/images/foods/tamagoyaki.png",     water: 72,  sodium: 350, potassium: 130, phosphorus: 160 },
  { id: "tempura_shrimp", name: "エビ天ぷら",     category: "prepared_food", image: "/images/foods/tempura_shrimp.png", water: 60,  sodium: 350, potassium: 200, phosphorus: 200 },
  { id: "tempura_veg",    name: "野菜天ぷら",     category: "prepared_food", image: "/images/foods/tempura_veg.png",    water: 55,  sodium: 200, potassium: 250, phosphorus:  60 },
  { id: "yakitori",       name: "焼き鳥",         category: "prepared_food", image: "/images/foods/yakitori.png",       water: 60,  sodium: 550, potassium: 280, phosphorus: 190 },
  { id: "niku_jaga",      name: "肉じゃが",       category: "prepared_food", image: "/images/foods/niku_jaga.png",      water: 82,  sodium: 450, potassium: 300, phosphorus: 100 },
  { id: "nikujaga",       name: "煮物（根菜）",   category: "prepared_food", image: "/images/foods/nikujaga.png",       water: 83,  sodium: 420, potassium: 320, phosphorus:  70 },
  { id: "chawanmushi",    name: "茶碗蒸し",       category: "prepared_food", image: "/images/foods/chawanmushi.png",    water: 88,  sodium: 400, potassium: 100, phosphorus:  90 },
  { id: "gyudon",         name: "牛丼",           category: "prepared_food", image: "/images/foods/gyudon.png",         water: 68,  sodium: 500, potassium: 200, phosphorus: 120 },
  { id: "oyakodon",       name: "親子丼",         category: "prepared_food", image: "/images/foods/oyakodon.png",       water: 66,  sodium: 480, potassium: 180, phosphorus: 130 },
  { id: "sushi_nigiri",   name: "にぎり寿司",     category: "prepared_food", image: "/images/foods/sushi_nigiri.png",   water: 65,  sodium: 250, potassium:  80, phosphorus:  80 },
  { id: "mapo_tofu",      name: "麻婆豆腐",       category: "prepared_food", image: "/images/foods/mapo_tofu.png",      water: 85,  sodium: 550, potassium: 200, phosphorus: 100 },
  { id: "fried_rice",     name: "チャーハン",     category: "prepared_food", image: "/images/foods/fried_rice.png",     water: 55,  sodium: 350, potassium:  70, phosphorus:  60 },
  { id: "curry_rice",     name: "カレーライス",   category: "prepared_food", image: "/images/foods/curry_rice.png",     water: 65,  sodium: 400, potassium: 120, phosphorus:  50 },
  { id: "ramen",          name: "ラーメン",       category: "prepared_food", image: "/images/foods/ramen.png",          water: 88,  sodium: 800, potassium: 100, phosphorus:  50 },
  { id: "yakisoba",       name: "焼きそば",       category: "prepared_food", image: "/images/foods/yakisoba.png",       water: 60,  sodium: 500, potassium:  80, phosphorus:  55 },
  { id: "okonomiyaki",    name: "お好み焼き",     category: "prepared_food", image: "/images/foods/okonomiyaki.png",    water: 62,  sodium: 450, potassium: 120, phosphorus:  90 },
  { id: "gyoza_fried",    name: "焼き餃子",       category: "prepared_food", image: "/images/foods/gyoza_fried.png",    water: 55,  sodium: 500, potassium: 150, phosphorus:  90 },
  { id: "pizza",          name: "ピザ",           category: "prepared_food", image: "/images/foods/pizza.png",          water: 45,  sodium: 550, potassium: 120, phosphorus: 130 },
  { id: "zosui",          name: "雑炊",           category: "prepared_food", image: "/images/foods/zosui.png",          water: 86,  sodium: 300, potassium:  50, phosphorus:  25 },
  { id: "ham",            name: "ハム",           category: "prepared_food", image: "/images/foods/ham.png",            water: 71,  sodium: 1100,potassium: 280, phosphorus: 230 },
  { id: "wiener",         name: "ウインナー",     category: "prepared_food", image: "/images/foods/wiener.png",         water: 55,  sodium: 800, potassium: 210, phosphorus: 160 },
  { id: "sausage",        name: "ソーセージ",     category: "prepared_food", image: "/images/foods/sausage.png",        water: 54,  sodium: 810, potassium: 200, phosphorus: 170 },
  { id: "bacon",          name: "ベーコン",       category: "prepared_food", image: "/images/foods/bacon.png",          water: 46,  sodium: 700, potassium: 270, phosphorus: 180 },
  { id: "kamaboko",       name: "かまぼこ",       category: "prepared_food", image: "/images/foods/kamaboko.png",       water: 75,  sodium: 1000,potassium: 160, phosphorus:  90 },
  { id: "chikuwa",        name: "ちくわ",         category: "prepared_food", image: "/images/foods/chikuwa.png",        water: 74,  sodium: 840, potassium: 110, phosphorus:  90 },
  { id: "hanpen",         name: "はんぺん",       category: "prepared_food", image: "/images/foods/hanpen.png",         water: 77,  sodium: 590, potassium: 160, phosphorus:  95 },
  { id: "satsuma_age",    name: "さつま揚げ",     category: "prepared_food", image: "/images/foods/satsuma_age.png",    water: 65,  sodium: 580, potassium: 110, phosphorus:  90 },
  { id: "instant_noodles",name: "インスタント麺", category: "prepared_food", image: "/images/foods/instant_noodles.png",water: 65,  sodium: 1500,potassium:  75, phosphorus:  70 },
];

export function getFoodRisk(food: Food) {
  return {
    sodium:    food.sodium    > 300,
    potassium: food.potassium > 300,
  };
}
