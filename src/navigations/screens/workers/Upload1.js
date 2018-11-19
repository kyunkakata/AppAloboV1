import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, Image, TextInput,PermissionsAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { UPLOAD2 } from '../config/screenName';
import Toast from 'react-native-easy-toast';
import Geocoder from 'react-native-geocoder';
import ImagePicker from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';

const { width,height } = Dimensions.get('window')

export class Upload1 extends Component {
  constructor(props){
    super(props);
    this.state={
      customerName:this.props.customerName,
      phone:this.props.phone,
      avatarSourceMain:null,
      avatarSource1:null,
      avatarSource2:null,
      latitude: null,
      longitude: null,
      error: null,
      address: '',
      }
  }
  gotoUpload2(){
    //
    if(this.state.avatarSourceMain !== null){
      //Check Name:
      if(this.state.customerName !== null){
        
        //Check Phone:
        if(this.state.phone !==null){
          //Check Valid Number:
          var phoneNumber = this.state.phone;
          if(phoneNumber.length>9&&phoneNumber.length<12){
            //Check Location:
            if(this.state.address !== ''){
              // Check Camera:
              Actions.push(UPLOAD2,{
                customerName:this.state.customerName,
                phone:this.state.phone,
                avatarSourceMain:this.state.avatarSourceMain,
                address:this.state.address,        
              });
            }else{
              this.onToast('Vui lòng định vị lại vị trí của bạn');
            }
          }else{
            this.onToast('Số điện thoại bạn nhập không hợp lệ');
          }
        }else{
          this.onToast('Vui lòng nhập số điện thoại chủ bò.');
        }
      }else{
        this.onToast('Vui lòng nhập tên chủ bò.')
      }
      }else{
      this.onToast('Vui lòng chụp ít nhất 1 bức ảnh của bò.');
    }
    
  }
   async componentDidMount(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title':'Ứng dụng Alobo',
          'message':'Ứng dụng Alobo cần quyền truy cập vị trí của bạn.'
        }
      )
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
  
      }else{
        
      } 
    } catch (error) {
      
    }
  }
  selectPhotoTapped() {
    const options = {
      quality: 0.5,
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let source = { uri: 'data'response.uri };
        let source = 'data:image/jpeg;base64,' + response.data;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSourceMain: source
        });
        
        
      }
    });
  }
  selectPhotoTapped1() {
    const options = {
      quality: 1.0,
      maxWidth: 6000,
      maxHeight: 6000,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource1:source
        });
        
      }
    });
  }
  selectPhotoTapped2() {
    const options = {
      quality: 1.0,
      maxWidth: 6000,
      maxHeight: 6000,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      this.setState({avatarSource2Path:response.path})
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let source = { uri: response.uri };

        // You can also display the image using data:
         let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource2:source
        });
        
      }
    });
  }
  getPosition(){
    console.log('heared?')
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude:position['coords'].latitude,
          longitude:position['coords'].longitude,
        })
        console.log('heared?')
        this.geoEncode();       
      },
      (error) => {
          // See error code charts below.
          console.log(error.code, 'Kyun log:'+error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  geoEncode(){ 
    var pos = {
      lat: parseFloat(this.state.latitude),
      lng: parseFloat(this.state.longitude),
    }
    var address = '';
    Geocoder.geocodePosition(pos).then( res =>{
      var string = res[0].subAdminArea+" "+res[0].adminArea;
      address = string;
      this.setState({address})
      console.log('Tọa độ x: '+this.state.latitude+"\n"+"Tọa độ y: "+this.state.longitude+"\n"+"Vị trí: "+this.state.address)
      alert('Tọa độ x: '+this.state.latitude+"\n"+"Tọa độ y: "+this.state.longitude+"\n"+"Vị trí: "+this.state.address);
    })
  }
  onToast(message){
    this.refs.toast.show(message);
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <Toast ref = "toast"/>
        <ImageBackground source={require('../assets/images/global/background-collect.png')} style={{flex:1}}>
        
        {/*Top Bar*/}
          <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}>
          <View  style={{flex:1,justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>Actions.drawerOpen()}>
              <Image 
                source={require('../assets/images/global/menu.png')}
                style={{height:16,width:25.6,marginLeft:10}}
              />
              </TouchableOpacity>
            </View>
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Nhập thông tin</Text>
            </View>
            <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5f4339'}} onPress={()=>this.gotoUpload2()}>
              <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Tiếp theo</Text>
                <Image source={require('../assets/images/worker/next.png')} style={{marginLeft:7,marginTop:2,width:8,height:16}}/>
              </View>
            </TouchableOpacity>
          </View>
        {/*EOF Top Bar*/}
        {/*Main Body*/}
          {/*Camera picker Component*/}
          <View style={{width:width,height:height*.31,flexDirection:'row'}}>
            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>this.selectPhotoTapped1()}>
              {this.state.avatarSource1 === null ? 
                <Image 
                source={require('../assets/images/worker/add-new-camera.png')}
                style={{width:height*0.12,height:height*.12}}
              />
              :
              <Image 
                source={{uri:this.state.avatarSource1}}
                style={{width:height*0.12,height:height*.12,borderRadius:height*0.06,borderWidth:2,borderColor:'#8E572B'}}
              />
              }
              </TouchableOpacity>
            </View>
            <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=> this.selectPhotoTapped()}>
              {this.state.avatarSourceMain === null ? 
              <Image 
                source={require('../assets/images/worker/camera.png')}
                style={{width:height*0.20,height:height*.20}}
              /> :
              <Image 
                source={{uri:this.state.avatarSourceMain}}
                style={{width:height*0.20,height:height*.20,borderRadius:height*0.1,borderWidth:2,borderColor:'#8E572B'}}
              />
               }          
              </TouchableOpacity>
            </View>
            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>this.selectPhotoTapped2()}>
              {this.state.avatarSource2 === null ?
                <Image 
                source={require('../assets/images/worker/add-new-camera.png')}
                style={{width:height*0.12,height:height*.12}}
                />
              :
                <Image 
                source={{uri:this.state.avatarSource2}}
                style={{width:height*0.12,height:height*.12,borderRadius:height*0.06,borderWidth:2,borderColor:'#8E572B'}}
                />
              }
              
              </TouchableOpacity>
            </View>
          </View>
          {/*EOF Camera picker Component*/}
          <View style={{width:width,height:1,backgroundColor:'#8E572B'}} />
          {/*Form Get*/}
          <View style={{height:height*0.3,width:width,alignItems:'center',justifyContent:'center',marginTop:8}}>
            <View  style={{flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.08,width:width*0.8,marginBottom:10,padding:1}}>          
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18,marginLeft:12}}>Tên chủ:</Text>
              <View style={{marginLeft:10,height:height*0.08-4,flex:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Họ và tên"
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:18}}
                  onChangeText={(text)=>this.setState({customerName:text})}
                  autoCapitalize='words'
                  value={this.state.customerName}
                />
              </View>
            </View>
            <View  style={{flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.08,width:width*0.8,marginBottom:10,padding:1}}>          
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18,marginLeft:12}}>Liên lạc:</Text>
              <View style={{marginLeft:12,height:height*0.08-4,flex:1,marginTop:1,marginBottom:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
              <TextInput 
                  placeholder="Số điện thoại"
                  keyboardType='number-pad'
                  dataDetectorTypes='phoneNumber'
                  placeholderTextColor="grey"
                  style={{width:width*0.5-7,height:height*0.08,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:18}}
                  onChangeText={(text)=>this.setState({phone:text})}
                  value={this.state.phone}
                />
              </View>
            </View>
            <TouchableOpacity onPress={()=>this.getPosition()}>
            <View  style={{flexDirection:'row',borderRadius:30,alignItems:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.08,width:width*0.4,backgroundColor:'#8E572B',marginBottom:10}}>
              <View style={{width:height*0.08-4,height:height*0.08-4,borderRadius:30,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                <Image source={require('../assets/images/worker/lcation.png')} style={{height:32,width:24}}/>
              </View>
              <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18,marginLeft:12}}>Định vị</Text>
            </View>
            </TouchableOpacity>    
          </View>
          {/*EOF Form Get*/}
        {/*EOF Main Body*/}
        

        </ImageBackground>
        
      </View>
    )
  }
}

export default Upload1
