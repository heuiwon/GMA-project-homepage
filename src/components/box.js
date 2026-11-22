// 공통 컴포넌트: Box
// variant
// - "default" : 흰 배경 + 테두리 (섹션 카드, 기능 카드, 진행률 카드)
// - "light"   : 연한 배경 (예시 프롬프트, 윤리 지침 안내)
// 안에 들어가는 내용은 각 페이지에서 구성

export function createBox({ variant = "default", children = [] } = {}) {
  const el = document.createElement("div");
  el.className = `box box--${variant}`;
  children.forEach((c) => el.append(c));
  return el;
}