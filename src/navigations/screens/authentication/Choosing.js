import React, { Component } from 'react'
import { AppState,Text,Button,AsyncStorage,View,Image,Dimensions,ImageBackground,TextInput,TouchableOpacity} from 'react-native'
import {UPLOAD1,CHECK1,MAIN_SCREEN} from '../config/screenName'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

const {width,height} = Dimensions.get('window')
export class Choosing extends Component {
  constructor(props){
    super(props);
    this.state={
      input:''
    }
  }
  gotoCustomerScreen(){
    
    Actions.drawerCus();}
    
  gotoCheck(){
  }
  gotoUpload(){
    if(this.state.input==='ALOBOV2018'){
    Actions.drawer();
    }else{
      alert('Mật khẩu nhân viên sai.')
    }
  }
  render() {
    return (
      <ImageBackground style={{flex:1,alignItems:'center'}}
        source={require('../assets/images/global/background-collect.png')}
       >
        {/*Top Bar*/}
        <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}>
            <View  style={{flex:1}}/> 
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Đăng nhập với tư cách là</Text>
            </View>
            <View  style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
            </View>
          </View>
        {/*EOF Top Bar*/}
        <View style={{flex:1,alignItems:'center'}}>
          <Image 
            source={require('../assets/images/global/logo.png')}
            style={{width:width*0.3,height:width*0.3,marginTop:height*0.1}}
          />
          <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.08,width:width*0.8,marginTop:50,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Đăng nhập với tư cách là</Text>
          </View>
          
          <View  style={{marginTop:10,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.6,marginBottom:10,padding:1}}>          
              <View style={{width:width*0.25,height:height*0.06-2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12,marginLeft:12}}>Mã Nhân Viên:</Text>
              </View>
              <View style={{marginLeft:12,height:height*0.06-4,flex:1,marginTop:1,marginBottom:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Mã Nhân Viên"
                  autoCapitalize='characters'
                  secureTextEntry={true}
                  placeholderTextColor="grey"
                  style={{width:width*0.3-7,height:height*0.06,marginLeft:5,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({input:text})}
                />
              </View>
          </View>
          <TouchableOpacity onPress={()=>this.gotoUpload()}>
          <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.07,width:width*0.6,marginTop:10,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Nhân viên của Alobo</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.gotoCustomerScreen()}>
          <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.07,width:width*0.6,marginTop:10,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Khách hàng của Alobo</Text>
          </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}
export default Choosing

