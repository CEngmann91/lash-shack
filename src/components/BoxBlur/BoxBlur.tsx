import './BoxBlur.scss';
import { ReactNode } from 'react'

export interface BoxBlurProps {
    className?: string;
    children: ReactNode;
}
const BoxBlur = ({ className, children }: BoxBlurProps) => <div className={`box-blur ${className}`}>{children}</div>;

export default BoxBlur