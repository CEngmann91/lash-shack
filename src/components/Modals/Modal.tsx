import './Modal.scss';
import { motion } from 'framer-motion';
import { useEscKey, useToggle } from '../../helpers/hooks';
import { Close } from '../../util/icons';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

type ModalProps = {
    className: string;
    closeButtonClassName?: string;
    onOpen: () => void;
    onClose: () => void;
    children: React.ReactNode;
    // tapToDismiss?: boolean;
}
function Modal({ className, closeButtonClassName, onOpen, onClose, children }: ModalProps) {
    const { isOpen, toggleMe } = useToggle(true, onOpen, onClose);
    const { isPressed } = useEscKey();


    if (isPressed)
        toggleMe();
    
    return (
        <motion.div
            className={`backdrop app__flex ${className}`}
            variants={container}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            exit='hidden'
            // onClick={toggleMe}
        >
            <button className={`close-button ${closeButtonClassName}`} onClick={toggleMe}><Close /></button>
            {children}
        </motion.div>
    )
}

export default Modal