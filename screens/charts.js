import React, { useEffect, useState } from 'react'
import {View, Text ,StyleSheet , Dimensions} from 'react-native'
import {
    PieChart,
    LineChart,
} from "react-native-chart-kit";

import {getContinentsData} from '../api/data'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



export const WorldCasesPieChart = ()=>{

    const [apidata,setApiData] = useState([])
    const [colors,setColors] = useState(["#E51E72","#F465BD","#F49FFF","#EDD4FF","#BC808E","#BEA5AA","#F7F5DD"])

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    useEffect(()=>{
        getContinentsData().then((res)=>{
            let data = res.data.map((data,index)=>{
                return {
                    name: data.continent,
                    cases: data.cases,
                    color: colors[index],
                    legendFontColor: "black",
                    legendFontSize: 12
                }
            })
            setApiData(data)
        }).catch(err=>console.log(err))
    },[])

    
      return <>
        <View style={{padding: 0}}>
        <PieChart
            data={apidata}
            width={screenWidth*0.90}
            height={screenHeight*0.35}
            chartConfig={chartConfig}
            accessor="cases"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute={false}
            hasLegend={true}
            />
        </View>
      </>
  }


  export const PhilippineCasesChart = ({apidataHistory})=>{

    let daysarray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  
    const prepareData = (ObjectData,ArrayData)=>{
        let x = 0
        for(let property in ObjectData){
            if((Object.keys(ObjectData).length - x) <= 8){
                ArrayData.push({property:property,cases:ObjectData[property]})
            }
            x++
        }
    }

    const Cases = apidataHistory.timeline.cases
    const Deaths = apidataHistory.timeline.deaths
    const Recovered = apidataHistory.timeline.recovered
    const lastCases = []
    const lastDeaths = []
    const lastRecovered = []

    prepareData(Cases,lastCases)
    prepareData(Recovered,lastRecovered)
    prepareData(Deaths,lastDeaths)

    let labelsarray = lastCases.map((lc)=>{
        let lcdate = new Date(lc.property)
        let lcday = lcdate.getDay()
        return daysarray[lcday]
    })

    let casesData = []
    let deathsData = []
    let recoveredData = []

    for(let x = 0 ; x < lastCases.length ; x++){
        if(x > 0) {
            casesData.push(lastCases[x].cases - lastCases[x-1].cases)
            deathsData.push(lastDeaths[x].cases - lastDeaths[x-1].cases)
            recoveredData.push(lastRecovered[x].cases - lastRecovered[x-1].cases)
        }
    }


    const chartConfig={
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    }

      const apidata = {
        labels: labelsarray,
        datasets: [
            {
                data: casesData,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
            },
            {
                data: deathsData,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
            },
            {
                data: recoveredData,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0,102,0, ${opacity})`, // optional
            },
        ],
        legend: ['Cases', 'Deaths', 'Recovered'],
    }

      return <>
              <LineChart
					bezier
					data={apidata}
                    width={screenWidth*1}
                    height={screenHeight*0.55}
                    absolute={true}
                    hasLegend={true}
					chartConfig={chartConfig}
					style={{
                        marginVertical: 8,
                        flexGrow: 1,
					}}
				/>
      </>
  }