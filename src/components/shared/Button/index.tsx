import { motion } from "framer-motion";
import cs from "classnames";
import React from "react";

interface Props {
    text: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "tertiary" | "quaternary";
    type?: "button" | "submit" | "reset";
}

const Button = (props: Props) => {
    const { text, onClick, variant = 'primary', type = 'button' } = props;

    const buttonStyles = {
        primary: "bg-blue-700 hover:bg-blue-800 text-white shadow-lg",
        secondary: "bg-white text-blue-700 border border-blue-700 hover:bg-blue-50 shadow-md",
        tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        quaternary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    };

    return (
        <motion.button 
            type={type} 
            className={cs(
                "px-6 py-3 rounded-full font-medium transition-all",
                buttonStyles[variant],
            )}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {text}
        </motion.button>
    );
};
export default Button;