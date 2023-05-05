// Doesn't work with animations
// https://codepen.io/l-e-e/details/gOKJyqa
import './TextReflection.scss';

type Props = {
    text: string;
}
const TextReflection = ({ text }: Props) => {

    return (
        <div className='reflection'>
            <div>
                <p>{text}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default TextReflection