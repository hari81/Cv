import React, { Component } from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LogoHeader, OrderButton } from './common';


class CancelOrder extends Component {
    state = {
        switchValue: false
    }

    backToOrders = () => {
        Alert.alert('Do you want go back to Orders',
            '',
            [
                { text: 'OK', onPress: () => Actions.order() }
                ]
        );
    }

    toggleSwitch = (value) => this.setState({ switchValue: value })
    render() {

        return (
              <View style={styles.containerStyle}>
                <LogoHeader
                subHeaderText="PRICE HEDGING"
                phNumber="+1-952-742-7414"
                />
                  <View >
                      <Text style={styles.headerText}>Review Cancel Details</Text>
                      <Text style={styles.subHeaderTextStyle}>Cancel this order? </Text>
                      <View style={styles.productContainer}>
                          <View style={{ flexDirection: 'row' }}>

                              <View>
                                  <Text >
                                      Your trade direction is
                                  </Text>
                                  <Text style={styles.contentStyle}>Sell</Text>
                                  <Text >
                                      Your crop is a
                                  </Text>
                                  <Text style={styles.contentStyle}>
                                      Corn
                                  </Text>
                                  <Text >
                                      Your crop year is
                                  </Text>

                                  <Text style={styles.contentStyle}>2017</Text>
                                  <Text >
                                      Your contract month is
                                  </Text>
                                  <Text style={styles.contentStyle}>September</Text>
                              </View>

                              <View >
                                  <Text >
                                      Your product is
                                  </Text>
                                  <Text style={styles.contentStyle}>CRM Swap</Text>
                                  <Text >
                                      Your bushel quantity is
                                  </Text>
                                  <Text style={styles.contentStyle}>25,000</Text>
                                  <Text >
                                      Your order type is
                                  </Text>
                                  <Text style={styles.contentStyle}>Market</Text>
                              </View>


                          </View>

                          <View style={{ flexDirection: 'row', marginTop: 200 }}>
                              <Switch
                                  onValueChange={this.toggleSwitch}
                                  value={this.state.switchValue}
                              />
                              <Text style={{ paddingTop: 8, marginLeft: 12, fontSize: 18 }}>
                                  Agree to Terms and Conditions
                              </Text>
                          </View>

                          <View
                              style={{ flexDirection: 'row',
                              marginTop: 10,
                              marginBottom: 10,
                              marginLeft: 160,
                              marginRight: 160 }}
                          >
                              <OrderButton onPress={this.backToOrders}>
                                  BACK TO ORDERS LIST
                              </OrderButton>
                              <OrderButton>CANCEL ORDER NOW</OrderButton>
                          </View>


                      </View>
                  </View>
              </View>


        );
    }
}
const styles = {
    containerStyle: {
        height: 768,
        flexDirection: 'column',
        borderRightWidth: 5,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#007681'
    },

    headerText: {
        height: 100,
        justifyContent: 'flex-start',
        paddingTop: 8,
        paddingLeft: 14,
        fontSize: 20,
        fontWeight: 'bold'
    },
    subHeaderTextStyle: {
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 30,
        color: '#ffffff',
        paddingTop: 8,
        borderRightWidth: 10,
        paddingLeft: 14,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        backgroundColor: '#007681'
    },
    productContainer: {
        alignItems: 'center',
        paddingTop: 20
    },
    contentStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 100

    }
};


export default CancelOrder;

