import type { JudgeResult, MealItem } from "./judge";

export type DetailedAdvice = {
  summary: string;
  nutrients: {
    sodium?: string;
    potassium?: string;
    phosphorus?: string;
    water?: string;
  };
  combinations: string[];
  nextSteps: string[];
  lowIntakeNote?: string;
  disclaimer: string;
};

// ── 食品IDセット（組み合わせ検出用）────────────────────────
const SOUP_IDS = new Set([
  "miso_soup", "tonjiru", "clear_soup", "clear_soup_tofu", "osuimono",
  "consomme_soup", "chicken_broth_soup", "egg_drop_soup", "egg_soup",
  "harusame_soup", "kenchin_soup", "minestrone", "clam_chowder", "potage",
  "corn_soup", "vegetable_soup",
]);
const PICKLE_IDS = new Set([
  "takuan", "shibazuke", "umeboshi", "kimchi", "fukujinzuke",
  "nozawana", "kyuri_tsuke", "hakusai_tsuke",
]);
const HIGH_SODIUM_PROCESSED = new Set([
  "salted_salmon", "bacon", "sausage", "bento", "yakisoba", "ramen",
]);
const DAIRY_IDS = new Set([
  "milk", "low_fat_milk", "cheese", "yogurt", "drinking_yogurt",
  "cafe_au_lait", "milk_tea",
]);
const HIGH_K_IDS = new Set([
  "spinach", "potato", "sweet_potato", "kabocha", "natto", "edamame",
  "tomato_juice", "vegetable_juice", "veggie_smoothie", "wakame",
]);

// ── メイン関数 ────────────────────────────────────────────
export function generateDetailedAdvice(
  result: JudgeResult,
  items: MealItem[],
): DetailedAdvice {
  const { overall, sodium, potassium, phosphorus, water } = result;
  const ids = new Set(items.map((i) => i.food.id));

  // ── 全体のひとこと ──────────────────────────────────────
  let summary: string;
  if (overall === "ok") {
    summary = "今回の食事はよいバランスです。この内容を参考に、次の食事も記録してみましょう。";
  } else if (overall === "caution") {
    const issues: string[] = [];
    if (sodium.status    === "caution") issues.push("塩分");
    if (potassium.status === "caution") issues.push("カリウム");
    if (phosphorus.status === "caution") issues.push("リン");
    if (water.status     === "caution") issues.push("水分");
    summary = `${issues.join("・")}が少し多めでした。今回の内容を参考に、次の食事で少し意識するだけで十分です。`;
  } else {
    const ngList: string[] = [];
    if (sodium.status    === "ng") ngList.push("塩分");
    if (potassium.status === "ng") ngList.push("カリウム");
    if (phosphorus.status === "ng") ngList.push("リン");
    if (water.status     === "ng") ngList.push("水分");
    summary = `${ngList.join("・")}に気をつけたい内容でした。一度で全部直そうとせず、まず一つだけ意識してみましょう。`;
  }

  // ── 栄養素ごとのコメント ────────────────────────────────
  const nutrients: DetailedAdvice["nutrients"] = {};

  if (sodium.status === "ng") {
    nutrients.sodium =
      `塩分が${sodium.value}mgと多めでした。塩分が増えるとのどが渇き、飲水量や透析間の体重が増えやすくなります。` +
      "汁物を半分残す、調味料を少し控えるだけで次の食事から調整できます。";
  } else if (sodium.status === "caution") {
    nutrients.sodium =
      `塩分が${sodium.value}mgとやや多めでした。` +
      "汁物を少し残す、漬物を小皿に抑えるなど、小さな工夫で調整できます。";
  }

  if (potassium.status === "ng") {
    nutrients.potassium =
      `カリウムが${potassium.value}mgと多めでした。` +
      "いも類・果物・野菜ジュース・海藻類が重なりやすい組み合わせです。" +
      "野菜はゆでてから食べると、カリウムを30〜40%減らせます（ゆで汁は捨ててください）。";
  } else if (potassium.status === "caution") {
    nutrients.potassium =
      `カリウムが${potassium.value}mgとやや高めでした。` +
      "野菜をゆでこぼすだけで効果的に減らせます。生野菜サラダをおひたしに変えるだけでも違います。";
  }

  if (phosphorus.status === "ng") {
    nutrients.phosphorus =
      `リンが${phosphorus.value}mgと多めでした。` +
      "乳製品・加工肉・練り製品・缶詰が重なると高くなりやすいです。" +
      "リン吸着薬が処方されている場合は、食事と一緒にしっかり服用することが大切です。";
  } else if (phosphorus.status === "caution") {
    nutrients.phosphorus =
      `リンが${phosphorus.value}mgとやや多めでした。` +
      "乳製品や加工食品が続くと重なりやすくなります。";
  }

  if (water.status === "ng") {
    nutrients.water =
      `水分が${water.value}mlと多めでした。` +
      "飲み物だけでなく、汁物・ゼリー・果物にも水分が含まれます。" +
      "一度にまとめて飲むより、少量ずつ分けて摂ると体への負担が軽くなります。";
  } else if (water.status === "caution") {
    nutrients.water =
      `水分が${water.value}mlとやや多めでした。` +
      "汁物やゼリーの水分も合算されていることを意識してみましょう。";
  }

  // ── 組み合わせコメント ──────────────────────────────────
  const combinations: string[] = [];

  const hasSoup    = [...ids].some((id) => SOUP_IDS.has(id));
  const hasPickle  = [...ids].some((id) => PICKLE_IDS.has(id));
  const hasRamen   = ids.has("ramen");
  const hasMiso    = ids.has("miso_soup") || ids.has("tonjiru");
  const hasSaltedSalmon = ids.has("salted_salmon");
  const hasBaconOrSausage = ids.has("bacon") || ids.has("sausage");
  const hasHighSodiumProcessed = [...ids].some((id) => HIGH_SODIUM_PROCESSED.has(id));
  const dairyCount = [...ids].filter((id) => DAIRY_IDS.has(id)).length;
  const highKCount = [...ids].filter((id) => HIGH_K_IDS.has(id)).length;

  if (hasRamen && hasPickle) {
    combinations.push(
      "ラーメンと漬物の組み合わせは塩分が重なりやすいです。ラーメンは汁を残すだけで塩分を大きく減らせます。"
    );
  } else if (hasSoup && hasPickle) {
    combinations.push(
      "汁物と漬物が重なっています。どちらかを控えめにするだけで塩分を調整しやすくなります。"
    );
  }

  if (hasSaltedSalmon && (hasMiso || hasPickle)) {
    combinations.push(
      "塩鮭は塩分が多めの食材です。味噌汁や漬物と組み合わせると塩分が重なりやすいので、汁物を薄めにするか汁を残しましょう。"
    );
  }

  if (hasBaconOrSausage && hasMiso) {
    combinations.push(
      "加工肉（ベーコン・ソーセージ）と味噌汁が重なると塩分とリンが高くなりやすいです。"
    );
  }

  if (hasHighSodiumProcessed && hasPickle && !hasRamen) {
    combinations.push(
      "加工食品と漬物が重なっています。どちらかを控えめにすると塩分を調整しやすいです。"
    );
  }

  if (dairyCount >= 2) {
    combinations.push(
      "乳製品が複数含まれています。重なるとリンが高くなりやすいので、1食に1種類を目安にしましょう。"
    );
  }

  if (highKCount >= 2) {
    combinations.push(
      "カリウムの高い食材（いも類・野菜ジュース・海藻類など）が重なっています。組み合わせに気をつけると安心です。"
    );
  }

  // ── 次の一歩 ────────────────────────────────────────────
  const nextSteps: string[] = [];

  if (sodium.status !== "ok") {
    if (hasRamen) {
      nextSteps.push("ラーメンの汁を半分以上残すことを次回から意識してみましょう。");
    } else if (hasMiso || hasSoup) {
      nextSteps.push("次の食事では汁物を半分残すことを意識してみましょう。");
    } else if (hasPickle) {
      nextSteps.push("漬物は小皿にすると塩分を調整しやすいです。");
    } else {
      nextSteps.push("醤油やソースは小匙で量を確認するようにすると調整しやすくなります。");
    }
  }

  if (potassium.status !== "ok") {
    nextSteps.push(
      "野菜はゆでてから食べましょう。ゆで汁は捨てることでカリウムが減ります。"
    );
  }

  if (phosphorus.status !== "ok") {
    nextSteps.push(
      "乳製品・加工食品の量を少し減らすと、リンを調整しやすくなります。"
    );
  }

  if (water.status !== "ok") {
    nextSteps.push("飲み物はコップ半分を意識すると、水分管理がしやすくなります。");
    if (hasSoup) {
      nextSteps.push("汁物の汁を残すことで、水分と塩分をまとめて減らせます。");
    }
  }

  if (overall === "ok" && nextSteps.length === 0) {
    nextSteps.push("今回のバランスを参考に、引き続き記録を続けましょう。");
  }

  // ── 食事量が少ない場合の注意 ────────────────────────────
  let lowIntakeNote: string | undefined;
  const totalWeight = items.reduce((sum, i) => sum + i.amount, 0);
  if (totalWeight > 0 && totalWeight < 100) {
    lowIntakeNote =
      "食事量が少なめのようです。制限を頑張りすぎていないか、食欲や体調もあわせて確認してみましょう。" +
      "食事量が少ない日が続くと、体力の低下や貧血につながることがあります。";
  }

  const disclaimer =
    "個別の栄養目標や食事管理の詳細は、主治医・透析施設の方針を優先してください。";

  return { summary, nutrients, combinations, nextSteps, lowIntakeNote, disclaimer };
}

// ── 後方互換（storageへの保存用途など）─────────────────────
export function generateAdvice(result: JudgeResult): string {
  if (result.overall === "ok") {
    return "今回の食事はよいバランスです。この調子で続けましょう。";
  }
  const issues: string[] = [];
  if (result.sodium.status    !== "ok") issues.push("塩分");
  if (result.potassium.status !== "ok") issues.push("カリウム");
  if (result.phosphorus.status !== "ok") issues.push("リン");
  if (result.water.status     !== "ok") issues.push("水分");
  return `${issues.join("・")}が多めでした。次の食事で少し意識してみましょう。`;
}

export function generateProfessionalAdvice(result: JudgeResult): string {
  return generateAdvice(result);
}
