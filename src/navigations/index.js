import React, { PureComponent } from 'react'
import { Scene, Router, Tabs, Stack, Drawer } from 'react-native-router-flux'
import { transitionConfig,getSceneStyle } from './configs/transitionConfig'
//import scene here
import Upload1 from './screens/workers/Upload1'
import Upload2 from './screens/workers/Upload2'
import Upload3 from './screens/workers/Upload3'
import Check1 from './screens/workers/Check1'
import Check2 from './screens/workers/Check2'
import DetailScreen from './screens/customers/DetailScreen'
import MainScreen from './screens/customers/MainScreen'
import Login from './screens/authentication/Login'
import SignUp from './screens/authentication/SignUp'
import UploadData from './screens/authentication/UploadData'
import Choosing from './screens/authentication/Choosing'
import DrawerMenu from './screens/drawer/DrawerMenu'
import DrawerMenuCus from './screens/drawer/DrawerMenuCus'

export default class AppNavigator extends PureComponent {
   doNothing(){}
    render(){
        return(
            <Router getSceneStyle={getSceneStyle}
            >
                <Stack key='root' gesturesEnabled={true} transitionConfig={transitionConfig} >
                    <Scene
                        key='Login'
                        component={Login}
                        swipeEnabled={false}
                        panHandlers={null}
                        hideNavBar
                        initial
                    />
                    <Scene
                        key='SignUp'
                        component={SignUp}
                        hideNavBar
                        
                    />
                    <Scene
                        key='Choosing'
                        component={Choosing}
                        hideNavBar
                    />
                    {/*
                    <Scene
                        key='Upload'
                        component={UploadData}
                        hideNavBar
                        
                    />*/}
                    <Drawer 
                        hideNavBar
                        key='drawer'
                        panHandlers= {null}
                        contentComponent= {DrawerMenu}
                        drawerWidth={300}
                        
                    >
                    
                    <Scene
                        key='home'
                        hideNavBar 
                        panHandlers={null}
                        transitionConfig={transitionConfig}
                    >
                        
                        <Scene 
                            key='Upload1'
                            component={Upload1}
                            hideNavBar
                            
                        />
                        <Scene 
                            key='Upload2'
                            component={Upload2}
                            hideNavBar
                            
                        />
                        <Scene 
                            key='Upload3'
                            component={Upload3}
                            hideNavBar
                            
                        />
                        <Scene 
                            key='Check1'
                            component={Check1}
                            hideNavBar
                            
                        />
                        <Scene 
                            key='Check2'
                            component={Check2}
                            hideNavBar
                            
                        />
                       
                    </Scene>
                </Drawer>
                    <Drawer 
                        hideNavBar
                        key='drawerCus'
                        panHandlers= {null}
                        contentComponent= {DrawerMenuCus}
                        drawerWidth={300}
                        
                    >
                    <Scene
                        key='customer'
                        hideNavBar 
                        panHandlers={null}
                        transitionConfig={transitionConfig}
                    >
                        <Scene 
                            key='MainScreen'
                            component={MainScreen}
                            hideNavBar
                            
                        />
                        <Scene 
                            key='DetailScreen'
                            component={DetailScreen}
                            hideNavBar
                        />
                    </Scene>
                    </Drawer>
                </Stack>
            </Router>
        )
    }
}
