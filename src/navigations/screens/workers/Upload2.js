import React, { Component } from 'react'
import { Text, View,ImageBackground,StyleSheet,ActivityIndicator,Dimensions,TouchableOpacity,Image,TextInput,ScrollView,KeyboardAvoidingView } from 'react-native'
import Toast from 'react-native-easy-toast'
import { Actions } from 'react-native-router-flux';
import { UPLOAD3 } from '../config/screenName';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from 'react-native-firebase'
const {width,height} = Dimensions.get('window');

export class Upload2 extends Component {
  constructor(props){
    super(props);
    
    this.state = {
                    isLoading:false,
                    amount:1,
                    nhacungcap:this.props.customerName.concat(' / ',this.props.phone),//
                    xuatxu:this.props.address,
                    customerName:this.props.customerName,
                    phone:this.props.phone,
                    chidanmuahang:this.props.address,
                    photo:this.props.avatarSourceMain,
                    masp:'ALOBO8724',
                    type:'',
                    gender:'male',
                    age:'',
                    color:'',
                    price:'',
                    weight:'',
                    width:'',
                    height:'',
                    id_list:'',
                    capdoantoan:'',
                    giaohangtannha:'',
    }
  }
  componentDidMount(){
    this.setState({isLoading:true});
    firebase.app().firestore().collection('AutoID').doc('baseID').get().then((doc)=>{
      
      this.setState({masp:'ALOBO'+doc.data().id})
  }).then(()=>{
    this.setState({isLoading:false})
  })
  }
  gotoUpload3(){
    
    console.log({
                    nhacungcap:this.state.nhacungcap,
                    xuatxu:this.state.address,
                    chidanmuahang:this.state.chidanmuahang,
                    photo:this.state.photo,
                    masp:this.state.masp,
                    type:this.state.type,
                    gender:this.state.gender,
                    age:this.state.age,
                    color:this.state.color,
                    price:this.state.price,
                    weight:this.state.weight,
                    width:this.state.width,
                    height:this.state.height,
                    id_list:this.state.id_list,
                    capdoantoan:this.state.capdoantoan,
                    giaohangtannha:this.state.giaohangtannha,
    })
    console.log('New Database.')
    // Change donvi:
    var donvi = null;
    if(parseInt(this.state.price)>0){
      donvi=' VNĐ / CON;'
    }else{
      donvi='THƯƠNG LƯỢNG'
    }
    //Chage ten_vi
    var ten_vi = null;
    if(this.state.amount>1){
      ten_vi = this.state.amount+' ';
    }
    if(this.state.id_list===2){
      ten_vi='BÊ ';
    }else{
      ten_vi='BÒ ';
    }

    if(this.state.gender==='male'){
      ten_vi=ten_vi+'ĐỰC';
    }else{
      ten_vi=ten_vi+'CÁI';
    }

    if(this.state.color!==''){
      ten_vi=ten_vi+', '+this.state.color+' '+this.state.type.toLocaleUpperCase()
    }else{
      ten_vi=ten_vi+', '+this.state.type.toLocaleUpperCase()
    }

    ten_vi=ten_vi+', ' + this.state.age + ' THÁNG TUỔI, '+'['+this.state.masp+']'

    console.log({
      capdoantoan:this.state.weight +' Kg; (N: '+this.state.width+' cm; C: '+this.state.height+' cm)',
      chidanmuahang:this.state.chidanmuahang,
      donvi:donvi,
      giaban:(parseInt(this.state.price)*1000000).toString(),
      giaohangtannha:this.state.giaohangtannha,
      id_list:this.state.id_list,
      masp:this.state.masp,
      nhacungcap:this.state.nhacungcap,
      photo:this.state.photo,
      ten_vi:ten_vi,
      xuatxu:this.state.chidanmuahang
    })
    Actions.push(UPLOAD3,{
      capdoantoan:this.state.weight +' Kg; (N: '+this.state.width+' cm; C: '+this.state.height+' cm)',
      chidanmuahang:this.state.chidanmuahang,
      donvi:donvi,
      giaban:(parseInt(this.state.price)*1000000).toString(),
      customerName:this.props.customerName,
      phone:this.props.phone,
      giaohangtannha:this.state.giaohangtannha,
      id_list:this.state.id_list,
      masp:this.state.masp,
      nhacungcap:this.state.nhacungcap,
      photo:this.state.photo,
      ten_vi:ten_vi,
      xuatxu:this.state.chidanmuahang
    });
  }
  render() {
    if(this.state.isLoading){
      return (<ImageBackground source={require('../assets/images/global/background-collect.png')} style={{flex:1,alignItems:'center'}}>
        {/*Top Bar*/}
        <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}>
            <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5f4339'}} onPress={()=>Actions.pop()}>
            <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
            <Image source={require('../assets/images/worker/back.png')} style={{marginRight:7,marginTop:2,width:8,height:16}}/>
            <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Trở về</Text>
            
            </View>
            </TouchableOpacity>
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Cập nhật thông tin</Text>
            </View>
            <TouchableOpacity onPress={()=>this.gotoUpload3()} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5f4339'}}>
            <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
            <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Tiếp theo</Text>
            <Image source={require('../assets/images/worker/next.png')} style={{marginLeft:7,marginTop:2,width:8,height:16}}/>
            </View>
            </TouchableOpacity>
          </View>
        {/*EOF Top Bar*/}
        <ActivityIndicator />
      </ImageBackground>)
    }
    return (
      <ImageBackground source={require('../assets/images/global/background-collect.png')} style={{flex:1}}>
        <Toast  ref = "toast"/>
        {/*Top Bar*/}
        <View style={{width:width,height:height*0.07,backgroundColor:'#8E572B',flexDirection:'row',elevation:10}}>
            <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5f4339'}} onPress={()=>Actions.pop()}>
            <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
            <Image source={require('../assets/images/worker/back.png')} style={{marginRight:7,marginTop:2,width:8,height:16}}/>
            <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Trở về</Text>
            
            </View>
            </TouchableOpacity>
            <View  style={{flex:2,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:16}}>Cập nhật thông tin</Text>
            </View>
            <TouchableOpacity onPress={()=>this.gotoUpload3()} style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5f4339'}}>
            <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
            <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Tiếp theo</Text>
            <Image source={require('../assets/images/worker/next.png')} style={{marginLeft:7,marginTop:2,width:8,height:16}}/>
            </View>
            </TouchableOpacity>
          </View>
        {/*EOF Top Bar*/}
        <ScrollView style={{flex:1}}>
          {/*EOF Top Bar*/}
        {/*Body Content*/}
          {/*Image From Camera*/}
          <View style={{width:width,height:height*.35,alignItems:'center',justifyContent:'center'}}>
            <Image 
              style={{marginTop:20,borderColor:'#8E572B',borderRadius:height*.15 ,width:height*0.3,height:height*0.3,borderWidth:2,backgroundColor:'white'}}
              source={{uri:this.state.photo}}
            />
            
          </View>
          <View style={{flexDirection:'row',height:40,width:width, justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{
                if(this.state.amount>1){
                this.setState({amount:this.state.amount-1})
                }
              }}>
                  <View style={{elevation:5,width:40,height:30,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>-</Text>
                  </View>
              </TouchableOpacity>
              <View style={{marginLeft:10,width:40,height:30,backgroundColor:'white',borderRadius:2,borderColor:'#8E572B',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'black',fontSize:12}}>{this.state.amount}</Text>
                  </View>
              <TouchableOpacity
                onPress={()=>{
                  this.setState({amount:this.state.amount+1})
                }}
              >
                  <View style={{elevation:5,marginLeft:10,width:40,height:30,backgroundColor:'#8E572B',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>+</Text>
                  </View>
              </TouchableOpacity>
            </View>
          {/*EOF Image From Camera*/}
          {/*Form Get*/}
          <View style={{height:height*0.5,width:width,alignItems:'center',justifyContent:'center',marginTop:4}}>
            {/*Mã bò + Chủng loại*/}
            <View style={{flexDirection:'row',width:width*0.95}}>
            
            {/*Mã bò*/}
            <View  style={{padding:1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Mã bò:</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Mã số"
                  keyboardType='numeric'
                  value={this.state.masp}
                  editable={false}
                  placeholderTextColor="grey"
                  style={{width:width*0.2+8,height:height*0.06,color:'red',marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({idNumber:text})}
                />
              </View>
            </View>
            {/*Chủng loại*/}
            <View  style={{padding:1,marginLeft:width*0.05,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Chủng loại:</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Loại"
                  autoCapitalize='words'
                  placeholderTextColor="grey"
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({type:text})}
                />
              </View>
            </View>
            </View>
            {/*EOF Mã bò + Chủng loại*/}
            {/*Giới tính + Tháng tuổi*/}
            <View style={{flexDirection:'row',width:width*0.95}}>
            
            {/*Giới tính*/}
            <View  style={{padding:1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Giới tính:</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30,flexDirection:'row'}}>
                <View style={this.state.gender === 'male' ? {flex:1,backgroundColor:'skyblue',borderRightWidth:1,borderColor:'#8E572B',alignItems:'center',justifyContent:'center'}:{flex:1,backgroundColor:'white',borderRightWidth:1,borderColor:'#8E572B',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>this.setState({gender:'male'})} >
                  <Image source={require('../assets/images/worker/male.png')} style={{width:24,height:24}}/>
                  </TouchableOpacity>
                </View>
                <View style={this.state.gender === 'male' ? {flex:1,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30,alignItems:'center',justifyContent:'center'}:{flex:1,backgroundColor:'#f8bbd0',borderTopRightRadius:30,borderBottomRightRadius:30,alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>this.setState({gender:'female'})}>
                  <Image source={require('../assets/images/worker/female.png')} style={{width:16,height:24}}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*Tháng tuổi*/}
            <View  style={{padding:1,marginLeft:width*0.05,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Tháng tuổi:</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Nhập số"
                  keyboardType='number-pad'
                  placeholderTextColor="grey"
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({age:text})}
                />
              </View>
            </View>
            </View>
            {/*EOF Giới tính + Tháng tuổi*/}
            {/*Màu sắc + Giá bán*/}
            <View style={{flexDirection:'row',width:width*0.95}}>
            
            {/*Màu sắc*/}
            <View  style={{padding:1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Màu sắc:</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Màu"
                  autoCapitalize='words'
                  placeholderTextColor="grey"
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({color:text})}
                />
              </View>
            </View>
            {/*Giá bán*/}
            <View  style={{padding:1,marginLeft:width*0.05,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Giá</Text>  
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>(triệu đồng)</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Nhập số"
                  keyboardType='number-pad'
                  placeholderTextColor="grey"
                  
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({price:text})}
                />
              </View>
            </View>
            </View>
            {/*EOF Mã bò + Chủng loại*/}
            
            <View style={{flexDirection:'row',width:width*0.95}}>
              {/*Phân loại*/}
            <View  style={{padding:1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Phân loại:</Text>  
              </View>
              
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderTopRightRadius:30,borderBottomRightRadius:30}}>
              <ModalDropdown 
                style={styles.dropdown_1}
                options={['Bò Bê', 'Bò Tơ','Bò Cái','Bò Thịt','Bò Vỗ']}
                defaultValue='Chọn loại ...'
                defaultIndex={0}
                onSelect={(idx, value) => {
                  switch(idx.toString()){
                    case "0":
                      this.setState({id_list:'2'});
                      break;
                    case "1":
                      this.setState({id_list:'4'});
                      break;
                    case "2":
                      this.setState({id_list:'3'});
                      break;
                    case "3":
                      this.setState({id_list:'1'});
                      break;
                    case "4":
                      this.setState({id_list:'5'});
                      break;
                    default:
                      break;
                  } 
                  
                }}
                textStyle={{color:'black'}}
                dropdownStyle={{width:100 }}
                />
              </View>
            </View>
            {/*Cân nặng*/}
            <View  style={{padding:1,marginLeft:width*0.05,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Cân nặng</Text>  
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>(kg)</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Nhập số"
                  keyboardType='number-pad'
                  placeholderTextColor="grey"
                  
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({weight:text})}
                />
              </View>
            </View>
            </View>
            
            {/*Chiều cao + Chiều ngang*/}
            <View style={{flexDirection:'row',width:width*0.95}}>
            
            {/*Màu sắc*/}
            <View  style={{padding:1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Chiều cao</Text>  
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>(cm)</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Nhập số"
                  keyboardType='number-pad'
                  placeholderTextColor="grey"
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({height:text})}
                />
              </View>
            </View>
            {/*Giá bán*/}
            <View  style={{padding:1,marginLeft:width*0.05,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.45,marginBottom:10}}>          
              <View style={{width:width*0.15+16,height:height*0.06-4,borderTopLeftRadius:30,borderBottomLeftRadius:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>Chiều ngang</Text>  
                <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:12}}>(cm)</Text>  
              </View>
              <View style={{flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Nhập số"
                  keyboardType='number-pad'
                  placeholderTextColor="grey"
                  
                  style={{width:width*0.2+8,height:height*0.06,marginLeft:2,textAlign:'center',fontFamily:'Myriad Pro',fontSize:12}}
                  onChangeText={(text)=>this.setState({width:text})}
                />
              </View>
            </View>
            </View>
            {/*EOF Mã bò + Chủng loại*/}
            {/*Thêm ghi chú*/}
            <KeyboardAvoidingView behavior={'height'} style={{paddingRight:1,flexDirection:'row',alignItems:'center',backgroundColor:'#8E572B',borderRadius:30,borderWidth:1.5,borderColor:'#8E572B',height:height*.06,width:width*0.95,marginBottom:10}}>          
              <Text style={{fontFamily:'Myriad-Pro',color:'white',fontSize:14,marginLeft:12}}>Ghi chú:</Text>
              <View style={{marginLeft:10,flex:1,height:height*0.06-4,backgroundColor:'white',borderTopRightRadius:30,borderBottomRightRadius:30}}>
                <TextInput 
                  placeholder="Thêm ghi chú"
                  placeholderTextColor="grey"
                  style={{width:width*0.65+8,height:height*0.06,marginLeft:10,textAlign:'center',fontFamily:'Myriad Pro',fontSize:14}}
                  onChangeText={(text)=>this.setState({giaohangtannha:text})}
                />
              </View>
            </KeyboardAvoidingView> 

          </View>
          {/*EOF Form Get*/}
          
          
        {/*EOF Body Content*/}
        </ScrollView> 

      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  dropdown_2_dropdown: {
   
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
})
export default Upload2
