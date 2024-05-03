import { easings } from "react-spring";

// React-Spring fade-in options
export const springOptions = {
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
        duration: 800,
        easing: easings.easeInOutBack,
    },
};

export const mapSpringOptions = {
    from: { opacity: 0, transform: "translateY(15px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-15px)" },
    config: {
        duration: 500,
        // easing: easings.easeOutCubic,
        easing: easings.easeInOutQuad,
    },
};

export const alarmOptions = {
    from: { opacity: 0, transform: "translateY(-25px)", scale: 0.9 },
    to: { opacity: 1, transform: "translateY(0)", scale: 1 },
    config: {
        duration: 200,
        easing: easings.easeInOutCirc,
    },
};

export const animationDuration = "2s";
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const API_KEY = "660af325eae2a991411459bkz0d7f18";
