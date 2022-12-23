import './ScrollTopArrowWidget.scss';
import { UpArrow } from '../../../util/icons';
import { useScroller } from '../../../helpers/hooks';
import { scrollToTop } from '../../../constants/funcs';

function ScrollTopArrowWidget() {
    const visible = useScroller();


    return (
        <div className="scroll-arrow--container" data-visible={visible}>
            <UpArrow onClick={() => scrollToTop()} />
        </div>
    );
}

export default ScrollTopArrowWidget