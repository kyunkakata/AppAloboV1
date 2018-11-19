import React, { Component } from 'react'
import { Text, View,StyleSheet,ImageBackground,Dimensions,Image,TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { UPLOAD1 } from '../config/screenName';
import firebase from 'react-native-firebase';
import RNExitApp from 'react-native-exit-app';

const { width,height } = Dimensions.get('window');

export class Upload3 extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:false
    }
  }
  componentDidMount(){
    this.uploadDataToFirebase();
  }
  uploadDataToFirebase=()=>{
    this.setState({isLoading:true});
    firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source')
    .doc(this.props.masp).set({
      capdoantoan:this.props.capdoantoan,
      chidanmuahang:this.props.chidanmuahang,
      donvi:this.props.donvi,
      giaban:this.props.giaban,
      giaohangtannha:this.props.giaohangtannha,
      id_list:this.props.id_list,
      masp:this.props.masp,
      nhacungcap:this.props.nhacungcap,
      photo:this.props.photo,
      ten_vi:this.props.ten_vi,
      xuatxu:this.props.chidanmuahang,
      hienthi:'1',
      id:this.props.masp,
      stt:'1',
      tenkhongdau:'product-number-',
      type:'product'
    }).then(()=>{
      // Check AUto ID Increase Method:
    // Check Auto ID Method :
    var id=null; 
    firebase.app().firestore().collection('AutoID').doc('baseID').get().then((doc)=>{
        id=doc.data().id;
    }).then(()=>{
    // Check AUto ID Increase Method:
    firebase.app().firestore().collection('AutoID').doc('baseID').update({
        id:(parseInt(id)+1).toString()
        
    }).then(()=>{
      this.setState({isLoading:false})
    })
    })
    
    })
  }
  gotoScreen1(){
    Actions.reset(UPLOAD1,{
      customerName:this.props.customerName,
      phone:this.props.phone,
    });
  }
  render() {
    return (
      <ImageBackground source={require('../assets/images/global/background-collect.png')} style={{flex:1}}>
          {/*Top Bar*/}
        <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}>
            <View  style= {{flex:1}}/>
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Gửi thông tin lên mạng</Text>
            </View>
            <View  style= {{flex:1}}/>
          </View>
          {/*EOF Top Bar*/}
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Image 
            source={require('../assets/images/worker/done.png')} 
            style={{width:width*0.4,height:width*0.4}}
          />
          <Text style={{color:'black',fontFamily:'Myriad-Pro',fontSize:16,marginTop:10}} >Đã gửi dữ liệu thành công</Text>
          <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center',width:width,height:height*0.1,marginTop:30,marginBottom:40}}>
          <TouchableOpacity onPress={()=>this.gotoScreen1()}>
            <View style= {{justifyContent:'center',alignItems:'center',elevation:10,borderWidth:2,borderColor:'#5d4037',borderRadius:30,marginRight:width*0.05,width:width*0.3,height:height*0.07,backgroundColor:'#8E572B'}}>
              <Text style={{color:'white',fontFamily:'Myriad-Pro', fontSize:18}} >Tiếp tục</Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{RNExitApp.exitApp()}}>
            <View style= {{justifyContent:'center',alignItems:'center',borderWidth:2,elevation:10,borderColor:'#5d4037',borderRadius:30,marginLeft:width*0.05,width:width*0.3,height:height*0.07,backgroundColor:'#8E572B'}}>
              <Text style={{color:'white',fontFamily:'Myriad-Pro', fontSize:18}}>Kết thúc</Text>
            </View>
            </TouchableOpacity> 
          </View>
          </View>
      </ImageBackground>
    )
  }
}

export default Upload3
