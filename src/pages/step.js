// PAGE 3-1 ~ 3-5. Step 상세 공통 스크립트
import "../common.js";
import { getProgress, setStepStatus } from "../utils/progress.js";

const completeButton = document.querySelector("[data-complete-step]");

if (completeButton) {
  const step = completeButton.dataset.completeStep;

  function showCompleted() {
    completeButton.classList.replace("btn--primary", "btn--outline");
    completeButton.textContent = "✓ 학습 완료";
    completeButton.disabled = true;
  }

  if (getProgress()[step] === "done") {
    showCompleted();
  }

  completeButton.addEventListener("click", () => {
    setStepStatus(step, "done");
    showCompleted();
  });
}
