import './StarRating.scss'
import { useState, useRef, useCallback } from "react";
import { BsStarFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface StarRatingProps {
    maxStarCount?: number;
    initialValue?: number;
    onChange: (index: number) => void;
}

const StarRating = ({ initialValue = 1, maxStarCount = 5, onChange }: StarRatingProps) => {
    const [rating, setRating] = useState<number>(initialValue);
    const hover = useRef<number>(initialValue);

    const handleMouseEnter = useCallback((index: number) => {
        hover.current = index;
    }, []);

    const handleMouseLeave = useCallback(() => {
        hover.current = rating;
    }, [rating]);

    const handleClick = useCallback((index: number) => {
        setRating(index);
        onChange(index);
    }, [onChange]);

    return (
        <div className="star-rating">
            {[...Array(maxStarCount)].map((star, index) => {
                index += 1;

                return (
                    <motion.button
                        type="button" key={index} className={index <= (hover.current || rating) ? "selected" : ""}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}
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