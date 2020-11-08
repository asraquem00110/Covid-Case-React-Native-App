import React, { useCallback, useEffect, useState } from 'react'
import {View, Text ,StyleSheet , ScrollView , RefreshControl , ActivityIndicator} from 'react-native'

import {getContinentsData , getTotalData} from '../api/data'
import {WorldCasesPieChart} from './charts'
import * as Animatable from 'react-native-animatable'
import { useFocusEffect } from '@react-navigation/native'
const World  = ()=>{

    const [totalData,setTotalData] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    const [loading,setLoading] = useState(true)

    // useEffect(()=>{
    //     let mounted = true
    //     getTotalData().then((res)=>{
    //         console.log(res.data)
    //         setTotalData(res.data)
    //         if(mounted) setLoading(false)
    //     }).catch(err=>console.log(err))

    //     return ()=>{
    //         mounted = false
    //     }
    // },[])

    useFocusEffect(useCallback(()=>{
        let mounted = true
        getTotalData().then((res)=>{
            console.log(res.data)
            setTotalData(res.data)
            if(mounted) setLoading(false)
        }).catch(err=>console.log(err))

        return ()=>{
            mounted = false
        }
    },[]))

    useFocusEffect(useCallback(()=>{
        console.log("runs only if refreshing var changes and if the screen is being focused")
    },[refreshing]))

    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        wait(100).then(()=>{
            getTotalData().then((res)=>{
                setTotalData(res.data)
                setRefreshing(false)
            }).catch(err=>console.log(err))
           
        })
    },[])

    return (
        <>
            {
                loading 
                ?   <View style={{...styles.container,justifyContent: "center",alignItems: "center"}}>
                        <ActivityIndicator size="large" color="#00ff00"/>
                    </View> 
                : 
                <View style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}} contentInsetAdjustmentBehavior="automatic" refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={styles.details}>
                            <View style={{...styles.detailsItem}}>
                                    <Animatable.View animation="bounceInLeft" duration={1000} style={{...styles.item, backgroundColor: "#E198A9"}}>
                                        <Text style={styles.itemCaption}>Affected Countries</Text>
                                        <Text style={styles.itemValue}>{totalData.affectedCountries}</Text>
                                    </Animatable.View>
                                    <Animatable.View animation="bounceInRight" duration={1000} style={{...styles.item, backgroundColor: "#E198A9"}}>
                                        <Text style={styles.itemCaption}>Total Cases</Text>
                                        <Text style={styles.itemValue}>{totalData.cases}</Text>
                                    </Animatable.View>
                                    
                            </View>
                            <View style={styles.detailsItem}>
                                    <Animatable.View animation="bounceInLeft" duration={1000} style={{...styles.item, backgroundColor: "#68BAA6"}}>
                                        <Text style={styles.itemCaption}>Total Recoveries</Text>
                                        <Text style={styles.itemValue}>{totalData.recovered}</Text>
                                    </Animatable.View>
                                    <Animatable.View animation="bounceInRight" duration={1000} style={{...styles.item, backgroundColor: "#68BAA6"}}>
                                        <Text style={styles.itemCaption}>Total Deaths</Text>
                                        <Text style={styles.itemValue}>{totalData.deaths}</Text>
                                    </Animatable.View>
                            </View>
                    </View>
                    <Animatable.View animation="fadeInUpBig" duration={1000} style={styles.pieChart}>
                        <WorldCasesPieChart/>
                    </Animatable.View>
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
    details: {
        flex: 0.40,
    },
    detailsItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },  
    item: {
        flex: 1,
        height: "100%",
        margin: 5,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    itemCaption: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white"
    },
    itemValue: {
        fontSize: 14,
        color: "white"
    },
    pieChart: {
        flex: 0.60,
        justifyContent: "center"
    }
})


export default World