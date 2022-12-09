import './Services.scss';
import React, { useEffect } from 'react'
import { ActivityIndicator, Page } from '../../components';
import moment from 'moment';
import { Card } from '../../components/Cards';
import { useShoppinCart } from '../../helpers/hooks';

export interface iServiceOption {
  active: boolean;
  name: string;
  price: number;
  duration: number;
}

export interface iService {
  active: boolean;
  id: number;
  name: string;
  options: iServiceOption[];
}

interface iProps {
  services: iService[];
  loading: boolean;
  error?: any;
}
const Services: React.FC<iProps> = ({ services, loading, error, ...props }: iProps) => {
  const { addToBasket, removeFromBasket, clearBasket, getCount } = useShoppinCart();


  // https://stackoverflow.com/questions/60044966/moment-js-convert-x-minutes-to-y-hours-z-minutes
  function formatTime(time: moment.Moment) {
    const minutes = time.minutes();
    const hours = time.hours();
    const hourFormatStr = hours === 1 ? 'hr' : 'hrs';
    const minuteFormatStr = minutes === 1 ? 'min' : 'mins';
    if (!time.minutes())
      return time.format(`h [${hourFormatStr}]`);
    return time.format(`h [${hourFormatStr}], mm [${minuteFormatStr}]`);
  }

  const renderOption = (option: iServiceOption) => {
    const { name, price, duration } = option;

    // https://stackoverflow.com/questions/60044966/moment-js-convert-x-minutes-to-y-hours-z-minutes
    const timespan = moment.utc(
      moment.duration(duration, "minutes")
        .asMilliseconds()
    )

    return (
      <Card className='option'>
        <div className='option-left-side'>
          <p className='option--name'>{name}</p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            {duration > 0 ? <p className='option--duration'>{formatTime(timespan)}</p> : null}
            {/* <a href=''>Show Details</a> */}
            {/* <p className='option--more-details'>Show Details</p> */}
          </div>
        </div>

        <div className='option-right-side'>
          <p className='option-right-side--price'>£{price}</p>
          <button className='border-button option-right-side-select-button' onClick={() => addToBasket("8fuyafjw0af9if")}>
            Select
          </button>
        </div>
      </Card>
    )
  }

  const renderOptions = (options: iServiceOption[]) => (
    options.map(item => renderOption(item))
  )

  return (
    <Page id='services' className='app__services' header='Services'>
        {loading
        ?
        <div className='app__flex app__min-height'>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
        :
        error
          ?
          <div className='app__flex app__min-height'>
            {error}
          </div>
          :
          <div className='app__services--list'>
            {services.map(({ id, name, options }) =>
              <article key={id} className=''>
                <h1 className="title">{name}</h1>
                <div className='options-container'>
                  {renderOptions(options)}
                </div>
              </article>



              // <Card id={id} className='app__half-height border-white border-white-shadow'>
              //     <h1 className="title">{name}</h1>
              //   { renderOptions(options) }
              // </Card>

              // <section key={id}>
              //   <h1 className="title">{name}</h1>
              //   { renderOptions(options) }
              // </section>
            )}
          </div>
        }
    </Page>
  )
}

export default Services