// PAGE 3. AI 단계학습 — 목록
// TODO: 단계 목록 + 상태 Tag + 내 진행률 표시
import "../common.js";
import { getProgress, countDone } from "../utils/progress.js";

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

renderHeader();
renderFooter();

function updateLearnProgress() {
  const progress = getProgress();
  const {done, total} = countDone();
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const stepItems = document.querySelectorAll("#step-list .step-item");

  // 아직 완료하지 않은 첫 번째 단계 찾기 (모두 완료 시 5단계)
  let nextStep = 1;
  for (let i = 1; i <= total; i++) {
    if (progress[i] === "doing") {
      nextStep = i;
      break;
    }
    if (progress[nextStep] === "done") {
        for (let i = 1; i <= total; i++) {
            if (progress[i] !== "done") {
                nextStep = i;
                break;
            }
            if (i === total) nextStep = total;
        }
    }
  }

  // 우측 진행률 카드 업데이트
  const bar = document.getElementById("progress-bar");
  const fill = document.getElementById("progress-fill");
  const countText = document.getElementById("progress-count");
  const actionBtn = document.getElementById("progress-btn");

  if (bar && fill && countText && actionBtn) {
    bar.setAttribute('aria-valuenow', String(percent));
    fill.style.width = `${percent}%`;
    countText.textContent = `${done} / ${total} 완료`;

    if (done === 0 && !Object.values(progress).includes("doing")) {
      actionBtn.textContent = "학습 시작하기";
      actionBtn.href = "./step1.html";
    } else if (done === total) {
      actionBtn.textContent = "처음부터 다시 보기";
      actionBtn.href = "./step1.html";
    } else {
      actionBtn.textContent = "이어서 학습하기";
      actionBtn.href = `./step${nextStep}.html`;
    }
  }

  // 좌측 Step 1~5 카드 상태 반영
  stepItems.forEach((item) => {
    const stepNum = Number(item.dataset.step);
    const status = progress[stepNum] || (stepNum === nextStep && done > 0 ? "doing" : "before");
    const tag = item.querySelector(".tag");
    const btn = item.querySelector(".btn");

    item.classList.remove("step-item--done", "step-item--current");
    tag.classList.remove("tag--done", "tag--current");
    btn.classList.remove("btn--primary", "btn--outline");

    if (status === "done") {
      item.classList.add("step-item--done");
      tag.classList.add("tag--done");
      tag.textContent = "학습 완료";
      btn.classList.add("btn--outline");
      btn.textContent = "다시 보기 →";
    } else if (status === "doing") {
      item.classList.add("step-item--current");
      tag.classList.add("tag--current");
      tag.textContent = "진행 중";
      btn.classList.add("btn--primary");
      btn.textContent = "이어서 학습하기 →";
    } else {
      tag.textContent = "학습 전";
      btn.classList.add("btn--outline");
      btn.textContent = "학습하기 →";
    }
  });
}

updateLearnProgress();