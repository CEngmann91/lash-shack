import './Services.scss';
import React, { ReactNode } from 'react'
import { Page } from '../../../components';
import { Card } from '../../../components/Cards';
import { useShoppingBasket } from '../../../helpers/hooks';
import { formatHrsMins } from '../../../constants/funcs';
import { BOOKING_URL } from '../../../constants/constants';

export interface iServiceOption {
  active: boolean;
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface iService {
  active: boolean;
  id: string;
  name: string;
  options: iServiceOption[];
}

type ServicesProps = {
  services: iService[];
  loading: boolean;
  error?: unknown;
}
const Services: React.FC<ServicesProps> = ({ services, loading, error }: ServicesProps) => {
  const { addToBasket } = useShoppingBasket();


  


  const renderLoadingActivity = (): ReactNode => (
    <div className='app__item-loading' />
  )

  const renderOptions = (options: iServiceOption[]) => (
    // options.map((item, index) => renderOption(index, item))
    options.map((item, index) => {
      const { id, name, price, duration } = item;

      return (
        <Card className='option'>
          <div className='option-left-side'>
            <p className='option--name'>{name}</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              {duration > 0 ? <p className='option--duration'>{formatHrsMins(duration)}</p> : null}
              {/* <a href=''>Show Details</a> */}
              {/* <p className='option--more-details'>Show Details</p> */}
            </div>
          </div>

          <div className='option-right-side'>
            <p className='option-right-side--price'>£{price}</p>
            <button className='border-button option-right-side-select-button'
                    onClick={() => addToBasket( "Services", id, price )}>
              Select
            </button>
            {/* <a href={BOOKING_URL} className="border-button option-right-side-select-button" target="_blank" rel="noreferrer">View</a> */}
          </div>
        </Card>
      )
    })
  )

  return (
    <Page id='services' className='app__services' header='Services'>
      {loading
        ?
        (renderLoadingActivity())
        :
        error
          ?
          <div className='app__flex app__min-height'>
            {error.toString()}
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