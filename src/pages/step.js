// PAGE 3-1 ~ 3-5. Step 상세 공통 스크립트
import tocbot from "tocbot";
import "../common.js";
import { getProgress, setStepStatus } from "../utils/progress.js";

if (document.querySelector("#step3-toc")) {
  tocbot.init({
    tocSelector: "#step3-toc",
    contentSelector: ".step3 #main",
    headingSelector: "h2.content-section__heading",
    headingsOffset: 120,
    orderedList: false,
    scrollSmooth: false,
  });
}

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
