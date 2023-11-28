import { default as lot } from 'lottie-web';

export function lottie(node: HTMLElement, animationData: any) {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const animation = lot.loadAnimation({
        container: node,
        animationData,
        autoplay: !reducedMotionQuery.matches
    });

    function reducedMotionListener() {
        if (reducedMotionQuery.matches) animation.pause();
        else animation.play();
    }

    reducedMotionQuery.addEventListener('change', reducedMotionListener);

    return {
        destroy: () => {
            animation.destroy();
            reducedMotionQuery.removeEventListener('change', reducedMotionListener);
        }
    };
}