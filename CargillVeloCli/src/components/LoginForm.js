import React, { Component } from 'react';
import { Text, View, Switch, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import base64 from 'base-64';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  //state = { email: '', password: '', error: '', loading: false, switchValue: false };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            password: '',
            loading: false,
            switchValue: false
        };

        if (!this.state.switchValue) {
            AsyncStorage.getItem('userData')
                .then((data) => {
                    const userInfo = JSON.parse(data);
                    if (userInfo) {
                        this.state.email = userInfo.email ? base64.decode(userInfo.email) : '';
                        this.state.password =
                            userInfo.password ? base64.decode(userInfo.password) : '';
                       // console.log(`saved data: ${this.state.email}`, password);
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    }
        componentDidMount = () => {

      //Fetch calls from https://externalstage.commodityhedging.com/extracense/api/orders

  }
    onLoginSuccess() {
       // let email;
        //let password;
        let userInfo;
        if (this.state.switchValue) {
            userInfo = JSON.stringify({
                email: base64.encode(this.state.email),
                password: base64.encode(this.state.password)
            });
          //  AsyncStorage.setItem('userData', userInfo);
           // userInfo = JSON.parse(userInfo);
           // email = userInfo.email ? base64.decode(userInfo.email) : '';
          //  password = userInfo.password ? base64.decode(userInfo.password) : '';
        } else {
            userInfo = JSON.stringify({
                email: base64.encode(''),
                password: base64.encode('')
            });
        }
        AsyncStorage.setItem('userData', userInfo);
        /*userInfo = JSON.parse(userInfo);
        email = userInfo.email ? base64.decode(userInfo.email) : '';
        password = userInfo.password ? base64.decode(userInfo.password) : '';

        console.log(`saved data: ${userInfo.email}`, password);*/
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        Actions.main();
    }

        onButtonPress() {
        //const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        setTimeout(() => {
            if (this.state.email !== 'C') {
            Alert.alert('Please enter correct User name!...');
            this.onLoginFail();
           } else if (this.state.password !== 't') {
                this.onLoginFail();
            Alert.alert('Incorrect Password, Please try again');

            this.onLoginFail();

        } else {

            this.onLoginSuccess();
        }
        }, 1000);
    }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

   // toggleSwitch = (value) => this.setState({ switchValue: value })

  switchClicked(value) {

        this.setState({
            switchValue: value
        })
      // let email;
      // let password;
        let userInfo;
        if (value) {
            userInfo = JSON.stringify({
                email: base64.encode(this.state.email),
                password: base64.encode(this.state.password)
            });
            //AsyncStorage.setItem('userData', userInfo);
           // userInfo = JSON.parse(userInfo);
            //email = userInfo.email ? base64.decode(userInfo.email) : '';
           // password = userInfo.password ? base64.decode(userInfo.password) : '';
        } else {
            userInfo = JSON.stringify({
                email: base64.encode(''),
                password: base64.encode('')
            })
            AsyncStorage.setItem('userData', userInfo)
          //  userInfo = JSON.parse(userInfo);
           // email = userInfo.email ? base64.decode(userInfo.email) : '';
          //  password = userInfo.password ? base64.decode(userInfo.password) : '';
        }
       // console.log(`saved data: ${email} ${value}`, password);
    }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (

      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>

    );
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Switch
                style={{ backgroundColor: '#007681' }}


                onValueChange={(value) => this.switchClicked(value)}
                value={this.state.switchValue}

            />

            <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}> Save Username </Text>
        </View>
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Text style={{ fontSize: 20, color: 'white' }}>
              Having trouble login in? Please call +1-952-742-7414 or
           email cargillpricehedge@cargill.com
          </Text>
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  buttonStyle: {
    //flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'green',
    borderRadius: 35,
    //borderWidth: 5,
    //borderColor: 'green',
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    width: 80
  }
};

export default LoginForm;
