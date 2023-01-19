import './Wishlist.scss';
import React from 'react'
import { PageWrapper, ImageBanner } from '../../components';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Wishlist = () => {
    const firstName = useReduxSelector((state: RootState) => state.userAccount.user.firstName);


    return (
        <PageWrapper title="Wish List">
            <ImageBanner title={!firstName ? 'Wish List' : `${firstName}'s Wish List`} />
            
            <div>Wishlist</div>
        </PageWrapper>


    )
}

export default Wishlist