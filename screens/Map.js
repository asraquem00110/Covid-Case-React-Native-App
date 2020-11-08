import React, { useEffect , useState , useCallback} from 'react'
import {View,Text , StyleSheet , ScrollView, Button , ActivityIndicator , RefreshControl, Image , Platform} from 'react-native'
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

    const [mymap,setMymap] = useState(null)

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
                  
                     <View style={{width: "100%", zIndex: 2,position: "absolute", elevation: (Platform.OS === 'android') ? 50 : 0}}>
                            <ScrollView contentInsetAdjustmentBehavior="automatic"  refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }>
                            <Text style={{padding:5,backgroundColor: "#BC808E",color: "white",fontSize: 16}}>Affected Countries: {apiData.length}</Text>
                            </ScrollView>
                    </View>
                    <View style={{flex: 1}}>
                   
                        <MapView
                            ref={mapview=>setMymap(mapview)}
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            loadingEnabled={true}
                            region={region}
                            >
                                {
                                    apiData.map((country,index)=> ( 
                                            <Marker 
                                                // draggable 
                                                key={index}
                                                coordinate={{latitude: country.countryInfo.lat,longitude: country.countryInfo.long}} 
                                                >
                                                <Image style={{height: 20,width:20}} source={{uri: country.countryInfo.flag}}/>
                                                <Callout style={{ flex: -1, position: 'absolute', width:300}}>
                                     
                                                        <Text style={{marginBottom: 10}}>{country.country}</Text>
                                                        <Text>Cases: {country.cases}</Text>
                                                        <Text>Recovered: {country.recovered}</Text>
                                                        <Text>Active: {country.active}</Text>
                                                        <Text>Deaths: {country.deaths}</Text>
                                              
                                                </Callout>
                                            </Marker>
                                    ))
                                }

                            </MapView>
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