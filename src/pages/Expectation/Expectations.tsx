import './Expectations.scss';
import Parallax from '../../components/Parallax/Parallax';

const Expectations = () => {

    return (
        <Parallax
            // backgroundUrl='https://images.unsplash.com/photo-1610128114197-485d933885c5?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzOTA2Nzc&ixlib=rb-1.2.1&q=80'
            backgroundUrl='https://img.freepik.com/free-photo/woman-eye-with-curl-false-eyelashes-low-angle-view_186202-5248.jpg?w=1480&t=st=1683500660~exp=1683501260~hmac=b4bb2db4f5011b7ef1e2f650818cbd78335c862bc240a31a79093cd7d5a64e2c'
            id="expectations"
            className="expectations__section"
        >
            <h5 className="text-center mb-2">Expectations</h5>
            <h1 className="text-center mb-4">What Can I Expect?</h1>

        </Parallax>
    )
}

export default Expectations