import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addProductToCart,
  deleteItemfromCart,
  removeProductfromCart,
} from '../reduxTK/slice/cartSlice';
import {decreaseQty, increaseQty} from '../reduxTK/slice/productSlice';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const cartItem = useSelector(state => state.cart);
  console.log('cartItem', cartItem);
  const dispatch = useDispatch();
  getTotal = () => {
    let total = 0;
    cartItem.map(item => {
      total = total + item.qty * item.price;
      console.log('total', total);
    });
    return total;
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Cart</Text>

        <View>
          <Text style={styles.simpleText}>{'Total ' + ' ' + getTotal()}</Text>

          <Text style={styles.simpleText}>
            {'Cart Item' + ' ' + cartItem.length}
          </Text>
        </View>
      </View>

      <View style={styles.flatlistView}>
        <FlatList
          data={cartItem}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 20,
                  paddingTop: '50%',
                }}>
                No Data Found
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.backButton}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item, index}) => {
            //   console.log("item", item)
            return (
              <View style={styles.ProductView}>
                <View style={styles.imagepriceView}>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <View style={styles.priceTextView}>
                    <Text style={styles.priceText}>{item.title}</Text>
                    <Text style={styles.priceText}>{item.brand}</Text>

                    <Text style={styles.nameText}>{'RS' + item.price}</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      {item.qty == 0 ? null : (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(addProductToCart(item));
                              dispatch(increaseQty(item.id));
                            }}
                            style={styles.plusButton}>
                            <Text style={styles.plusText}>+</Text>
                          </TouchableOpacity>

                          <Text style={styles.qtyText}>{item.qty}</Text>
                          <TouchableOpacity
                            onPress={() => {
                              if (item.qty > 1) {
                                dispatch(removeProductfromCart(item));
                                dispatch(decreaseQty(item.id));
                              } else {
                                dispatch(deleteItemfromCart(item.id));
                                dispatch(decreaseQty(item.id));
                              }
                            }}
                            style={styles.plusButton}>
                            <Text style={styles.plusText}>-</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 100,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EA4E4',
    borderRadius: 10,
  },
  simpleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  qtyText: {color: 'black', fontSize: 15, fontWeight: '600'},
  plusText: {color: 'white', fontSize: 13, fontWeight: '600'},
  plusButton: {
    backgroundColor: '#1EA4E4',
    height: 30,
    width: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonView: {
    width: 100,
    height: 30,
    backgroundColor: '#1EA4E4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagepriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  nameText: {
    color: 'green',
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  priceTextView: {
    gap: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  flatlistView: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  ProductView: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  main: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  headerView: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    elevation: 5,
  },
});

export default Cart;
