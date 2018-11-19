import React, { Component } from 'react'
import { Alert,Text,Button,AsyncStorage,View,Image,Dimensions,ImageBackground,TextInput,TouchableOpacity} from 'react-native'
import {SIGN_UP,CHOOSING} from '../config/screenName'
import {SIGN_UP_REQUEST} from '../../../actions/action-type'
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux'
import {LOGIN} from '../config/screenName';
const {width,height} = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
export class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      pass:'',
      repass:'',
      isLoading:false,
    }
  }
  gotoLogin(){
    Actions.pop();
  }
  signUpUser(email,pass,repass){
    this.setState({isLoading:true});
    if(email===''||pass===''){
      Alert.alert(
          'Thông báo',
          'Vui lòng điền mật khẩu và email.'
      )
      return;
    }
    else if (!(email).includes('@gmail.com')){
      Alert.alert(
          'Thông báo',
          'Vui lòng điền đúng định dạnh email.\n Ví dụ : abc@gmail.com'
      )
      return;
    }
    if(this.state.pass.length<6){
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập mật khẩu từ 6 ký tự trở lên.'
      )
      return;
    }
    if(this.state.pass!==this.state.repass){
      Alert.alert(
        'Thông báo',
        'Mật khẩu nhập lại không đúng.'
    )
      return;
    }
    const params={
      email,
      pass
    }
    this.props.dispatch({type: SIGN_UP_REQUEST,payload:params})
  }
  componentWillReceiveProps(nextProps){
    this.setState({isLoading:false});
    /*
    Alert.alert(
      'Thông báo',
      'Đăng kí thành công.Đã tự động đăng nhập',
      [
        {text: 'OK', onPress: () => this.gotoLogin()},
      ],
      { cancelable: false }
    )
    */
    
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
                  placeholder="Email"
                  dataDetectorTypes='none'
                  autoCapitalize='none'
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:18}}
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
                  autoCapitalize='none'
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:18}}
                  onChangeText={(text)=>this.setState({pass:text})}
                />
                
              </View>
        </View>
        <View  style={{flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.08,width:width*0.8,marginBottom:height*0.05,padding:1}}>          
              <View style={{width:width*0.25,height:height*0.08-2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:14,marginLeft:12}}>Nhập lại     mật khẩu:</Text>
              </View>
              <View style={{marginLeft:12,height:height*0.08-4,flex:1,marginTop:1,marginBottom:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry
                  autoCapitalize='none'
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:18}}
                  onChangeText={(text)=>this.setState({repass:text})}
                />
                
              </View>
        </View>
        <TouchableOpacity onPress={()=>this.signUpUser(this.state.email,this.state.pass,this.state.repass)}>
            <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.08,width:width*0.4,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Đăng kí</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.gotoLogin()}>
            <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.08,width:width*0.4,backgroundColor:'#8E572B',marginBottom:10}}>
              
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Trở về</Text>
            </View>
        </TouchableOpacity>
            <View style={{flex:1
            ,justifyContent:'flex-end'}}>
              <Text style={{color:'black',marginBottom:15}}>Công ty Công nghệ cao Zeno5</Text>
            </View>
      </ImageBackground>
    )
  }
}
const mapStateToProps = state =>{
  return {
    accountReducer:state.accountReducer,
  }
}
export default connect(mapStateToProps)(SignUp)
