import React, { Component } from 'react'
import { AppState,Text,Alert,ActivityIndicator,View,Image,Dimensions,ImageBackground,TextInput,TouchableOpacity} from 'react-native'
import {SIGN_UP,CHOOSING} from '../config/screenName'
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import {AccessToken,LoginManager} from 'react-native-fbsdk'
import {SIGN_IN_REQUEST, LOGIN_WITH_FB_REQUEST, AUTO_LOGIN_REQUEST} from '../../../actions/action-type'
import firebase from 'react-native-firebase';

const {width,height} = Dimensions.get('window');
export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      email:'',
      pass:'',
      isLoading:false,

    };
  }
  
  gotoSignUp(){
    Actions.push(SIGN_UP);
  }
  gotoChoosingScreen(){
    Actions.reset('Choosing');
  }
  loginUser = (email, pass) => {
    this.setState({isLoading:true});
    const params = {
      email: email,
      pass:pass
    }
    this.props.dispatch({
      type: SIGN_IN_REQUEST,payload:params
    })
    
  }
  
  loginWithFacebook = async() =>{
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        Alert.alert(
          'Thông báo',
          'Hủy đăng nhập bằng Facebook'
        )
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
        
       
        
      }
  
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);  
      // login with credential
      const currentUser = await firebase.app().auth().signInWithCredential(credential);
      const params={
        user:currentUser
      }
      this.props.dispatch({
        type: LOGIN_WITH_FB_REQUEST,payload:params
      })
    } catch (e) {
      console.error(e);
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({isLoading:false});
    this.gotoChoosingScreen();
  }
  render() {
    return (
      <ImageBackground style={{flex:1,alignItems:'center'}}
        source={require('../assets/images/global/background-collect.png')}
       >
        <Toast ref = "toast"/>
        <Image 
          source={require('../assets/images/global/logo.png')}
          style={{width:width*0.3,height:width*0.3,marginTop:height*0.1}}
        />
        <View  style={{marginTop:height*0.1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.08,width:width*0.8,marginBottom:height*0.025,padding:1}}>          
              <View style={{width:width*0.25,height:height*0.08-2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:14,marginLeft:12}}>Nhập Email:</Text>
              </View>
              <View style={{marginLeft:12,height:height*0.08-4,flex:1,marginTop:1,marginBottom:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="abc@gmail.com"
                  autoCapitalize='none'
                  keyboardType='email-address'
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:14}}
                  onChangeText={(text)=>this.setState({email:text})}
                />
                
              </View>
        </View>
        <View  style={{flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.08,width:width*0.8,marginBottom:height*0.025,padding:1}}>          
              <View style={{width:width*0.25,height:height*0.08-2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:14,marginLeft:12}}>Mật khẩu:</Text>
              </View>
              <View style={{marginLeft:12,height:height*0.08-4,flex:1,marginTop:1,marginBottom:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Mật khẩu"
                  secureTextEntry
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:14}}
                  onChangeText={(text)=>this.setState({pass:text})}
                />
                
              </View>
        </View>
           
          <TouchableOpacity onPress={()=>this.loginUser(this.state.email,this.state.pass)}>
            <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.08,width:width*0.4,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>

            <Text style={{marginBottom:10}}>hoặc </Text>            
            <TouchableOpacity onPress={() => this.gotoSignUp()}>
            <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.08,width:width*0.4,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Đăng kí</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.loginWithFacebook()}>
            <View style={{alignItems:'center',flexDirection:'row',width:width*.65,height:height*0.07,backgroundColor:'#1565c0',elevation:10,borderRadius:5,borderColor:'#4fc3f7',borderWidth:1}}>
              <Image 
                source={require('../assets/images/global/iconfb.jpg')}
                style={{width:height*0.05,height:height*0.05,marginLeft:5}}
              />
              <View style={{flex:1,justifyContent:'center',alignItems:'center',color:'white',fontFamily:'Myriad-Pro'}}><Text style={{color:'white',fontFamily:'Myriad-Pro'}}> Đăng nhập với Facebook</Text></View>
              
            </View>
            </TouchableOpacity>
  
            <View style={{flex:1
            ,justifyContent:'flex-end'}}>
              <Text style={{color:'black',marginBottom:10}}>Công ty Công nghệ cao Zeno5</Text>
            </View>
      </ImageBackground>
    )
  }
}
const mapStateToProps = state =>{
  return {
    accountReducer: state.accountReducer,
  };
};
export default connect(mapStateToProps)(Login);
