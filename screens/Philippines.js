import React, { useEffect, useState , useCallback } from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Image,Dimensions,ScrollView,RefreshControl} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {PhilippineCasesChart} from './charts'
import {PhGetData,PhGetHistory} from '../api/data'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Philippines = ()=>{

    const [PhData,setPhData] = useState(null)
    const [PhHistory,setPhHistory] = useState(null)
    const [loading,setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [mounted,setMounted] = useState(true)

    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

      
    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        wait(200).then(()=>{
            setMounted(true)
            init()
            setRefreshing(false)
        })
    },[])

    const init = ()=>{
         PhGetData().then((res)=>{
             console.log(res.data)
            setPhData(res.data)
            return
         }).then(()=>PhGetHistory())
         .then((res)=>{
            setPhHistory(res.data)
            return
         }).finally(()=>{
            if(mounted) setLoading(false)
         }).catch(err=>console.log(err))
    }
    
    // // call only once when component is rendered
    useEffect(()=>{
         setMounted(true)
         init()
         return function cleanup() {
            console.log("Lost Focus")
            setMounted(false)
            // implement cancelling of api request when component changed
        }
    },[])

    // // always call when screen is focused , better approach if api is need to always call when Component is rendered
    // useFocusEffect(
    //     useCallback(()=>{
    //         setMounted(true)
    //         init()
    //         return ()=> {
    //             console.log("Lost Focus")
    //             setMounted(false)
    //         }
    //     },[])
    // )

    return (
        <>
           
                {loading 
                ? <View style={{...styles.container,justifyContent: "center",alignItems: "center"}}>
                        <ActivityIndicator size="large" color="#00ff00"/>
                  </View> 
                : <View style={styles.container}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}} contentInsetAdjustmentBehavior="automatic" refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                        <View style={styles.info}>
                            <View style={styles.infomap}>
                                <Image style={styles.infomapImage}   source={{
                                     uri: PhData.countryInfo.flag,
                                }}/>
                            </View>
                            <View style={styles.infocases}>
                                    <Text style={{fontSize: 14, textAlign: "center",fontWeight: "bold",width: "100%", backgroundColor: "#e51e72",borderRadius: 10,color: "white"}}>Philippines</Text>
                                    <Text style={{fontSize: 14,fontWeight: "bold"}}>Cases: <Text style={{fontWeight: "normal"}}>{PhData.cases}</Text></Text>
                                    <Text style={{fontSize: 14,fontWeight: "bold"}}>Recovered: <Text style={{fontWeight: "normal"}}>{PhData.recovered}</Text></Text>
                                    <Text style={{fontSize: 14,fontWeight: "bold"}}>Active: <Text style={{fontWeight: "normal"}}>{PhData.cases-PhData.recovered}</Text></Text>
                                    <Text style={{fontSize: 14,fontWeight: "bold"}}>Deaths: <Text style={{fontWeight: "normal"}}>{PhData.deaths}</Text></Text>
                                </View>
                        </View>
                        <View style={styles.chart}>
                            <Text style={{fontWeight: "bold",fontSize: 14}}>Data last 7 Days</Text>
                            <PhilippineCasesChart apidataHistory={PhHistory}/>
                        </View>
                    </ScrollView>
                 </View>
                }
                
         
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    info: {
        // flex: 0.20,
        flexDirection: "row",
        height: screenHeight*0.20
    },
    infomap: {
        flexGrow: 1,
        position: "relative",
        justifyContent: "center",
        // alignItems: "center",
    },
    infomapImage: {
        position: "absolute",
        width: "90%",
        height: "90%",
        alignSelf: "center",
        resizeMode: 'stretch',
    },
    infocases: {
        flexGrow: 1,
        flex:1,
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 10
    },
    chart: {
        // flex: 0.80,
        backgroundColor: "white",
        flexGrow:1,
        alignItems: "center"
    }
})

export default Philippines