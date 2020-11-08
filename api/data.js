import Axios from 'axios'


export const getContinentsData = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Axios.get('https://corona.lmao.ninja/v2/continents').then(res=>resolve(res)).catch(err=>reject(err))
        },0)
    })
}

export const getTotalData = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Axios.get('https://corona.lmao.ninja/v2/all').then(res=>resolve(res)).catch(err=>reject(err))
        },0)
    })
}

export const PhGetData = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Axios.get(`https://corona.lmao.ninja/v2/countries/Philippines`).then((res)=>resolve(res)).catch((err)=>reject(err))
        },0)
    })
}

export const PhGetHistory = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Axios.get(`https://corona.lmao.ninja/v2/historical/Philippines`).then((res)=>resolve(res)).catch((err)=>reject(err))
        },0)
    })
}


export const CountriesData = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Axios.get('https://corona.lmao.ninja/v2/countries').then(res=>resolve(res)).catch(err=>reject(err))
        },500)
    })
}

export const CountryData = (country)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Axios.get(`https://corona.lmao.ninja/v2/countries/${country}`).then(res=>resolve(res)).catch(err=>reject(err))
        },500)
    })
}