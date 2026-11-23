// PAGE 3-1 ~ 3-5. Step 상세 공통 스크립트
// TODO: 학습 완료 처리, 다음 단계로 이동
import "../common.js";
<<<<<<< Updated upstream
import { setStepStatus } from "../utils/progress.js";
=======
import { getProgress, setStepStatus } from "../utils/progress.js";

const completeBtn = document.getElementById("complete-btn");

if (completeBtn) {
  const step = Number(completeBtn.dataset.step);
  const progress = getProgress();

  // 버튼 스타일을 outline(완료) 상태로 바꾸는 함수
  const setButtonCompleted = () => {
    completeBtn.classList.remove("btn--primary");
    completeBtn.classList.add("btn--outline");
    completeBtn.textContent = "✓ 학습 완료됨";
  };

  if (progress[step] === "done") {
    setButtonCompleted();
  } else {
    setStepStatus(step, "doing");
  }

  completeBtn.addEventListener("click", () => {
    setStepStatus(step, "done");
    setButtonCompleted();
  });
}
>>>>>>> Stashed changes
