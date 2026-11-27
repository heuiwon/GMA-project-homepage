// PAGE 8. 에러 페이지
// - 헤더 · 푸터는 common.js 가 그려 줌
// - 공통 컴포넌트 Button: 다시 시도하기(primary) / 홈으로 돌아가기(outline)

import "../common.js";
import { createButton } from "../components/button.js";

const HOME_URL = "/index.html";

document.getElementById("error-actions").append(
  createButton({ label: "다시 시도하기", variant: "primary", onClick: retry }),
  createButton({ label: "홈으로 돌아가기", variant: "outline", href: HOME_URL })
);

// 다시 시도하기: 오류가 나기 전에 보던 페이지가 있으면 거기로 다시 이동, 없으면 이 페이지를 새로고침
// TODO: 피그마에 동작 설명이 없어서 임시로 정한 방식 → 팀 확인 필요
function retry() {
  if (document.referrer && document.referrer !== location.href) {
    location.href = document.referrer;
  } else {
    location.reload();
  }
}