import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigation from './navigation/AppNavigation';
import {useDispatch} from 'react-redux';
import {addProduct} from './reduxTK/slice/productSlice';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        console.log(data);
        // const prod = data.products;
        const prod = data.products.map(product => ({
          ...product,
          qty: 0, // You can set any default quantity you prefer
        }));

        prod.map(item => {
          dispatch(addProduct(item));
        });
        console.log('prod', prod);
      } catch (error) {
        console.error(error);
      }
    };

    api();
  }, []);

  return <AppNavigation />;
};

export default Main;
