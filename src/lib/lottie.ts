import { default as lot } from 'lottie-web';

export function lottie(node: HTMLElement, animationData: any) {
    const animation = lot.loadAnimation({
        container: node,
        animationData,
        autoplay: true,
        loop: false,
    });

    animation.setSpeed(0.4);

    let direction: (-1 | 1) = 1;
    function onLoop() {
        animation.setDirection(direction);
        animation.play()
        direction *= -1;
    }
    animation.addEventListener('complete', onLoop)

    return {
        destroy: () => {
            animation.removeEventListener('complete', onLoop)
            animation.destroy();
        }
    };
}