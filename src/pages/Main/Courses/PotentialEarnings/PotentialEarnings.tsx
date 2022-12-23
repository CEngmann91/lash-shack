import './PotentialEarnings.scss';
import { Page } from '../../../../components';
import { formatCurrency } from '../../../../constants/funcs';

const PotentialEarnings = () => {


    return (
        <Page id='potential-earnings' className='app__potential-earnings' header='What Could I Earn?'>
            <div className="earnings-grid-container">
                <div className="Header">
                    <h3>Potential Earnings: Russian Lashes</h3>
                </div>
                <div className="Data">If you were charging £60 per set and working 5 days a week</div>
                <div className="Clients">
                    <header>Clients</header>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                </div>
                <div className="Daily">
                    <header>Daily</header>
                    <p>{formatCurrency(120)}</p>
                    <p>{formatCurrency(180)}</p>
                    <p>{formatCurrency(240)}</p>
                    <p>{formatCurrency(300)}</p>
                </div>
                <div className="Weekly">
                    <header>Weekly</header>
                    <p>{formatCurrency(600)}</p>
                    <p>{formatCurrency(900)}</p>
                    <p>{formatCurrency(1200)}</p>
                    <p>{formatCurrency(1500)}</p>
                </div>
                <div className="Monthly">
                    <header>Monthly</header>
                    <p>{formatCurrency(2400)}</p>
                    <p>{formatCurrency(3600)}</p>
                    <p>{formatCurrency(4800)}</p>
                    <p>{formatCurrency(6000)}</p>
                </div>
                <div className="Annually">
                    <header>Annually</header>
                    <p>{formatCurrency(31200)}</p>
                    <p>{formatCurrency(46800)}</p>
                    <p>{formatCurrency(62400)}</p>
                    <p>{formatCurrency(78000)}</p>
                </div>
                <div className="Footer">
                    <h3>Fully Accredited Course</h3>
                </div>
            </div>
        </Page>
    )
}

export default PotentialEarnings