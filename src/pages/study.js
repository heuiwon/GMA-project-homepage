// PAGE 6. 학업에 활용하기 — 목록
// TODO: 분야 카드 3개(글쓰기 / 수학 문제 풀이 / 강의 이해), 윤리 지침 안내

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { createButton } from "../components/button.js";

renderHeader();
renderFooter();

const writingButtonArea = document.querySelector("#writing-button");

const writingButton = createButton({
    label: "바로가기",
    variant: "outline",
    href: "writing.html"
});

writingButtonArea.appendChild(writingButton);
