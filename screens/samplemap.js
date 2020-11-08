import React, { useEffect , useState , useCallback} from 'react'
import {View,Text , StyleSheet , ScrollView, Button , ActivityIndicator , RefreshControl, Image} from 'react-native'
import {CountriesData} from '../api/data'
import MapView, { PROVIDER_GOOGLE , Marker , Callout  } from 'react-native-maps'; 

const Map = ()=>{

    const [refreshing, setRefreshing] = useState(false)
    const [apiData,setApiData] = useState([])
    const [loading,setLoading] = useState(true)
    const [mounted,setMounted] = useState(true)

    const [region,setRegion] = useState({
        latitude: 12.8797,
        longitude: 121.7740,
        latitudeDelta: 10,
        longitudeDelta: 50,
    })

    const [mymap,setMymap] = useState({})

    const onPressEvent = (e)=>{
        console.log(e)
    }

    const onLongPressEvent = (e)=>{
        // alert("long press")
    }
    const clickbutton = ()=>{
        console.log(mymap)
        // mymap.animateToRegion({
        //     latitude: 37.78825,
        //     longitude: -122.4324,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        // },2)
        setRegion({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        setTimeout(()=>{
            CountriesData().then((res)=>{
                setApiData(res.data)
                if(mounted) setLoading(false)
                setRefreshing(false)
            }).catch(err=>console.log(err))
        },200)
  
    },[])

    useEffect(()=>{
        CountriesData().then((res)=>{
            console.log(res.data)
            setApiData(res.data)
            if(mounted) setLoading(false)
        }).catch(err=>console.log(err))

        return ()=> {
            console.log("Lost Focus")
            setMounted(false)
        }
    },[])

    return (
        <>
        {
            loading
            ?   <View style={{...styles.container,justifyContent: "center",alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View> 
            :  <View style={styles.container}>
                    {/* <Button title="test" onPress={()=>clickbutton()}></Button> */}
                    <Text style={{padding:5,backgroundColor: "#BC808E",color: "white",fontSize: 16}}>Affected Countries: </Text>
                    <View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor:"dimgray"}} contentInsetAdjustmentBehavior="automatic"  refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }>
                        <MapView
                            ref={mapview=>setMymap(mapview)}
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            loadingEnabled={true}
                            // onPress={(e)=>{onPressEvent(e.nativeEvent)}}
                            // onDoublePress={(e)=>{onPressEvent(e.nativeEvent)}}
                            // onPanDrag={(e)=>{onPressEvent(e.nativeEvent)}}
                            // onPoiClick={(e)=>{onPressEvent(e.nativeEvent)}}
                            // onLongPress={(e)=>{onLongPressEvent(e.nativeEvent)}}
                            // mapType="standard"
                            // showsUserLocation={true}
                            region={region}
                            >
                                {
                                    apiData.map((country,index)=> ( 
                                            <Marker 
                                                // draggable 
                                                key={index}
                                                coordinate={{latitude: country.countryInfo.lat,longitude: country.countryInfo.long}} 
                                                >
                                                <Image style={{height: 20,width:40}} source={{uri: country.countryInfo.flag}}/>
                                                <Callout style={{flex: 1,position:"relative"}}>
                                                    <Text style={{flex: 1,marginBottom: 10}}>{country.country}</Text>
                                                    <Text style={{flex: 1}}>Cases: {country.cases}</Text>
                                                    <Text style={{flex: 1}}>Recovered: {country.recovered}</Text>
                                                    <Text style={{flex: 1}}>Active: {country.active}</Text>
                                                    <Text style={{flex: 1}}>Deaths: {country.deaths}</Text>
                                                </Callout>
                                            </Marker>
                                    ))
                                }

                            </MapView>
                        </ScrollView>
                    </View>
                </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default Map