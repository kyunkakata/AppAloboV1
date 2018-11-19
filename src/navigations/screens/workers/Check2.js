import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image,Dimensions,ImageBackground,Alert, TextInput,ActivityIndicator} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import {ShareDialog} from 'react-native-fbsdk'
const FBSK = require('react-native-fbsdk');
const {ShareApi} = FBSK;
const { width,height } = Dimensions.get('window')
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({slideFrom:'top'});
export class Check2 extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:false,
      normalDialog:false,
      index:1,
      action:0,
      pass:'',
      result:null,
      isUploaded:this.props.isUploaded,
      back:false,
      end:false
    }
  }
  back(){
    Actions.pop();
  }
  componentWillUnmount(){
    this.state.normalDialog=false;
  }
  endUp(){
    this.setState({normalDialog:false});
    setTimeout(function(){
      Actions.reset('Check1')
    },500)
  }
  dialogContent=(index)=>{
    if(index==1){
        return (
            <View style={{flex:1,alignItems:'center'}}>
                <View style={{width:width*0.8,height:50,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:10}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Kiểm duyệt thông tin</Text>
                </View>
                {this.state.isUploaded?
                <View>
                  <TouchableOpacity onPress={()=>{
                    //Share with Facebook
                    this.fbShare(this.props.id);
                    this.setState({action:4})
                }}>
                <View style={{borderRadius:2,marginTop:10,width:width*0.6,height:40,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:5}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Chia sẻ lên Facebook</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({index:2})
                    this.setState({action:3})
                }}>
                <View style={{borderRadius:2,marginTop:10,width:width*0.6,height:40,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:5}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Xóa thông tin</Text>
                </View>
                </TouchableOpacity>
                </View>
                :
                <View>
                <TouchableOpacity onPress={()=>{
                    this.setState({index:2})
                    this.setState({action:1})
                }}>
                <View style={{borderRadius:2,marginTop:10,width:width*0.6,height:40,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:5}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Đăng lên website</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({index:2})
                    this.setState({action:2})
                }}>
                <View style={{borderRadius:2,marginTop:10,width:width*0.6,height:40,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:5}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Xóa thông tin</Text>
                </View>
                </TouchableOpacity>
                </View>
                }
                
                <TouchableOpacity onPress={()=>this.setState({normalDialog:false})}>
                <View style={{borderRadius:2,marginTop:10,width:width*0.6,height:40,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:5}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Trở lại</Text>
                </View>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'black',fontSize:16,marginBottom:5}}>Alobo v2.1.3</Text>
                </View>
            </View>
        )
    }else if(index==2){
        return(
            <View style={{flex:1,alignItems:'center'}}>
            <View style={{width:width*0.8,height:50,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:10}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Mật khẩu quản trị viên</Text>
            </View>
            <View  style={{marginTop:10,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.6,marginBottom:height*0.025,padding:1}}>          
                <View style={{width:width*0.25,height:height*0.06-2,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:14,marginLeft:12}}>Mật khẩu:</Text>
            </View>
            <View style={{marginLeft:12,height:height*0.06-4,flex:1,marginTop:1,marginBottom:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
            <TextInput 
              placeholder="pass"
              autoCapitalize='none'
              secureTextEntry
              placeholderTextColor="grey"
              style={{width:width*0.2-7,height:height*0.06,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:14}}
              onChangeText={(text)=>{this.setState({pass:text})}}
            />
          </View>
        
    </View>
        <TouchableOpacity
            onPress={()=>{
                if(this.state.pass==='dainam123'){
                    this.setState({index:3});
                    this.setState({result:null});
                    if(this.state.action==1){
                      this.uploadDatabaseToWebsite(this.props.masp);
                    }else if(this.state.action==2){
                      this.deleteUncheckedDatabase(this.props.masp);
                    }else if(this.state.action==3){
                      this.deleteDatabaseofWebsite(this.props.masp);
                    }
                }else{
                    this.setState({result:'Mật khẩu sai.'});
                }
            }}
        >
            <View  style={{borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:1.5,borderColor:"#8E572B",height:height*.06,width:width*0.4,backgroundColor:'#8E572B',marginBottom:10}}>
            <Text  style={{fontFamily:'Myriad-Pro',color:'white',fontSize:18}}>Xác nhận</Text>
            </View>
        </TouchableOpacity>
        <Text style={{fontFamily:'Myriad-Pro',color:'red',fontSize:14,marginTop:5}}>{this.state.result}</Text>
            <View style={{flex:1,justifyContent:'flex-end'}}>
            <Text style={{fontFamily:'Myriad-Pro',color:'black',fontSize:16,marginBottom:5}}>Alobo v2.1.3</Text>
            </View>
        </View>
        
        )
    }else if(index==3){
        return(
            <View style={{flex:1,alignItems:'center'}}>
            <View style={{width:width*0.8,height:50,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:10}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Đang xử lý hành động</Text>
                
            </View>
            {this.state.isLoading ?
                <View style={{height:180,alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator 
                        size='large'
                    />
                     <Text style={{fontFamily:'Myriad-Pro',color:'black',fontSize:16,marginBottom:5}}>Đang xử lý dữ liệu</Text>
                </View>
                :
                <View style={{height:180,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'black',fontSize:16,marginBottom:5}}>Đã xử lý</Text>
                <TouchableOpacity onPress={()=>{
                  
                  this.endUp();
                }
                }>
                <View style={{borderRadius:2,marginTop:10,width:width*0.6,height:40,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:5}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Trở lại</Text>
                </View>
                </TouchableOpacity>
                </View>
                }
            <View style={{flex:1,justifyContent:'flex-end'}}>
            <Text style={{fontFamily:'Myriad-Pro',color:'black',fontSize:16,marginBottom:5}}>Alobo v2.1.3</Text>
            </View>
        </View>
        )
    }
  }
  renderDialog=()=>{
    return (
    <Dialog
      onDismiss={() => {
        this.setState({ normalDialog: false });
      }}
      onTouchOutside={() => {
        this.setState({ normalDialog: false });
      }}
      width={0.8}
      height={0.4}
      visible={this.state.normalDialog}
      dialogAnimation={slideAnimation}
    >
        {this.dialogContent(this.state.index)}
    </Dialog>
    )
  }
  deleteUncheckedDatabase=(id)=>{
    this.setState({isLoading:true})
    firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source')
   .doc(id).delete()
   .then(()=>{
       this.setState({isLoading:false})
   })
  }
  fbShare=(id)=>{
    this.setState({isLoading:true})
    const shareLinkContent = {
      contentType: 'link',
      contentUrl:'http://alobo.vn/san-pham/product-number--'+this.props.id+'.html',
    };
    ShareDialog.canShow(shareLinkContent).then((canShow)=>{
      if (canShow) return ShareDialog.show(shareLinkContent);
      })
      .then((result)=>{
      if(result.isCancelled){
        alert('Bài Share bị hủy');
      }else{
        this.setState({index:3});
        this.setState({isLoading:false})
      }
      },function(error){
      console.log('Share fail with err:'+error);
      })
  }
  uploadDatabaseToWebsite=(id)=>{
    this.setState({isLoading:true})
    fetch('http://alobo.vn/api/data_bo/add_new_data',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "user_id":"12",
        "data":{
          capdoantoan:this.props.capdoantoan,
          chidanmuahang:this.props.chidanmuahang,
          donvi:this.props.donvi,
          giaban:this.props.giaban,
          giaohangtannha:this.props.giaohangtannha,
          hienthi:this.props.hienthi,
          id:this.props.id,
          id_list:this.props.id_list,
          masp:this.props.masp,
          nhacungcap:this.props.nhacungcap,
          photo:this.props.photo,
          stt:this.props.stt,
          ten_vi:this.props.ten_vi,
          tenkhongdau:this.props.tenkhongdau,
          type:this.props.type,
          xuatxu:this.props.xuatxu
        }
      })
    }).then((response)=>response.json())
    .then((responseJson) => {
      firebase.firestore().collection('coreData').doc('uploadedDatabase').collection('source')
      .doc(id).set({
        capdoantoan:responseJson.data.capdoantoan,
        chidanmuahang:responseJson.data.chidanmuahang,
        donvi:responseJson.data.donvi,
        giaban:responseJson.data.giaban,
        giaohangtannha:responseJson.data.giaohangtannha,
        hienthi:responseJson.data.hienthi,
        id:responseJson.data.id,
        id_list:responseJson.data.id_list,
        masp:responseJson.data.masp,
        nhacungcap:responseJson.data.nhacungcap,
        photo:responseJson.data.photo,
        stt:responseJson.data.stt,
        ten_vi:responseJson.data.ten_vi,
        tenkhongdau:responseJson.data.tenkhongdau,
        type:responseJson.data.type,
        xuatxu:responseJson.data.xuatxu,
        link:responseJson.data.link,
      })
    }).then(()=>{
      firebase.app().firestore().collection('coreData').doc('uploadedDatabase').collection('source')
      .doc(id).get()
      .then((doc)=>{
        var base ='bobe';
          switch(this.props.id_list){
              case '2':
              base ='bobe';
              break;
              case '3':
              base ='bocai';
              break;
              case '4':
              base = 'boto';
              break;
              case '1':
              base = 'bothit';
              break;
              case '5':
              base = 'bokhung';
              break;
              
          }
          firebase.app().firestore().collection('coreData').doc('checkedDatabase').collection(base).doc(doc.data().id).set({
              capdoantoan:doc.data().capdoantoan,
              chidanmuahang:doc.data().chidanmuahang,
              donvi:doc.data().donvi,
              giaban:doc.data().giaban,
              giaohangtannha:doc.data().giaohangtannha,
              hienthi:doc.data().hienthi,
              id:doc.data().id,
              id_list:doc.data().id_list,
              link:doc.data().link,
              masp:doc.data().masp,
              nhacungcap:doc.data().nhacungcap,
              photo:doc.data().photo,
              stt:doc.data().stt,
              ten_vi:doc.data().ten_vi,
              tenkhongdau:doc.data().tenkhongdau,
              type:doc.data().type,
              xuatxu:doc.data().xuatxu
          }).then(()=>{
            this.deleteUncheckedDatabase(id);
          })
    })
    })
  }
  deleteDatabaseofWebsite=(id)=>{
    this.setState({isLoading:true});
    var idList=null;
    var list=null;
    firebase.app().firestore().collection('coreData').doc('uploadedDatabase')
    .collection('source').doc(id).get()
    .then((doc)=>{
      idList = doc.data().id;
      list = doc.data().id_list;
    }).then(()=>{
      fetch('http://alobo.vn/api/remove_data?user_id=12&data_id='+idList)
      .then((response)=>response.json())
      .then((responseJson)=>{
        //alert(responseJson.msg_desc);
      })
    }).then(()=>{
      firebase.app().firestore().collection('coreData').doc('uploadedDatabase')
      .collection('source').doc(id).delete()
      .then(()=>{
        var base ='bobe';
        switch(list){
            case '2':
            base ='bobe';
            break;
            case '3':
            base ='bocai';
            break;
            case '4':
            base = 'boto';
            break;
            case '1':
            base = 'bothit';
            break;
            case '5':
            base = 'bokhung';
            break;
            
        }
        firebase.app().firestore().collection('coreData').doc('checkedDatabase').collection(base)
        .doc(idList).delete()
        .then(()=>{
          this.setState({isLoading:false})
        })
      })
    })
  }
  uploadUncheckDatabase=(id)=>{
    this.setState({isLoading:true})
    // Firebase Uncheck Database to Uploaded and Add to some list.
   firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source').doc(id).get()
   .then((doc)=>{
        firebase.app().firestore().collection('coreData').doc('uploadedDatabase').collection('source').doc(id).set({
            capdoantoan:doc.data().capdoantoan,
            chidanmuahang:doc.data().chidanmuahang,
            donvi:doc.data().donvi,
            giaban:doc.data().giaban,
            giaohangtannha:doc.data().giaohangtannha,
            hienthi:doc.data().hienthi,
            id:doc.data().id,
            id_list:doc.data().id_list,
            link:doc.data().link,
            masp:doc.data().masp,
            nhacungcap:doc.data().nhacungcap,
            photo:doc.data().photo,
            stt:doc.data().stt,
            ten_vi:doc.data().ten_vi,
            tenkhongdau:doc.data().tenkhongdau,
            type:doc.data().type,
            xuatxu:doc.data().xuatxu
        })
        var base ='bobe';
        switch(doc.data().id_list){
            case '2':
            base ='bobe';
            break;
            case '3':
            base ='bocai';
            break;
            case '4':
            base = 'boto';
            break;
            case '1':
            base = 'bothit';
            break;
            case '5':
            base = 'bokhung';
            break;
            
        }
        firebase.app().firestore().collection('coreData').doc('checkedDatabase').collection(base).doc(doc.data().id).set({
            capdoantoan:doc.data().capdoantoan,
            chidanmuahang:doc.data().chidanmuahang,
            donvi:doc.data().donvi,
            giaban:doc.data().giaban,
            giaohangtannha:doc.data().giaohangtannha,
            hienthi:doc.data().hienthi,
            id:doc.data().id,
            id_list:doc.data().id_list,
            link:doc.data().link,
            masp:doc.data().masp,
            nhacungcap:doc.data().nhacungcap,
            photo:doc.data().photo,
            stt:doc.data().stt,
            ten_vi:doc.data().ten_vi,
            tenkhongdau:doc.data().tenkhongdau,
            type:doc.data().type,
            xuatxu:doc.data().xuatxu
        })
   }).then(()=>{
       this.setState({isLoading:false})
   })
  }
  render() {
    return (
      <ImageBackground style={{flex:1}} source={require('../assets/images/global/background-collect.png')}>
        {/*Top Bar*/}
        {this.renderDialog()}
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
            <TouchableOpacity  style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'red'}}
              onPress={()=>this.setState({normalDialog:true})}
             >
            <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Kiểm duyệt</Text>
            </TouchableOpacity>
          </View>
        {/*EOF Top Bar*/}
        {/** Image size: 0.315 H + owner : 0.387 H*/}
        <View style={{width:width,height:height*0.34,justifyContent:'center',alignItems:'center'}}>
          <FastImage 
            source={!this.props.photo.includes('base64')?
                {uri:'http://alobo.vn/upload/product/'+this.props.photo}:
                {uri:this.props.photo}
                }
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
            <TouchableOpacity onPress={()=>this.processCalling(this.props.nhacungcap)}>
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

export default Check2
