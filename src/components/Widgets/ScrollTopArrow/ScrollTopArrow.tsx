import './ScrollTopArrow.scss';
import { UpArrow } from '../../../util/icons';
import { useScroller } from '../../../helpers/hooks';
import { scrollToTop } from '../../../constants/funcs';

export function ScrollTopArrow() {
    const visible = useScroller();


    return (
        <div className="scroll-arrow--content" data-visible={visible}>
            <UpArrow onClick={() => scrollToTop()} />
        </div>
    );
}

export default ScrollTopArrow