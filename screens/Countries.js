import React, { useState , useCallback, useEffect} from 'react'
import {View,Text,StyleSheet, TextInput , Button ,ScrollView , RefreshControl , ActivityIndicator , Image , FlatList } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {CountryData,CountriesData} from '../api/data'


const CountryDiv = (data)=>{
    return <>
        <View style={styles.country}>
            <Image style={styles.countryImg} source={{uri: data.data.countryInfo.flag}}/>
            <View style={styles.countryInfo}>
                <Text style={{fontSize: 14, textAlign: "center",fontWeight: "bold",width: "100%", backgroundColor: "#BC808E",borderRadius: 10,color: "white"}}>{data.data.country}</Text>
                <Text style={{fontSize: 14,fontWeight: "bold"}}>Cases: <Text style={{fontWeight: "normal"}}>{data.data.cases}</Text></Text>
                <Text style={{fontSize: 14,fontWeight: "bold"}}>Recovered: <Text style={{fontWeight: "normal"}}>{data.data.recovered}</Text></Text>
                <Text style={{fontSize: 14,fontWeight: "bold"}}>Active: <Text style={{fontWeight: "normal"}}>{data.data.active}</Text></Text>
                <Text style={{fontSize: 14,fontWeight: "bold"}}>Deaths: <Text style={{fontWeight: "normal"}}>{data.data.deaths}</Text></Text>
            </View>
        </View>
    </>
}


const Countries = ()=>{

    const [searchval,setSearchval] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const [apiData,setApiData] = useState([])
    const [loading,setLoading] = useState(true)
    const [mounted,setMounted] = useState(true)

    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
    }
      
    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        wait(200).then(()=>{
            CountriesData().then((res)=>{
                setApiData(res.data)
                if(mounted) setLoading(false)
                setRefreshing(false)
                setSearchval("")
            }).catch(err=>console.log(err))
        })
    },[])

    const SearchCountry = ()=>{
        CountryData(searchval).then((res)=>{
            setApiData([res.data])
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        CountriesData().then((res)=>{
            setApiData(res.data)
            if(mounted) setLoading(false)
        }).catch(err=>console.log(err))

        return ()=> {
            console.log("Lost Focus")
            setMounted(false)
        }
    },[])

    const RenderCountry = (data)=>{
        return <>
            <CountryDiv data={data.item}></CountryDiv>
        </>
    }
    
    return (
        <>
            {
                loading 
                ?   <View style={{...styles.container,justifyContent: "center",alignItems: "center"}}>
                        <ActivityIndicator size="large" color="#00ff00"/>
                     </View> 
                :   <View style={styles.container}>
                        <View style={styles.searchDiv}>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray',borderBottomWidth: 2,marginBottom: 10}}
                                placeholder="Search Country"
                                onChangeText={text => setSearchval(text)}
                                value={searchval}/>
                            <Button onPress={()=>SearchCountry()} color="#BC808E" title="Search"></Button>
                        </View>
                        <FlatList
                                style={styles.countriesDiv}
                                data={apiData}
                                renderItem={RenderCountry}
                                keyExtractor={item => item.country}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }/>
                    </View>
             }
           
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    searchDiv: {
        display: "flex",
    },
    countriesDiv: {
        flexGrow: 1,
        // backgroundColor: "#BEA5AA",
        marginTop: 10,
    },
    country: {
        width: "100%",
        padding: 5,
        height: 100,
        position: "relative",
        flexDirection: "row",
    },
    countryImg: {
        flex: 0.4,
        paddingRight: 5,
        resizeMode: "stretch",
        width: "100%",
        height: "100%"
    },
    countryInfo: {
        flex: 0.6,
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: "space-around",
    }
})

export default Countries