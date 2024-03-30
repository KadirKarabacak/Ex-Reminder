import { easings } from "react-spring";

// React-Spring fade-in options
export const springOptions = {
    from: { opacity: 0, transform: "translateY(50px)", scale: 0.9 },
    to: { opacity: 1, transform: "translateY(0)", scale: 1 },
    config: {
        duration: 800,
        easing: easings.easeInOutBack,

        // easing: easings.easeInOutCirc,
    },
};

export const tableRowSpringOptions = {
    from: { opacity: 0, transform: "translateY(15px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: {
        duration: 500,
        easing: easings.easeInOutCirc,
    },
};

export const animationDuration = "2s";
