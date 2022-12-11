import './ScrollTopArrow.scss';
import { UpArrow } from '../../../util/icons';
import { useScroller } from '../../../helpers/hooks';

export function ScrollTopArrow() {
    const visible = useScroller();


    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="scroll-arrow--content" data-visible={visible}>
            <UpArrow onClick={scrollTop} />
        </div>
    );
}

export default ScrollTopArrow