import { easings } from "react-spring";

// React-Spring fade-in options
export const springOptions = {
    from: { opacity: 0, transform: "translateY(50px)", scale: 0.9 },
    to: { opacity: 1, transform: "translateY(0)", scale: 1 },
    config: {
        duration: 600,
        easing: easings.easeInOutCirc,
    },
};
