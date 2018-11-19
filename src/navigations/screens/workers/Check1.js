import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { CHECK2 } from '../config/screenName';
import FastImage from 'react-native-fast-image'
import { Text, View,TouchableOpacity,Image,Dimensions,ImageBackground,FlatList,ScrollView,ActivityIndicator} from 'react-native'
import firebase from 'react-native-firebase'
const { width,height } = Dimensions.get('window');
export class Check1 extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
      index:true, // Uncheck database if true, uploaded database if false
      isLoading:false,
    }
  }
  componentDidMount(){
    this.getData(true);
  }
  getData=(index)=>{
    this.setState({isLoading:true})
    var ref= null;
    if(index){
    ref = firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source')
    }else{
    ref = firebase.app().firestore().collection('coreData').doc('uploadedDatabase').collection('source')
    }
    var array=[];
    ref
    .get().then((snapshot) =>{
      snapshot.forEach((doc) =>{
        console.log(doc.id,'=>',doc.data());
        var text = '{"capdoantoan":"'+doc.data().capdoantoan+'",'
                 + '"chidanmuahang":"'+doc.data().chidanmuahang+'",'
                 + '"donvi":"'+doc.data().donvi+'",'
                 + '"giaban":"'+doc.data().giaban+'",'
                 + '"giaohangtannha":"'+doc.data().giaohangtannha+'",'
                 + '"hienthi":"'+doc.data().hienthi+'",'
                 + '"id":"'+doc.data().id+'",'
                 + '"id_list":"'+doc.data().id_list+'",'
                 + '"masp":"'+doc.data().masp+'",'
                 + '"nhacungcap":"'+doc.data().nhacungcap+'",'
                 + '"photo":"'+doc.data().photo+'",'
                 + '"stt":"'+doc.data().stt+'",'
                 + '"ten_vi":"'+doc.data().ten_vi+'",'
                 + '"tenkhongdau":"'+doc.data().tenkhongdau+'",'
                 + '"type":"'+doc.data().type+'",'
                 + '"xuatxu":"'+doc.data().xuatxu+'"}';
         array.push(JSON.parse(text));        
      })
     }).then(()=>{
       console.log(array);
       this.setState({data:array});
       this.setState({isLoading:false})
     })
     .catch((err) =>{
       console.log('Error getting documents',err);
     })
  }
  gotoCheck2(){
    Actions.push(CHECK2);
  }
  changeIndex=(index)=>{
    if(index){
      this.setState({index:true});
      this.getData(true);
    }else{
      this.setState({index:false});
      this.getData(false);
    }
  }
  render() {
    return (
      <ImageBackground source={require('../assets/images/global/background-collect.png')} style={{flex:1}}>
        {/*Top Bar*/}
        <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}
          
        >
            <View  style={{flex:1,justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>Actions.drawerOpen()}>
              <Image 
                source={require('../assets/images/global/menu.png')}
                style={{height:16,width:25.6,marginLeft:10}}
              />
              </TouchableOpacity>
            </View>
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
            </View>
            <View  style={{flex:1}} >
            </View>
          </View>
        {/*EOF Top Bar*/}
        
        <View style={{width:width,height:height*0.05,flexDirection:'row',backgroundColor:'#03a9f4'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.changeIndex(true)}>
          <View style={this.state.index ? {flex:1,backgroundColor:'#03a9f4',alignItems:'center',justifyContent:'center'}:{flex:1,backgroundColor:'#a1887f',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontFamily:'Myriad-Pro',color:'white'}}>Chưa kiểm duyệt</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.changeIndex(false)}>
          <View style={this.state.index ? {flex:1,backgroundColor:'#a1887f',alignItems:'center',justifyContent:'center'}:{flex:1,backgroundColor:'#03a9f4',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontFamily:'Myriad-Pro',color:'white'}}>Đã kiểm duyệt</Text>
          </View>
          </TouchableOpacity>
        </View>
       {/*
        <View style={{width:width,height:height*0.24,flexDirection:'row'}} 
        >
        {/*
          <ScrollView style={{flex:1}} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={this.state.index===1 ?{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center',backgroundColor:'#d7ccc8'}:{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.changeIndex(1)}
            >
              <Image 
                source={require('../assets/images/customer/image-base.png')}
                style={{width:height*0.126,height:height*0.126,borderRadius:height*0.63,borderWidth:2,borderColor:'#8E572B'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={this.state.index===2 ?{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center',backgroundColor:'#d7ccc8'}:{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.changeIndex(2)}
            >
              <Image 
                source={require('../assets/images/customer/image-base2.png')}
                style={{width:height*0.126,height:height*0.126,borderRadius:height*0.63,borderWidth:2,borderColor:'#8E572B'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={this.state.index===3 ?{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center',backgroundColor:'#d7ccc8'}:{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.changeIndex(3)}
            >
              <Image 
                source={require('../assets/images/customer/image-base3.png')}
                style={{width:height*0.126,height:height*0.126,borderRadius:height*0.63,borderWidth:2,borderColor:'#8E572B'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={this.state.index===4 ?{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center',backgroundColor:'#d7ccc8'}:{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.changeIndex(4)}
            >
              <Image 
                source={require('../assets/images/customer/image-base4.png')}
                style={{width:height*0.126,height:height*0.126,borderRadius:height*0.63,borderWidth:2,borderColor:'#8E572B'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={this.state.index===5 ?{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center',backgroundColor:'#d7ccc8'}:{height:height*0.24,width:width*0.383,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.changeIndex(5)}
            >
              <Image 
                source={require('../assets/images/customer/image-base5.png')}
                style={{width:height*0.126,height:height*0.126,borderRadius:height*0.63,borderWidth:2,borderColor:'#8E572B'}}
              />
            </TouchableOpacity>
          </ScrollView>
         
        </View>
       */}
        {/**Verge */}
        <View style={{height:1,width:width,backgroundColor:'#8E572B'}}/>
        <View style={{height:26,width:width,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Text style={{marginTop:1,marginBottom:1,color:'#077007',fontFamily:'Myriad-Pro',fontSize:15}}>THÔNG TIN ĐÃ ĐĂNG</Text>
        </View>
        <View style={{height:1,width:width,backgroundColor:'#8E572B',marginBottom:5}}/>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingBottom:10,paddingTop:10}}>
          {/** Large Item: 0.402 W  0.263 H ,Image: 0.196 H 0.36 W */}
          {

          this.state.isLoading ? <ActivityIndicator/> :
          <FlatList 
            removeClippedSubviews={true}
            data= {this.state.data}
            showsVerticalScrollIndicator={false}
            
            renderItem={({item})=>
            <TouchableOpacity onPress={()=>
            Actions.push('Check2',
            {
              isUploaded:!this.state.index,
              capdoantoan:item.capdoantoan,
              chidanmuahang:item.chidanmuahang,
              donvi:item.donvi,giaban:item.giaban,
              giaohangtannha:item.giaohangtannha,
              hienthi:item.hienthi,
              id:item.id,
              id_list:item.id_list,
              masp:item.masp,
              nhacungcap:item.nhacungcap,
              photo:item.photo,
              stt:item.stt,
              ten_vi:item.ten_vi,
              tenkhongdau:item.tenkhongdau,
              type:item.type,
              xuatxu:item.xuatxu,
              
              })}>
            <View style={{elevation:10,alignItems:'center',justifyContent:"center",width:width*0.42,height:height*0.3,backgroundColor:'#8E572B',marginBottom:10,marginLeft:10,marginRight:10}}>
              <FastImage 
                source={!item.photo.includes('base64')?
                {uri:'http://alobo.vn/upload/product/'+item.photo}:
                {uri:item.photo}
                }
                style={{width:width*0.38,height:height*0.22,marginTop:5}}
              />
              <Text style={{marginLeft:5,marginTop:3,marginRight:5,fontSize:9,color:'white',fontFamily:'Myriad-Pro',fontWeight:'bold',textAlign:'center'}}>{item.ten_vi}</Text>
              <Text style={{marginLeft:10,marginRight:10,fontSize:10,color:'red',fontFamily:'Myriad-Pro',fontWeight:'bold',textAlign:'center'}}>{item.giaban} VNĐ/CON</Text>     
            </View>
            </TouchableOpacity>
            }
            keyExtractor={(item)=>item.id}
            numColumns={2}
          />
          }
        </View>
      {/**Verge Botoom : 0.089 H */}
        </ImageBackground>
    )
  }
}

export default Check1
