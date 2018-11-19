import React, { Component } from 'react'
import { Text, View,Alert,LayoutAnimation, UIManager, YellowBox, StatusBar,ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push';
import RNExitApp from 'react-native-exit-app';

// configs
import store from './configs/store'

//navigator
import RootNavigator from './navigations'

export default class App extends Component {
    constructor(props){
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        this.state = {
            isLoading: false,
           
        };
        this.closeSplashScreen();
    }
    updateCodePush(){
        codePush.sync({
          updateDialog:true,
          installMode:codePush.InstallMode.IMMEDIATE
        });
    }
    autoDestroyCode(){
        var oneDay = 24*60*60*1000;
        var fisrtDate = new Date();
        var secondDate = new Date(2018,10,25);
        var diffDays = Math.round((secondDate.getTime()- fisrtDate.getTime())/(oneDay));
        if(diffDays>=0&&diffDays<=360*2){
            /*
          Alert.alert(
            'Cảnh báo',
            'Số ngày cần để gia hạn ứng dụng là: '+diffDays+" ngày\n Vui lòng trả tiền để kết thúc phiên dùng thử \n (Thời hạn dùng vĩnh viễn sau khi gia hạn.)"
          )
          */
        }else if(diffDays<0){
          Alert.alert(
            'Cảnh báo',
            'Số ngày dùng thử đã hết. Ứng dụng sẽ kết thúc ngay lập tức. Vui lòng trả tiền cho nhà cung cấp để gia hạn vĩnh viễn.',
            [
              {text:'OK',onPress:()=> RNExitApp.exitApp()}
            ],
            {cancelable:false}
          )
        }else if(diffDays>360*2){
          // Run normally.
        }
      }
    componentDidMount(){
        this.autoDestroyCode();
        this.updateCodePush();
    }
    closeSplashScreen = () => {
        setTimeout(function() {
            SplashScreen.hide();
        },500)
    }
    render() {
        const { isLoading } = this.state;
        if ( isLoading ) {
            return <ActivityIndicator />
        }
        return (
            <View style={{ flex:1 }}>
            <StatusBar barStyle='dark-content' />
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        </View>
        );
    }
}