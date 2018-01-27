import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SegmentedControlIOS,

    ListView,
    TouchableHighlight,
    Alert,
    Picker
} from 'react-native';

import { Actions } from 'react-native-router-flux';

//import { CardSection } from './common';

import CargillImg from './common/logo.png';


const customData = require('../../restapi.json'); //fetch call
const underlying = require('../../underlying.json'); // different Fetch calls


export default class Orders extends Component {
//constructor properties
constructor(props) {
   super(props);
   this.state = {
      isLoading: true,
       crop: 'crop',
      clonedData: []
   };
}

//componentDidMount = () => {

    backToLogin = () => {
           Alert.alert(
            'Are you Sure wanna go back',
            'Back to Login Screen',
            [
                { text: 'OK', onPress: () => Actions.login() },
            ]
        );
    };

//rendering data for list view
renderData = (cData) =>
     (
      <TouchableHighlight
          style={styles.touchopa}
        onPress={() => this.rowPressed(cData)}
        underlayColor='white'
      >
        {this.getDataCell(cData)}
     </TouchableHighlight>
    );

    //each cell modeling
getDataCell = (data) => {

    //Fetch call from https://externalstage.commodityhedging.com/extracense/api/orders/underlying/data.underlying
    // to get Month, year, Commodity.name and Commodity.unit


    return (<View style={styles.contentcontainer}>

        <View style={styles.yearStyle}>
            <View style={{ backgroundColor: '#279989', height: 40, justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                    {underlying.contractMonth.month.name}
                </Text>
            </View>
            <View style={{ backgroundColor: '#658D1B', height: 60, justifyContent: 'center'}}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 25,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    {underlying.contractMonth.year.value}
                </Text>
            </View>
        </View>

        <View style={styles.producttextcontainer}>
            <Text>{underlying.commodity.name}</Text>
            <View style={styles.quaContainer}>
                <View>
                    <Text>QUANTITY</Text>
                    <Text>{data.quantity} {underlying.commodity.unit}</Text>
                </View>
                <View style={styles.directionContainer}>
                    <Text>DIRECTION</Text>
                    <Text>{data.buySell}</Text>
                </View>
            </View>
        </View>

        <View style={styles.ordertextcontainer}>
            <Text>ORDER #</Text>
            <Text>{data.orderId}</Text>
            <Text>PRICE</Text>
            <Text> $0.0 </Text>
        </View>

        <View style={styles.textcontainer}>
            <Text>STATUS</Text>
            <Text>{data.orderState.label}</Text>
            <Text>ORDER TYPE</Text>
            <Text>{data.orderType}</Text>
        </View>

        <View style={styles.textcontainer}>
            <Text>ORDER CREATION DATE</Text>
            <Text>{data.createTime}</Text>
            <Text>ORDER EXPIRATION DATE</Text>
            <Text>{data.expirationDate}</Text>
        </View>

        <View style={styles.buttonview}>
            <TouchableHighlight
                style={styles.viewbutton} onPress={() => this.cancelOrd()}
                underlayColor='#dddddd'
            >
                <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableHighlight>
        </View>

    </View>);
};

    backToLogin = () =>
        Alert.alert(
            'Are Sure to you want go back',
            'Back to Login Screen',
            [
                { text: 'OK', onPress: () => Actions.auth() },
            ]
        );

//on clicking cancel Order
    cancelOrd = () => {
        Alert.alert('Are sure you want cancel Order',
            'going to Cancel Screen',
            [
                { text: 'OK', onPress: () => Actions.cancelOrder() },
            ]
        );
    };

    refreshData = () => {
        Alert.alert('Data will be refresh');
    };
    //rendering data for list view
    renderData = (cData) =>
        (
            <TouchableHighlight
                style={styles.touchopa}
                underlayColor='white'
            >
                {this.getDataCell(cData)}
            </TouchableHighlight>
        );


render()
{
    const standardDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const clonedData = standardDataSource.cloneWithRows(customData.value);

    return (
        <View
            style={styles.container}
        >

            <View style={styles.logoStyle}>
                  <View
                      style={{ flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center' }}
                  >
                  <TouchableHighlight

                      onPress={() => this.backToLogin()}
                  >
                    <Text style={{ color: 'white', fontSize: 18 }}> BackToLogin </Text>
                  </TouchableHighlight>

                    <Image
                        style={{ width: 70, height: 30, marginLeft: 30, marginRight: 10 }}
                        source={CargillImg}
                    />
                    <Text
                        style={{ color: 'white', textAlign: 'center', fontSize: 20 }}
                    >
                        Price Hedging
                    </Text>

                  </View>
                  <View
                      style={{ flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center' }}
                  >
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                          <TouchableHighlight onPress={() => this.refreshData()}>
                        <Image
                            style={{ width: 25, height: 25, marginLeft: 1, marginRight: 5 }}
                            source={{ uri: 'https://thumb7.shutterstock.com/display_pic_with_logo/4019890/503771671/stock-photo-refresh-glyph-icon-image-style-is-a-flat-icon-symbol-in-a-rounded-square-button-white-and-silver-503771671.jpg' }}
                        />
                          </TouchableHighlight>
                        <Text
                            style={{ color: 'white',
                            fontSize: 20,
                                borderColor: 'white',
                                borderRightWidth: 2 }}
                        >
                            Refesh Data
                        </Text>

                      </View>
                        <Text style={{ color: 'white', fontSize: 20 }}> | </Text>
                      <View
                          style={{ flex: 1,
                              flexDirection: 'row',
                          justifyContent: 'center',
                              marginLeft: 30,
                              marginRight: 30 }}
                      >
                      <Image
                          style={{ width: 25, height: 25, marginLeft: 1, marginRight: 1 }}
                          source={{ uri: 'https://cdn2.iconfinder.com/data/icons/dialer/24/_phone_2-128.png' }}
                      />
                      <Text style={{ color: 'white', fontSize: 20 }}> +1-952-742-7414</Text>
                      </View>
                      <Text style={{ color: 'white', fontSize: 20 }}> | </Text>
                      <View>

                    <Image
                        style={{ width: 30, height: 30, marginLeft: 20, marginRight: 30 }}
                        source={{ uri: 'https://thumb7.shutterstock.com/display_pic_with_logo/615538/586665269/stock-photo-man-face-glyph-icon-flat-smooth-blue-symbol-pictogram-is-isolated-on-a-white-background-designed-586665269.jpg' }}
                    />
                      </View>
                  </View>

            </View>


            <View style={styles.segmentarea}>

                  <View style={styles.positions}>
                    <Text style={{ fontSize: 20 }} >Positions & Orders</Text>
                  </View>

                  <View justifyContent='center'>
                      <SegmentedControlIOS
                          alignItems='center'
                          tintColor="green"
                          style={styles.segment}
                          values={['Orders', 'Open Positions', 'Closed Positions']}
                          selectedIndex={0}
                          onChange={(event) => {
                              this.setState({
                                  selectedIndex: event.nativeEvent.selectedSegmentIndex });
                            }}
                          onValueChange={(val) => {
                            this.setState({
                              value: val,
                            });
                          }}
                      />
                  </View>


                <View
                    style={{ flex: 1,
                        marginLeft: 100,
                    justifyContent: 'center',
                        width: 150,
                        height: 100,
                    }}
                >

                    {/*<Text style={styles.pickerTextStyle}>Product</Text>*/}
                    <Picker
                        style={styles.picker}
                        mode="dropdown"
                        itemStyle={styles.itemStyle}
                        selectedValue={this.state.crop}
                        onValueChange={(itemValue) => this.setState({ crop: itemValue })}
                    >
                        <Picker.Item label="CORN" value="Corn" />
                        <Picker.Item label="SOYBEAN" value="Soy" />

                    </Picker>
                </View>

                <View style={{ justifyContent: 'center', width: 100, height: 100 }}>
                <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.crop}
                    onValueChange={(itemValue) => this.setState({ crop: itemValue })}
                >
                    <Picker.Item label="Corn" value="Corn" />
                    <Picker.Item label="Soybean" value="Soybean" />
                </Picker>
                </View>

            </View>


            <View style={styles.listviewarea}>
                <ListView
                   dataSource={clonedData}
                   renderRow={(rowData) => this.renderData(rowData)}
                />

            </View>

        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007681',
    },
    logoStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        height: 64
    },
    segmentarea: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 64,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#279989',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
    },
    segment: {
        marginLeft: 50,
        width: 500,

    },
    positions: {
        left: 30,
        justifyContent: 'center',
    },
    input: {
        alignSelf: 'center',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        paddingVertical: 0,
        height: 25,
        width: 150,
        marginLeft: 100
    },
    quaContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    directionContainer: {
        marginLeft: 5
    },
    image: {
        height: 58,
        width: 60,
        borderRadius: 30,
    },
    contentcontainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    yearStyle: {
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'green',
        width: 100,
        height: 100,
        justifyContent: 'space-around',
        marginBottom: 10,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'green',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,


    },
    imageborder: {
        height: 80,
        width: 80,
        borderColor: '#5db7e8'
    },
    separator: {
        height: 1,
        backgroundColor: '#e3e3e3',
        paddingBottom: 1,
        marginLeft: 15,
        marginRight: 15
    },
    titlecontainer: {
        backgroundColor: '#e3e3e3',
    },
    ordertextcontainer: {
        flex: 1,
        marginLeft: 55
    },
    textcontainer: {
        flex: 1
    },
    producttextcontainer: {
        flex: 1,
        marginLeft: 20
    },
    titletext: {
        flexGrow: 1,
        fontSize: 16,
        color: '#5db7e8',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10
    },
    name: {
        fontSize: 16,
        color: '#7d7c7b',
    },
    highlightedLabel: {
        fontSize: 16,
        color: 'black',
    },
    experience: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5,
        color: '#7d7c7b',
    },
    statustext: {
        fontSize: 14,
        color: '#5db7e8',
    },
    featurewording: {
        fontSize: 14,
        color: '#7d7c7b',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonview: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '20%'
    },
    viewbutton: {
        height: 35,
        width: 150,
        borderRadius: 5,
        marginTop: 18,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#5db7e8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchopa: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#279989',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
        backgroundColor: 'white',
    },
    itemStyle: {
        fontSize: 15,
        height: 50,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',

    },
    picker: {
        width: 150,
        height: 80,

    },
});
