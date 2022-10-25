import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//redux Actions
import { resetAddress } from './addressesSlice/addressesSlice';
//auth
import { resetOnBoardData } from './authSlice/onBoardingSlice';
import { resetData } from './authSlice/forgetPasswordSlice';
import { reset } from './authSlice/logInSlice';
import { logOut } from './authSlice/registerSlice';
//cart
import { clearCartData } from './cartSlice/createCartSlice';
import { clearCart } from './cartSlice/getCartSlice';
//filters
import { resetFilter } from './filterSlice/filterSlice';
//Notifications
import { clearNotification } from './notificationSlice/notificationListSlice';
//offers
import { resetOfferData } from './offerSlice/makeAnOfferSlice';
import { clearOffersList } from './offerSlice/offerSlice';
//orders
import { clearMyOrders } from './orderSlice/orderSlice';
//SHop
import { clearDetailData } from './shop/marketplaceProductDetailSlice';
import { clearMarketplaceList } from './shop/markrerPlaceListSlice';
import { clearBanners } from './shop/newProductsBannerSlice';
import { resetUserShopProducts } from './shop/userShopProductsSlice';
//User
import { clearSellerInfo } from './userSlice/sellerInfo';
import { resetUserData } from './userSlice/updateProfileSlice';
import { resetPreference } from './userSlice/userPreferenceSlice';
import { resetUserProfile } from './userSlice/userProfileSlice';
import { resetUserStats } from './userSlice/userStatsSlice';
//wardrobe
import { resetWardrobeDetails } from './wardRobe/wardrobeProductDetailSlice';
import { clearProductList } from './wardRobe/wardrobeProductsList';

import { navigate } from '../boot/rootNavigation';

export const storeCleaner = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    reduxClear();
    navigate('AuthStack');
  }, []);

  const reduxClear = () => {
    dispatch(resetAddress());
    //auth
    dispatch(resetData());
    dispatch(reset());
    dispatch(resetOnBoardData());
    dispatch(logOut());
    //cart
    dispatch(clearCartData());
    dispatch(clearCart());
    //filter
    dispatch(resetFilter());
    //Notifications
    dispatch(clearNotification());
    //Offer
    dispatch(resetOfferData());
    dispatch(clearOffersList());
    //order
    dispatch(clearMyOrders());
    //shop
    dispatch(clearDetailData());
    dispatch(clearMarketplaceList());
    dispatch(clearBanners());
    dispatch(resetUserShopProducts());
    //User Info
    dispatch(clearSellerInfo());
    dispatch(resetUserData());
    dispatch(resetPreference());
    dispatch(resetUserProfile());
    dispatch(resetUserStats());
    //wardRobe
    dispatch(resetWardrobeDetails());
    dispatch(clearProductList());
  };

  return null;
};
