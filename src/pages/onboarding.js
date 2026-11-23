// PAGE 0. 온보딩 — 사용방법 4장 (4번째 장 = AI 윤리 지침)
// - 카드 4장을 만들어 두고, 보이는 1장만 빼고 hidden 처리 (카드 스타일: styles/components/onboarding.css)
// - 공통 컴포넌트: Button(다음 · 시작하기 · 건너뛰기), Box(윤리 지침 목록)
// - 헤더 · 푸터는 common.js 가 그려 줌

import "../common.js";
import { createButton } from "../components/button.js";
import { createBox } from "../components/box.js";

const HOME_URL = "/index.html";
const DONE_KEY = "gma-onboarding-done"; // 온보딩을 끝냈는지 저장 (progress.js 의 gma-progress 와 같은 이름 규칙)

// 카드 내용 
const STEPS = [
  {
    image: "/images/onboarding/guide-(1).png",
    alt: "홈 화면의 AI 단계학습, 학업에 활용하기 메뉴 카드 예시",
    title: "홈에서 원하는 학습을 시작해요",
    desc: [
      "AI가 처음이라면 ‘AI 단계학습’의 시작하기를 눌러 보세요.",
      "바로 활용하고 싶다면 ‘학업에 활용하기’의 둘러보기를 선택해요.",
    ],
  },
  {
    image: "/images/onboarding/guide-(2).png",
    alt: "AI 단계별 학습 목록에서 2단계 AI 사용 방법이 진행 중으로 표시된 예시",
    title: "AI를 5단계로 차근차근 배워요",
    desc: [
      "AI 개념부터 활용까지 5단계를 순서대로 학습해 보세요.",
      "완료 표시와 내 진행률을 확인하고, 이어서 학습할 수 있어요.",
    ],
  },
  {
    image: "/images/onboarding/guide-(3).png",
    alt: "학업에 활용하기의 분야별 카드와 바로가기 버튼 예시",
    title: "학업에 필요한 AI 활용법을 찾아요",
    desc: [
      "학습·과제·발표 중 필요한 상황을 골라 활용법을 확인해요.",
      "예시 프롬프트를 복사해 바꾸고, 추천 AI에서 활용해 보세요.",
    ],
  },
  {
    image: "/images/onboarding/guide-(4).png",
    alt: "방패와 체크 표시로 표현한 책임 있는 AI 사용 안내 이미지",
    title: "AI, 책임 있게 함께 사용해요",
    rules: [
      { label: "표절 예방", text: "생성된 결과물은 그대로 제출하지 말고, 반드시 직접 검증 과정을 거쳐 활용하세요." },
      { label: "개인정보 보호", text: "개인정보 및 미공개 학술 데이터 등 민감한 정보는 AI에 입력하지 않도록 주의하세요." },
      { label: "AI 사용 사실 공개", text: "필요시 AI를 활용했음을 반드시 명시해야 합니다." },
      { label: "설정 확인", text: "사용 중인 AI 도구의 개인정보 보호 및 데이터 활용 설정을 검토하세요." },
    ],
  },
];

const total = STEPS.length;
const main = document.getElementById("main");
const cards = STEPS.map((step, index) => createCard(step, index));

main.append(...cards);
showStep(0);

// ---------- 카드 ----------

function createCard(step, index) {
  const isLast = index === total - 1;
  const card = createElement("section", "onboarding-card");
  card.setAttribute("aria-label", `사용방법 ${index + 1} / ${total}`);

  // 위: "사용방법 1 / 4" + 건너뛰기 (마지막 장에는 없음)
  const top = createElement("div", "onboarding-card__top");
  top.append(createElement("span", "onboarding-card__count", `사용방법 ${index + 1} / ${total}`));
  if (!isLast) {
    const skip = createButton({ label: "건너뛰기", variant: "text", href: HOME_URL, onClick: markDone });
    skip.classList.add("btn--lg");
    top.append(skip);
  }

  // 가운데: 이미지 + 제목 + (설명 | 윤리 지침)
  const image = createElement("div", "onboarding-card__image");
  const img = document.createElement("img");
  img.src = step.image;
  img.alt = step.alt;
  image.append(img);

  const title = createElement("h2", "onboarding-card__title", step.title);

  // 아래: 페이지 점 + 다음 / 시작하기
  const bottom = createElement("div", "onboarding-card__bottom");
  const next = isLast
    ? createButton({ label: "시작하기", variant: "primary", href: HOME_URL, onClick: markDone })
    : createButton({ label: "다음", variant: "primary", onClick: () => showStep(index + 1, true) });
  next.classList.add("btn--lg");
  bottom.append(createDots(index), next);

  card.append(top, image, title, step.rules ? createRules(step.rules) : createDesc(step.desc), bottom);
  return card;
}

function createDesc(lines) {
  const desc = createElement("p", "onboarding-card__desc");
  lines.forEach((line, i) => {
    if (i > 0) desc.append(document.createElement("br"));
    desc.append(line);
  });
  return desc;
}

// 윤리 지침 4가지 — 공통 Box(light) 안에 "라벨 | 설명" 을 한 줄씩
function createRules(rules) {
  const items = rules.map(({ label, text }) => {
    const p = document.createElement("p");
    p.append(
      createElement("strong", "", label),
      createElement("span", "onboarding-card__rule-divider", "|"),
      text
    );
    return p;
  });
  const box = createBox({ variant: "light", children: items });
  box.classList.add("onboarding-card__rules");
  return box;
}

// 페이지 표시(점): 현재 장은 길쭉하게, 누르면 그 장으로 이동
function createDots(current) {
  const dots = createElement("div", "page-dots");
  STEPS.forEach((_, i) => {
    const dot = createElement("button", "page-dots__dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `사용방법 ${i + 1}번으로 이동`);
    if (i === current) {
      dot.classList.add("is-active");
      dot.setAttribute("aria-current", "step");
    }
    dot.addEventListener("click", () => showStep(i, true));
    dots.append(dot);
  });
  return dots;
}

// ---------- 동작 ----------

// index 번째 카드만 보이게. moveFocus 가 true 면 새 카드의 주요 버튼으로 키보드 포커스 이동
function showStep(index, moveFocus = false) {
  cards.forEach((card, i) => {
    card.hidden = i !== index;
  });
  if (moveFocus) cards[index].querySelector(".btn--primary")?.focus();
}

// 건너뛰기 · 시작하기 → 온보딩 완료 표시 (이동은 버튼의 href 가 처리)
function markDone() {
  try {
    localStorage.setItem(DONE_KEY, "true");
  } catch {
    /* 저장 실패 시 무시 */
  }
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}