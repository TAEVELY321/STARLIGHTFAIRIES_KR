// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. 마법의 커튼 변신 연출 (Magical Curtain Reveal) ===
    const preImg = document.querySelector('.pre-transform');
    const postImg = document.querySelector('.post-transform');
    const curtain = document.querySelector('.magic-curtain');
    const heroSection = document.querySelector('#hero');

    let isTransformed = false; // 현재 변신 상태 체크용 플래그

    if (preImg && postImg && curtain && heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const triggerHeight = window.innerHeight * 1.5; // 변신이 완료될 스크롤 위치 (1.5화면 높이)
            
            // 스크롤 진행률 (0.0 ~ 1.0)
            let progress = scrollY / triggerHeight;
            if (progress > 1) progress = 1;
            if (progress < 0) progress = 0;

            // --- 마법 효과 계산 ---
            let curtainOpacity, blurAmount;

            if (progress < 0.5) {
                // [전반부] 0% -> 50%: 빛이 점점 강해지고 흐려짐
                curtainOpacity = progress * 2; // 0 -> 1
                blurAmount = progress * 40;    // 0px -> 20px
            } else {
                // [후반부] 50% -> 100%: 빛이 서서히 사라지고 선명해짐
                curtainOpacity = (1 - progress) * 2; // 1 -> 0
                blurAmount = (1 - progress) * 40;    // 20px -> 0px
            }

            // 커튼에 효과 적용
            curtain.style.opacity = curtainOpacity;
            curtain.style.backdropFilter = `blur(${blurAmount}px)`;
            // 사파리 브라우저 호환성용
            curtain.style.webkitBackdropFilter = `blur(${blurAmount}px)`;


            // --- 이미지 교체 타이밍 (딱 중간 지점) ---
            if (progress >= 0.5 && !isTransformed) {
                // 50% 넘는 순간 변신 후 이미지로 교체
                preImg.style.opacity = '0';
                postImg.style.opacity = '1';
                isTransformed = true;
            } else if (progress < 0.5 && isTransformed) {
                // 다시 위로 올리면 변신 전 이미지로 복귀
                preImg.style.opacity = '1';
                postImg.style.opacity = '0';
                isTransformed = false;
            }

            // Hero 섹션을 완전히 벗어나면 배경 컨테이너 숨기기 (성능 최적화)
            const bgContainer = document.querySelector('.hero-bg-container');
            if (scrollY > triggerHeight + 200) {
                 bgContainer.style.visibility = 'hidden';
            } else {
                 bgContainer.style.visibility = 'visible';
            }
        });
    }


    // === 2. 스크롤 페이드인 (기존 유지) ===
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});