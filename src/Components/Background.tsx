import { AnimeInstance } from "animejs";
import anime from "animejs/lib/anime.es.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Background() {
    const [animationKey, setAnimationKey] = useState(0);
    const { key } = useLocation();

    useEffect(() => {
        // Her route değiştiğinde animationKey state'ini artırarak animasyonu yeniden başlat
        setAnimationKey(prevKey => prevKey + 1);
    }, [key]);

    useEffect(() => {
        let animationInstance: AnimeInstance | undefined;

        function startAnimation() {
            animationInstance = anime({
                targets: ".square, .circle, .triangle",
                translateX: function () {
                    return anime.random(-550, 550);
                },
                translateY: function () {
                    return anime.random(-270, 270);
                },
                rotate: function () {
                    return anime.random(0, 360);
                },
                scale: function () {
                    return anime.random(0.5, 2);
                },

                duration: 6000,
                easing: "easeInOutSine",
                complete: startAnimation,
            });
        }

        // Animasyonu başlat
        startAnimation();

        // Cleanup işlemi: Component unmount olduğunda animasyonu durdur
        return () => {
            if (animationInstance) {
                animationInstance.pause();
            }
        };
    }, [animationKey]);

    return (
        <div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>

            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>

            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
        </div>
    );
}
