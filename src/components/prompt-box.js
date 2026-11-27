import Mustache from 'mustache';

//페이지의 모든 프롬프트 박스 준비하기
export function initPromptBoxes(){
    const boxes = document.querySelectorAll('.prompt-box');

    for(let i=0;i<boxes.length;i++){
        setupBox(boxes[i]);
    }
}

//프롬프트 박스 하나
//문장 속 {{이름}}을 입력칸으로 바꾸고, 복사하기 버튼에 클릭 동작 연결
function setupBox(box){
    const textE1 = box.querySelector('.promt-box__text');
    const template = textE1.textContent.trim();

    // ---------- 1) {{이름}} 자리에 입력칸 넣기 ----------

    //'일반 글자(text)'와 '{{이름}}(name)' 나눠줌
    const pieces = Mustache.parse(template);

    // 결과 예:
    //   [ ["text", "나는 대학교 "],
    //     ["name", "학년"],
    //     ["text", "학년이고 "],
    //     ["name", "과목"],
    //     ["text", "을 듣고 있어."] ]
    
    textE1.textContent = '';
    for(let i=0;i<pieces.length; i++){
        const type = pieces[i][0]; //조각 종류
        const value = pieces[i][1]; //조각 내용

        if(type === 'text'){
            textE1.append(value);
        }

        if(type === 'name'){
            const input = document.createElement('input');
            input.className = 'prompt-box__input'; //css 스타일용 클래스
            input.dataset.key = value; //어떤 {{이름}}의 칸
            input.placeholder = value; //빈칸일 때 보이는 안내 문구
            textE1.append(input);
        }
    }

    // ---------- 2) 복사하기 버튼 연결 ----------

    const inputs = box.querySelectorAll('.prompt-box__input');
    const copyButton = box.querySelector('[data-fill-copy]');

      // 버튼이 없으면 여기서 끝 (에러 방지)
    if (!copyButton) {
        return;
    }

    copyButton.addEventListener('click', function(){
        const values = {};

        for(let i=0; i<inputs.length;i++){
            const key = inputs[i].dataset.key; //칸 이름
            const value = inputs[i].value.trim(); //입력한 값

            if(value == ''){
                values[key] = '['+key+']';
            } else{
                values[key] = value;
            }
        }

        //Mustache.render: 템플릿의 {{이름}} 자리에 values 의 값을 채워 완성된 문장을 만듦
        const prompt = Mustache.render(template, values, {}, {
            escape: function(text){
                return text;
            },
        });

        copyText(prompt, copyButton);
    });

    //글자를 클립보드에 복사하고, 버큰 글자를 잠깐 "복사됨!"으로 바꾸기
    async function copyText(text, button){
        const originalLabel = button.textContent; //원래 버튼글자 '복사하기' 기억

        try{
            await navigator.clipboard.writeText(text);
            button.textContent = '복사됨';
        }catch(error){
            button.textContent = '복사 실패';
        }

        setTimeout(function () {
            button.textContent = originalLabel;
        }, 1500);
    }


}