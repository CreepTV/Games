// Author @CodingJourney
const tiltEffectSettings = {
    max: 10, // max tiltElement rotation (degrees (deg))
    perspective: 4000, // transform perspective, the lower the more extreme the tiltElement gets (pixels (px))
    scale: 1.05, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
};

const tiltElements = document.querySelectorAll(".tilt");

tiltElements.forEach(tiltElement => {
    tiltElement.addEventListener("mouseenter", tiltMouseEnter);
    tiltElement.addEventListener("mousemove", tiltMouseMove);
    tiltElement.addEventListener("mouseleave", tiltMouseLeave);
});

function tiltMouseEnter(event) {
    setTransition(event);
}

function tiltMouseMove(event) {
    const tiltElement = event.currentTarget;
    const tiltWidth = tiltElement.offsetWidth;
    const tiltHeight = tiltElement.offsetHeight;
    const centerX = tiltElement.getBoundingClientRect().left + tiltWidth/2;
    const centerY = tiltElement.getBoundingClientRect().top + tiltHeight/2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = tiltEffectSettings.max*mouseY/(tiltHeight/2);
    const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(tiltWidth/2);
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

    tiltElement.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
}

function tiltMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
}

function setTransition(event) {
    const tiltElement = event.currentTarget;
    clearTimeout(tiltElement.transitionTimeoutId);
    tiltElement.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    tiltElement.transitionTimeoutId = setTimeout(() => {
        tiltElement.style.transition = "";
    }, tiltEffectSettings.speed);
}