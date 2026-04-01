import type { JudgeResult } from "./judge";

export function generateAdvice(result: JudgeResult): string {
  const { overall, sodium, potassium, phosphorus } = result;

  if (overall === "ok") {
    return "今日の食事はバランスが良いですね。このまま無理せず続けていきましょう。";
  }

  const ngIssues: string[] = [];
  const cautionIssues: string[] = [];
  if (sodium?.status === "ng")       ngIssues.push("塩分");
  else if (sodium?.status === "caution") cautionIssues.push("塩分");
  if (potassium?.status === "ng")    ngIssues.push("カリウム");
  else if (potassium?.status === "caution") cautionIssues.push("カリウム");
  if (phosphorus?.status === "ng")   ngIssues.push("リン");
  else if (phosphorus?.status === "caution") cautionIssues.push("リン");

  const allIssues = [...ngIssues, ...cautionIssues];

  if (overall === "ng") {
    if (allIssues.length >= 2) {
      return "焦らず、次の食事では一つだけ気をつけることから始めてみましょう。あなたの努力は必ず体に届いています。";
    }
    if (ngIssues.includes("塩分")) {
      return "塩分がかなり多い食事です。汁物を残したり、調味料を控えめにすることで体への負担を減らせます。次の食事で意識してみてください。";
    }
    if (ngIssues.includes("カリウム")) {
      return "カリウムが高めです。バナナ・いも類・生野菜は控え、野菜は必ず茹でてから食べるようにしましょう。";
    }
    if (ngIssues.includes("リン")) {
      return "リンが高めです。乳製品・加工食品・ナッツ類には特に多く含まれます。食材を選ぶときに少し意識してみてください。";
    }
  }

  // caution
  if (allIssues.length >= 2) {
    return "いくつかの栄養素が少し多めです。一度に全部直そうとせず、まず塩分から少しずつ意識してみましょう。";
  }
  if (cautionIssues.includes("塩分") || ngIssues.includes("塩分")) {
    return "塩分が少し多めです。汁物を残したり、調味料を控えめにすると体がぐっと楽になりますよ。";
  }
  if (cautionIssues.includes("カリウム") || ngIssues.includes("カリウム")) {
    return "カリウムが少し高めです。野菜は茹でこぼしをするだけでぐっと減らせます。";
  }
  if (cautionIssues.includes("リン") || ngIssues.includes("リン")) {
    return "リンが少し多めです。加工食品や乳製品を少し控えると改善しやすくなります。";
  }

  return "今日も記録できました。続けることが大切です。";
}
