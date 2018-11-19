import React, { Component } from 'react'
import { Text, View,Image,TouchableOpacity,Dimensions,AsyncStorage,ImageBackground} from 'react-native'
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../../configs/firebase-config'
import firebase from 'react-native-firebase';
const {width,height} = Dimensions.get('window')
export class DrawerMenuCus extends Component {
    constructor(props){
        super(props);
        this.state={
            checkUser:true
        }
    }
  render() {
    return (
        <ImageBackground style={{flex:1,alignItems:'center',backgroundColor:'#b2ebf2',width:width*0.85}}
        source={require('../assets/images/global/background_drawer.jpg')}
      >
        <Image 
          source={this.state.checkUser=== true ? require('../assets/images/global/nv.png') :require('../assets/images/global/kh.png')}
          style={{width:width*0.6,height:width*0.6,marginTop:40}}
        />
        <Text style={{marginTop:10,color:'black',fontSize:18,marginBottom:10}}>Khách hàng Alobo</Text>
        <TouchableOpacity onPress={()=>{
          Actions.push('MainScreen')
        }}>
        <View style={{backgroundColor:'#795548',elevation:10,height:40,justifyContent:'center',width:width*0.80,alignItems:'center'}}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:14,fontFamily:'Myriad-Pro'}}>Xem thông tin bò</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          firebase.app().auth().signOut();
          Actions.reset('Login');
        }}>
        <View style={{backgroundColor:'#795548',elevation:10,height:40,justifyContent:'center',width:width*0.80,alignItems:'center',marginTop:10}}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:14,fontFamily:'Myriad-Pro'}}>Đăng xuất</Text>
        </View>
        </TouchableOpacity>

      </ImageBackground>
    )
  }
}

export default DrawerMenuCus