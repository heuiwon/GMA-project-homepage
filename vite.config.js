import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// 멀티 페이지: 새 HTML 페이지를 만들면 여기에도 추가해야 빌드됨
export default defineConfig({
  server: { open: "/onboarding.html" },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        onboarding: resolve(__dirname, "pages/onboarding.html"),
        error: resolve(__dirname, "pages/error.html"),
        "learn-index": resolve(__dirname, "pages/learn/index.html"),
        "learn-step1": resolve(__dirname, "pages/learn/step1.html"),
        "learn-step2": resolve(__dirname, "pages/learn/step2.html"),
        "learn-step3": resolve(__dirname, "pages/learn/step3.html"),
        "learn-step4": resolve(__dirname, "pages/learn/step4.html"),
        "learn-step5": resolve(__dirname, "pages/learn/step5.html"),
        "study-index": resolve(__dirname, "pages/study/index.html"),
        "study-writing": resolve(__dirname, "pages/study/writing.html"),
        "study-math": resolve(__dirname, "pages/study/math.html"),
        "study-lecture": resolve(__dirname, "pages/study/lecture.html"),
      },
    },
  },
});
