import './StarRating.scss'
import { useState } from "react";
import { BsStarFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface StarRatingProps {
    maxStarCount?: number;
    initialValue?: number;
    onChange: (index: number) => void;
}
const StarRating = ({ initialValue = 1, maxStarCount = 5, onChange }: StarRatingProps) => {
    const [rating, setRating] = useState<number>(initialValue);
    const [hover, setHover] = useState<number>(initialValue);


    return (
        <div className="star-rating">
            {[...Array(maxStarCount)].map((star, index) => {
                index += 1;

                return (
                    <motion.button
                        type="button" key={index} className={index <= (hover || rating) ? "selected" : ""}
                        onClick={() => { setRating(index); onChange(index); }}
                        onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }}
                    >
                        <BsStarFill />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default StarRating