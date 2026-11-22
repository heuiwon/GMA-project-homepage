// PAGE 3. AI 단계학습 — 목록
import "../common.js";
import { createButton } from "../components/button.js";
import { createBox } from "../components/box.js";
import { createTag } from "../components/tag.js";
import { countDone, getProgress } from "../utils/progress.js";

const STEPS = [
  { title: "AI 기본 개념 이해", desc: "인공지능과 생성형 AI의 핵심 개념, 기본 용어를 알아봅니다." },
  { title: "AI 사용 방법", desc: "대표적인 AI 서비스를 익히고 대화를 시작하는 방법을 알아봅니다." },
  { title: "효과적인 프롬프트 작성", desc: "원하는 답변을 얻기 위한 요청과 지시문 작성법을 배웁니다." },
  { title: "AI 결과 검증 및 활용", desc: "결과를 비판적으로 확인하고 학습에 알맞게 활용합니다." },
  { title: "안전하고 책임 있는 사용", desc: "개인정보와 저작권을 고려해 AI를 책임감 있게 사용합니다." },
];

const list = document.getElementById("step-list");
const progressCard = document.getElementById("progress-card");
if (list && progressCard) {
  const progress = getProgress();
  const current = STEPS.findIndex((_, index) => progress[index + 1] !== "done");

  STEPS.forEach((step, index) => {
    const number = index + 1;
    const status = progress[number] ?? (index === current ? "doing" : "before");
    const item = document.createElement("li");
    item.className = `step-item step-item--${status === "doing" ? "current" : status === "done" ? "done" : "todo"}`;

    const marker = document.createElement("div");
    marker.className = "step-item__marker";
    const numberEl = document.createElement("span");
    numberEl.className = "step-item__number";
    numberEl.textContent = status === "done" ? "✓" : String(number);
    const line = document.createElement("span");
    line.className = "step-item__line";
    marker.append(numberEl, line);

    const card = createBox();
    card.classList.add("step-item__card");
    const text = document.createElement("div");
    text.className = "step-item__text";
    const label = document.createElement("span");
    label.className = "step-item__label";
    label.textContent = `STEP ${number}`;
    const title = document.createElement("span");
    title.className = "step-item__title";
    title.textContent = step.title;
    const desc = document.createElement("span");
    desc.className = "step-item__desc";
    desc.textContent = step.desc;
    text.append(label, title, desc, createTag(status));
    card.append(text, createButton({ label: status === "done" ? "다시 보기" : "학습하기", variant: status === "doing" ? "primary" : "outline", href: `/pages/learn/step${number}.html` }));
    item.append(marker, card);
    list.append(item);
  });

  const { done, total } = countDone();
  const percent = Math.round((done / total) * 100);
  progressCard.className = "progress-card box box--default";
  const heading = document.createElement("h2");
  heading.className = "progress-card__title";
  heading.textContent = "내 진행률";
  const count = document.createElement("p");
  count.className = "progress-card__count";
  count.textContent = `${done} / ${total} 단계 완료`;
  const bar = document.createElement("div");
  bar.className = "progress-bar";
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-label", "전체 학습 진행률");
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", String(total));
  bar.setAttribute("aria-valuenow", String(done));
  bar.style.setProperty("--progress", `${percent}%`);
  const fill = document.createElement("div");
  fill.className = "progress-bar__fill";
  bar.append(fill);
  const nextStep = Math.min(current < 0 ? total : current + 1, total);
  progressCard.append(heading, count, bar, createButton({ label: done === total ? "다시 학습하기" : "이어서 학습하기", href: `/pages/learn/step${Math.max(1, nextStep)}.html` }));
}
