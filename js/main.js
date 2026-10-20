
const seasons = ["봄", "여름", "가을", "겨울"];

const heroSwiper = new Swiper(".hero_swiper", {

    // 무한 반복
    loop: true,

    // 슬라이드 이동 애니메이션 (1.8초)
    speed: 1800,

    // 부드럽게 겹쳐지는 페이드 효과
    effect: "fade",

    fadeEffect: {
        crossFade: true
    },


    // 자동 슬라이드
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    // 마우스 드래그
    grabCursor: true,
    simulateTouch: true,

    // 계절 인디케이터
    pagination: {
        el: ".hero_indicator",
        clickable: true,

        renderBullet: function(index, className) {
            return `
                <button
                    type="button"
                    class="${className}"
                    aria-label="${seasons[index]} 슬라이드 보기"
                >
                    ${seasons[index]}
                </button>
            `;
        }
    }

});



const railSection = document.querySelector(".local_rail");

if (railSection) {

    const track =
        railSection.querySelector(".local_rail_track");

    const range =
        railSection.querySelector(".rail_scrub_range");

    const current =
        railSection.querySelector(".rail_scrub_current");

    const marks =
        [...railSection.querySelectorAll(".rail_scrub_mark")];

    const pages =
        [...railSection.querySelectorAll(".local_rail_page")];


    // 페이지 변경
    function changeRailPage(index) {

        if (index < 0 || index >= pages.length) return;

        // 카드 3개씩 페이지 이동
        track.style.transform =
            `translateX(-${index * 100}%)`;

        // 드래그 위치 동기화
        range.value = index;

        const progress =
            pages.length > 1
            ? index / (pages.length - 1) * 100
            : 0;

        range.style.setProperty(
            "--rail-progress",
            `${progress}%`
        );

        // 현재 페이지 번호
        current.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;

        // 기차 아이콘 활성화
        marks.forEach(function(mark, i) {
            mark.classList.toggle("active", i === index);
        });

    }


    // 드래그해서 이동
    range.addEventListener("input", function() {
        changeRailPage(Number(this.value));
    });


    // 기차 아이콘 클릭으로 이동
    marks.forEach(function(mark) {

        mark.addEventListener("click", function() {
            changeRailPage(Number(mark.dataset.index));
        });

    });


    // 초기 상태
    range.max = pages.length - 1;
    changeRailPage(0);

}
