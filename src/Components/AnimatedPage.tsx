import { motion } from "framer-motion";
import { ReactElement } from "react";

const animations = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.7,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.7,
        },
    },
};

export default function AnimatedPage({ children }: { children: ReactElement }) {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: "100%" }}
        >
            {children}
        </motion.div>
    );
}
