// PAGE 3. AI 단계학습 — 목록
// TODO: 단계 목록 + 상태 Tag + 내 진행률 표시
import "../common.js";
import { getProgress } from "../utils/progress.js";

import { renderHeader } from "../components/header.js";
import { renderHeader } from "../components/button.js";
import { renderFooter } from "../components/footer.js";

renderHeader();
renderFooter();

// 1. 5단계 학습 데이터 정의
const STEPS = [
  {
    id: 1,
    stepLabel: "Step1",
    title: "AI 기본 개념 이해",
    desc: "AI란 무엇인가? | 생성형 AI와 LLM의 개념 | 기본 용어 이해 등",
    href: "step1.html"
  },
  {
    id: 2,
    stepLabel: "Step2",
    title: "AI 사용 방법",
    desc: "대표 AI 서비스 소개 | 회원가입 및 기본 인터페이스 사용법 등",
    href: "step2.html"
  },
  {
    id: 3,
    stepLabel: "Step3",
    title: "프롬프트 기초",
    desc: "프롬프트란 무엇인가? | 좋은 프롬프트 작성 원칙 | 프롬프트 작성 실습 등",
    href: "step3.html"
  },
  {
    id: 4,
    stepLabel: "Step4",
    title: "AI 결과 검증 및 평가",
    desc: "AI 할루시네이션이란? | AI가 잘못된 정보를 생성하는 이유 등",
    href: "step4.html"
  },
  {
    id: 5,
    stepLabel: "Step5",
    title: "AI 심화 기능 활용",
    desc: "파일 분석 및 데이터 처리 | 이미지 및 콘텐츠 생성 | 웹 검색 연동 등",
    href: "step5.html"
  }
];

// 2. 진행 상태 계산 (utils/progress.js 반환 구조 대응)
const progress = getProgress();
const completedSteps = Array.isArray(progress) ? progress : (progress?.completedSteps || []);
const currentStep = STEPS.find((step) => !completedSteps.includes(step.id)) || STEPS[STEPS.length - 1];

// 3. 좌측 단계 목록 (<ol id="step-list">) 렌더링
const stepListEl = document.querySelector("#step-list");

if (stepListEl) {
  STEPS.forEach((step) => {
    const isCompleted = completedSteps.includes(step.id);
    const isCurrent = !isCompleted && step.id === currentStep.id;

    let statusClass = "is-pending";
    let statusText = "✓ 학습 전";
    let buttonLabel = "학습하기 →";
    let buttonVariant = "outline";

    if (isCompleted) {
      statusClass = "is-completed";
      statusText = "✓ 학습 완료";
      buttonLabel = "다시 보기 →";
      buttonVariant = "outline";
    } else if (isCurrent) {
      statusClass = "is-current";
      statusText = "● 진행 중";
      buttonLabel = "이어서 학습하기 →";
      buttonVariant = "primary";
    }

    // <ol> 내부이므로 <li> 요소 생성
    const li = document.createElement("li");
    li.className = `step-item ${statusClass}`;
    li.innerHTML = `
      <div class="step-item__indicator">
        <span class="step-item__number">${step.id}</span>
        <span class="step-item__line"></span>
      </div>
      <div class="step-item__card">
        <div class="step-item__info">
          <span class="step-item__label">${step.stepLabel}</span>
          <h3 class="step-item__title">${step.title}</h3>
          <p class="step-item__desc">${step.desc}</p>
        </div>
        <div class="step-item__actions">
          <span class="tag tag--${statusClass}">${statusText}</span>
          <div class="step-item__btn-area"></div>
        </div>
      </div>
    `;

    const btnArea = li.querySelector(".step-item__btn-area");
    btnArea.appendChild(
      createButton({
        label: buttonLabel,
        variant: buttonVariant,
        href: step.href
      })
    );

    stepListEl.appendChild(li);
  });
}

// 4. 우측 내 진행률 카드 (<aside id="progress-card">) 렌더링
const progressCardEl = document.querySelector("#progress-card");

if (progressCardEl) {
  const completedCount = completedSteps.length;
  const totalCount = STEPS.length;
  const percent = (completedCount / totalCount) * 100;

  progressCardEl.innerHTML = `
    <h2 class="progress-card__title">내 진행률</h2>
    <div class="progress-card__bar">
      <div class="progress-card__fill" style="width: ${percent}%"></div>
    </div>
    <p class="progress-card__text">${completedCount} / ${totalCount} 완료</p>
    <div class="progress-card__btn-area"></div>
  `;

  const resumeBtnArea = progressCardEl.querySelector(".progress-card__btn-area");
  resumeBtnArea.appendChild(
    createButton({
      label: "이어서 학습하기",
      variant: "primary",
      href: currentStep.href
    })
  );
}