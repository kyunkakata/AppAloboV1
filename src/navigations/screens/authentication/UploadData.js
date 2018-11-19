import React, { Component } from 'react'
import { Text, View,Button,Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import firebaseApp from '../../../configs/firebase-config'
import firebase from 'react-native-firebase';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-popup-dialog';
  const {width,height}= Dimensions.get('window');
const slideAnimation = new SlideAnimation({slideFrom:'top'});
var bocaiData = require('../authentication/data/bokhung.json')
export class UploadData extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'Ready',
            normalDialog:false,
            index:3,
            action:0,
            isLoading:false,
            pass:'',
            result:null,
        }
    }
    dialogContent=(index)=>{
        if(index==1){
            return (
                <View style={{flex:1,alignItems:'center'}}>
                    <View style={{width:width*0.8,height:50,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center',elevation:10}}>
                        <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Kiểm duyệt thông tin</Text>
                    </View>
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
                    <TouchableOpacity onPress={()=>this.setState({normalDialog:false})}>
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
    uploadData=()=>{
        //Bo be
        var ref=firebase.app().firestore().collection('coreData').doc('checkedDatabase').collection('bokhung');
        for(i=0;i<bocaiData.length;i++){
            var {id,ten_vi,type,photo,nhacungcap,xuatxu,chidanmuahang,masp,giaban,id_list,stt,hienthi,donvi,capdoantoan,giaohangtannha,tenkhongdau,link} = bocaiData[i];
            ref.doc("data number "+(i+1)).set({
                id,ten_vi,type,photo,nhacungcap,xuatxu,chidanmuahang,masp,giaban,id_list,stt,hienthi,donvi,capdoantoan,giaohangtannha,tenkhongdau,link
            })
            .then(result=>{
                this.setState({status:'Completed'})
            })
        }
    }
    checkData=()=>{
        /*
        var ref=firebaseApp.firestore().collection('coreData').doc('checkedDatabase').collection('boto');
        ref.get().then((snapshot)=>{
            snapshot.forEach((doc) =>{
                console.log(doc.id,'=>',doc.data());
        }).then(()=>{
            this.setState({status:'Completed'})
        }).catch((err)=>{
            console.log('Error getting documents',err);
        })
    })
    */
    //
    /*
    var array=[];
   firebase.app().firestore().collection('coreData').doc('checkedDatabase').collection('bobe')
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
      this.setState({data:array})
    })
    .catch((err) =>{
      console.log('Error getting documents',err);
    }) */
    // Check Auto ID Method :
    /*
    var id=null; 
    firebase.app().firestore().collection('AutoID').doc('baseID').get().then((doc)=>{
        id=doc.data().id;
        this.setState({status:'Completed'})
    }).then(()=>{
    // Check AUto ID Increase Method:
    firebase.app().firestore().collection('AutoID').doc('baseID').update({
        id:(parseInt(id)+1).toString()
        
    })
    })
    
    // Firebase Add Upload Unchecked Database
    /*
   firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source')
   .doc('551').set({
        capdoantoan:'87 Kg; (N: 100 cm; C: 98 cm)',
        chidanmuahang:'Đức Hòa, Long An',
        donvi:'CON; (~ 74K/KG)',
        giaban:'6400000',
        giaohangtannha:'Thích hợp gây bò giống',
        hienthi:'1',
        id:'551',
        id_list:'2',
        link:'http://alobo.vn/san-pham/be-duc-lai-sind-4-thang-tuoi-551.html',
        masp:'ALOBO7134',
        nhacungcap:'Chú Bảy Hùng/ 09.885.12.885',
        photo:'alobo-34-4280.jpg',
        stt:'1',
        ten_vi:'BÊ ĐỰC, LAI SIND, 4 THÁNG TUỔI',
        tenkhongdau:'be-duc-lai-sind-4-thang-tuoi',
        type:'product',
        xuatxu:'Đức Hòa, Long An'
   }).then(()=>{
       this.setState({status:'Completed'})
   })
   */
   // Firebase Delete Uncheck Database.
   /*
   firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source')
   .doc('551').delete()
   .then(()=>{
       this.setState({status:'Completed'})
   })
   
   // Firebase Uncheck Database to Uploaded and Add to some list.
   firebase.app().firestore().collection('coreData').doc('uncheckedDatabase').collection('source').doc('551').get()
   .then((doc)=>{
        firebase.app().firestore().collection('coreData').doc('uploadedDatabase').collection('source').doc('551').set({
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
       this.setState({status:'Completed'})
   })*/
    }
    showDialog=()=>{
        this.setState({normalDialog:true}) 
        this.setState({status:'Completed'})
    }
  render() {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            {this.renderDialog()}
        <Text> Status: {this.state.status}</Text>
        <Button 
            title='Upload Data'
            onPress={()=>{
                this.setState({status:'Loading'})
                this.uploadData();
            }}
        />
      </View>
    )
  }
}

export default UploadData