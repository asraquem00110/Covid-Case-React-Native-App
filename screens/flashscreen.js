import React from 'react'
import {View, Text ,StyleSheet ,Image , Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
const FlashScreen  = ()=>{
    return (
        <>
            <View style={styles.container}>
                <Animatable.Image 
                style={styles.logo} 
                source={require('../assets/img/logo.png')} 
                resizeMode="stretch"
                animation="bounceIn"
                duration={1500}
                />
                <Animatable.Text 
                    animation="bounceIn"
                    duration={1500}
                    style={{fontSize: 20,fontWeight: "bold",color: "dimgray"}}>
                    <Text style={{color: "#e51e72"}}>CO</Text><Text style={{color: "#4066B0"}}>VID</Text>-19 Updates
                </Animatable.Text>
            </View>
        </>
    )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: height_logo,
        height: height_logo
    }
})


export default FlashScreen