import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image,Dimensions,ImageBackground,Alert} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications'
const { width,height } = Dimensions.get('window')
export class DetailScreen extends Component {
  back(){
    Actions.pop();
  }
  processCalling(phoneNum){
    Alert.alert(
      'Thực hiện cuộc gọi',
      'Quý khách đang thực hiện cuộc gọi tới số '+phoneNum,
      [
        {text:'Hủy'},
        {text:'Đồng ý',onPress: ()=>{Communications.phonecall(phoneNum,false)}}
      ]
    );
  }
  render() {
    return (
      <ImageBackground style={{flex:1}} source={require('../assets/images/global/background-collect.png')}>
        {/*Top Bar*/}
        <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}>
            <View  style={{flex:1,justifyContent:'center'}}>
              <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5f4339'}} onPress={()=>Actions.pop()}>
                <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                  <Image source={require('../assets/images/worker/back.png')} style={{marginRight:7,marginTop:2,width:8,height:16}}/>
                  <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Trở về</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Thông tin chi tiết</Text>
            </View>
            <View style={{flex:1}}/>
          </View>
        {/*EOF Top Bar*/}
        {/** Image size: 0.315 H + owner : 0.387 H*/}
        <View style={{width:width,height:height*0.34,justifyContent:'center',alignItems:'center'}}>
          <Image 
            source={{uri:'http://alobo.vn/upload/product/'+this.props.photo}}
            style={{height:height*0.315,width:height*0.315,borderRadius:height*0.315/2,borderWidth:4,borderColor:'#8E572B'}}
          />
        </View>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center',color:'#077007',fontFamily:'Myriad-Pro',fontSize:20,fontWeight:'bold'}}>{this.props.ten_vi}</Text>
          {/** Ma bo*/}
          <View style={{borderWidth:1,flexDirection:'row',borderColor:'#8E572B',height:height*0.05,width:width*0.55,borderRadius:30,backgroundColor:'white',marginBottom:5,marginLeft:10,marginTop:10}}>
              <View style={{justifyContent:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,height:height*0.05-2,width:width*0.18,backgroundColor:'#8E572B'}}>
                <Text style={{color:'white',fontFamily:'Myriad-Pro',fontSize:12,marginLeft:10}}>Mã bò: </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontFamily:'Myriad-Pro',fontSize:14,fontWeight:'bold',color:'black'}}>{this.props.masp}</Text>
              </View>
          </View>
          {/** EOF Ma bo */}
          {/** Chu bo*/}
          <View style={{borderWidth:1,flexDirection:'row',borderColor:'#8E572B',height:height*0.05,width:width*0.95,borderRadius:30,backgroundColor:'white',marginBottom:5,marginLeft:10}}>
              <View style={{justifyContent:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,height:height*0.05-2,width:width*0.18,backgroundColor:'#8E572B'}}>
                <Text style={{color:'white',fontFamily:'Myriad-Pro',fontSize:12,marginLeft:10}}>Chủ bò: </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontFamily:'Myriad-Pro',fontSize:14,fontWeight:'bold',color:'black'}}>{this.props.nhacungcap}</Text>
              </View>
          </View>
          {/** EOF Chu bo */}
         
          {/** Giá bán*/}
          <View style={{borderWidth:1,flexDirection:'row',borderColor:'#8E572B',height:height*0.05,width:width*0.95,borderRadius:30,backgroundColor:'white',marginBottom:5,marginLeft:10}}>
              <View style={{justifyContent:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,height:height*0.05-2,width:width*0.18,backgroundColor:'#8E572B'}}>
                <Text style={{color:'white',fontFamily:'Myriad-Pro',fontSize:12,marginLeft:10}}>Giá bán: </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontFamily:'Myriad-Pro',fontSize:14,fontWeight:'bold',color:'red'}}>{this.props.giaban} VNĐ/CON</Text>
              </View>
          </View>
          {/** EOF Giá bán */}
          {/** Vị trí */}
          <View style={{borderWidth:1,flexDirection:'row',borderColor:'#8E572B',height:height*0.05,width:width*0.95,borderRadius:30,backgroundColor:'white',marginBottom:5,marginLeft:10}}>
              <View style={{justifyContent:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,height:height*0.05-2,width:width*0.18,backgroundColor:'#8E572B'}}>
                <Text style={{color:'white',fontFamily:'Myriad-Pro',fontSize:12,marginLeft:10}}>Vị trí bò: </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontFamily:'Myriad-Pro',fontSize:14,fontWeight:'bold',color:'black'}}>{this.props.xuatxu}</Text>
              </View>
          </View>
          {/** EOF Vị trí */}
          {/** Can nang */}
          <View style={{borderWidth:1,flexDirection:'row',borderColor:'#8E572B',height:height*0.05,width:width*0.95,borderRadius:30,backgroundColor:'white',marginBottom:5,marginLeft:10}}>
              <View style={{justifyContent:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,height:height*0.05-2,width:width*0.18,backgroundColor:'#8E572B'}}>
                <Text style={{color:'white',fontFamily:'Myriad-Pro',fontSize:12,marginLeft:10}}>Cân nặng: </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontFamily:'Myriad-Pro',fontSize:14,fontWeight:'bold',color:'black'}}>{this.props.capdoantoan}</Text>
              </View>
          </View>
          {/** EOF Can nang  */}
          {/** Ghi chu  */}
          <View style={{borderWidth:1,flexDirection:'row',borderColor:'#8E572B',height:height*0.05,width:width*0.95,borderRadius:30,backgroundColor:'white',marginBottom:5,marginLeft:10}}>
              <View style={{justifyContent:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,height:height*0.05-2,width:width*0.18,backgroundColor:'#8E572B'}}>
                <Text style={{color:'white',fontFamily:'Myriad-Pro',fontSize:12,marginLeft:10}}>Ghi chú: </Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontFamily:'Myriad-Pro',fontSize:14,fontWeight:'bold',color:'black'}}>{this.props.giaohangtannha}</Text>
              </View>
          </View>
          {/** EOF Ghi chu  */}
          {/** Contact */}
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>this.processCalling('09.885.12.885')}>
            <View style={{flexDirection:'row',borderRadius:height*0.04,height:height*0.08,width:width*0.4,backgroundColor:'#8E572B'}}>
              <View style={{alignItems:'center',margin:1,justifyContent:'center',height:height*0.08-2,width:height*0.08-1,borderRadius:height*0.04,backgroundColor:'white'}}>
                <Image 
                  source={require('../assets/images/global/call-icon.png')}
                  style={{height:30,width:30}}
                />
              </View>
              <View style={{flex:1,width:width*0.4-height*0.08-2,justifyContent:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',fontSize:18,marginLeft:10,fontWeight:'bold',color:'white'}}>Gọi ngay</Text>
              </View>
            </View>
            </TouchableOpacity>
          </View>
          {/** EOF Contact */}
        </View>
      </ImageBackground>
    )
  }
}

export default DetailScreen
