import React, { Component } from 'react'
import { Text, UIManager , View,TouchableOpacity,TextInput,Image,Dimensions,ImageBackground,FlatList,ScrollView,ActivityIndicator} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { DETAIL_SCREEN } from '../config/screenName';

const { width,height } = Dimensions.get('window');
import FastImage from 'react-native-fast-image'
import firebase from 'react-native-firebase'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import image from '../assets/images/global/cow-icon.png'
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export class MainScreen extends Component {
  constructor(props){
    super(props);
    arrayMarker=[
      //I 
      {
        latitude:20.983647,
        longitude:105.8264743
      },
      {
        latitude:20.993647,
        longitude:105.8264743
      },
      {
        latitude:21.003647,
        longitude:105.8264743
      },
      {
        latitude:21.013647,
        longitude:105.8264743
      },
      // L
      
      {
        latitude:20.993647,
        longitude:105.8664743
      },
    ],
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state={
      
      data:[],
      currIndex:1,
      isLoading:false,
      title:'',
      index:1,
      searchInput:'',
      showMap:false,
      marker:arrayMarker,
      region: {
        latitude: 10.769788,
        longitude: 106.4989233,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }
  }
  componentDidMount(){
    this.getData(1);
    this.setState({title:('Bò Bê (Từ 4 - 9 Tháng)').toLocaleUpperCase()})
  }
  getData=(index)=>{
    var array=[];
    var base='bobe';
   this.setState({isLoading:true})
   switch(index){
     case 1:
     base = 'bobe';
     this.setState({index:1});
     this.setState({title:('Bò Bê (Từ 4 - 9 Tháng)').toLocaleUpperCase()})
     break;
     case 2:
     base = 'boto';
     this.setState({index:2});
     this.setState({title:('Bò Tơ (Từ 9 - 18 Tháng)').toLocaleUpperCase()})
     break;
     case 3:
     base = 'bocai';
     this.setState({index:3});
     this.setState({title:('Bò cái,bò sinh sản').toLocaleUpperCase()})
     break;
     case 4:
     base = 'bothit';
     this.setState({index:4});
     this.setState({title:('Bỏ Xẻ/ Lốc Thịt').toLocaleUpperCase()})
     break;
     case 5:
     base = 'bokhung';
     this.setState({index:5});
     this.setState({title:('Bò Khung,Vỗ Béo').toLocaleUpperCase()})
     break;
   }
   firebase.app().firestore().collection('coreData').doc('checkedDatabase').collection(base)
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
  changeIndex=(index)=>{
    switch(index){
      case 1:
      this.getData(1);
      break;
      case 2:
      this.getData(2);
      break;
      case 3:
      this.getData(3);
      break;
      case 4:
      this.getData(4);
      break;
      case 5:
      this.getData(5);
      break;
      default:
      break;
    }
  }
  gotoDetailScreen(){
    Actions.push(DETAIL_SCREEN);
  }
  searchData=(input)=>{
    this.setState({isLoading:true});
    //be= 
    if(input.includes('bê')||input.includes('non')||input.includes('mới đẻ')||input.includes('nuôi')){
      this.changeIndex(1);
    }else if(input.includes('tơ')||input.includes('trẻ')){
      this.changeIndex(2);
    }else if(input.includes('cái')||input.includes('đẻ'||input.includes('nuôi con'))||input.includes('nái')){
      this.changeIndex(3);
    }else if(input.includes('thịt')||input.includes('bê cạo'||input.includes('bán'))){
      this.changeIndex(4);
    }else if(input.includes('vỗ béo')||input.includes('chăm'||input.includes('khung'))){
      this.changeIndex(5);
    }
  }
  renderMarkers(){
    markers=[];
    for (marker of this.state.marker){
      markers.push(
        <MapView.Marker 
          key={marker.longitude}
          coordinate={marker}
          desc={'Kyun'}
          title={'This is '+marker.latitude+','+marker.longitude}
        />
      )
    }
    return markers;
  }
  renderGoogleMaps(){
    return (
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={{flex:1} } 
        showsUserLocation
        region={ this.state.region }
      >
      <MapView.Marker
          key={106.2597764}
          coordinate={{latitude:10.8833938,
        longitude:106.2597764}}
          title='Đức Hòa, Long An'
          desc='Chú Bảy Hùng'
          
      >
        <Image 
          source={require('../assets/images/global/cow-icon.png')}
          style={{ width: 40, height: 40 }}
        />
      </MapView.Marker>
      <MapView.Marker
          key={106.3682315}
          coordinate={{latitude:10.525838,
        longitude:106.3682315}}
          title='Tân An, Long An'
          desc='Anh Nhã'
      >
        <Image 
          source={require('../assets/images/global/cow-icon.png')}
          style={{ width: 40, height: 40 }}
        />
      </MapView.Marker>
      <MapView.Marker
          key={106.4388995}
          coordinate={{latitude:10.749544,
        longitude:106.4388995}}
          title='Bình Chánh , TP HCM'
          desc='Chú Bảy Hùng'
         
      >
        <Image 
          source={require('../assets/images/global/cow-icon.png')}
          style={{ width: 40, height: 40 }}
        />
      </MapView.Marker>
      </MapView>
    )
  }
  render() {
    const { isLoading } = this.state;
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
            <View  style={{flex:4,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <View style={{flex:9,backgroundColor:'white'}}>
              <TextInput 
                placeholder='Tìm kiếm ...'
                onChangeText={(text)=>this.setState({searchInput:text})}
                style={{marginLeft:10,width:width*0.7,height:height*0.06,color:'black',fontFamily:'Myriad-Pro',fontSize:14}}
              />
              </View>
              <TouchableOpacity onPress={()=>this.searchData(this.state.searchInput)}>
              <View style={{width:height*0.06,backgroundColor:'skyblue',justifyContent:'center',alignItems:'center',height:height*0.06}}>
                <Image 
                  source={require('../assets/images/global/search-icon.png')}
                  style={{width:height*0.04,height:height*0.04}}
                />
              </View>
              </TouchableOpacity>
            </View>
            <View  style={{flex:1,alignItems:'flex-end',justifyContent:'center'}} >
              <TouchableOpacity onPress={()=>this.setState({showMap:!this.state.showMap})}>
              <Image 
                source={require('../assets/images/global/map-icon.png')}
                  style={{width:height*0.05,height:height*0.05,marginRight:5}}
              />
              </TouchableOpacity>
            </View>
          </View>
        {/*EOF Top Bar*/}
       {this.state.showMap ? this.renderGoogleMaps():
       <View style={{flex:1}}>
        <View style={{width:width,height:height*0.24,flexDirection:'row'}} 
        >
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
      
        {/**Verge */}
        <View style={{height:1,width:width,backgroundColor:'#8E572B'}}/>
        <View style={{height:26,width:width,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Text style={{marginTop:1,marginBottom:1,color:'#077007',fontFamily:'Myriad-Pro',fontSize:15}}>{this.state.title}</Text>
        </View>
        <View style={{height:1,width:width,backgroundColor:'#8E572B',marginBottom:5}}/>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingBottom:10,paddingTop:10}}>
          {/** Large Item: 0.402 W  0.263 H ,Image: 0.196 H 0.36 W */}
          {isLoading ? <ActivityIndicator /> :
          <FlatList 
            removeClippedSubviews={true}
            data= {this.state.data}
            showsVerticalScrollIndicator={false}
            
            renderItem={({item})=>
            <TouchableOpacity onPress={()=>
            Actions.push('DetailScreen',
            {
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
                source={{uri:'http://alobo.vn/upload/product/'+item.photo}}
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
        </View>
       }
      {/**Verge Botoom : 0.089 H */}
        </ImageBackground>  
    )
  }
}

export default MainScreen
