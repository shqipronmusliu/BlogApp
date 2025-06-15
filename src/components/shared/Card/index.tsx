import { motion } from "framer-motion";
import React from "react";

interface Props{
    icon: any;
    title: string;
    description: string;
}

const Card = React.memo(function Card(props: Props){

    const {icon: Icon, title, description} = props;
    return(
    <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05}}

    >
        {Icon && <Icon className="text-blue-400 w-12 h-12 mb-4" />}
        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-700">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    </motion.div>)
});

export default Card;