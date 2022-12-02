import './Services.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';
import moment from 'moment';

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
}
const Services: React.FC<iProps> = ({ services, ...props }: iProps) => {
  


  // https://stackoverflow.com/questions/60044966/moment-js-convert-x-minutes-to-y-hours-z-minutes
  function formatTime(time: moment.Moment) {
    const minutes = time.minutes();
    const hours = time.hours();
    const hourFormatStr = hours === 1 ? 'hour' : 'hours';
    const minuteFormatStr = minutes === 1 ? 'minute' : 'minutes';
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <p>{name}</p>
        <p>£{price}</p>
        <p>{formatTime(timespan)}</p>
      </div>
    )
  }

  const renderOptions = (options: iServiceOption[]) => (
    options.map((item) => renderOption(item))
  )

  return (
    <Page id='services' className='app__services' header='Services'>

      {services.map(({ id, name, options }) => 
        <section key={id}>
          <h1 className="title">{name}</h1>
          { renderOptions(options) }
        </section>
      )}
    </Page>
  )
}

export default Services