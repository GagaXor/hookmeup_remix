import type { Country, State, City } from "@prisma/client";
import { useEffect, useState } from "react";


export default function Index(data: any){
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [showState, setShowState] = useState(false);
    const [showCity, setShowCity] = useState(false);
    const [showGender, setShowGender] = useState(false);
    const [showOrt, setShowOrt] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    
    const {setProfiles} = data;


    useEffect(()=>{
        async function fetchCountries(){
            const resposne = await fetch("/api/country/all");
            const countries = await resposne.json();
            setCountryList(countries)
        }
        fetchCountries();

       
    }, [])


    async function onCountrySelect (e: any) {
        const countryId = e.target.value;
        const resposne = await fetch("/api/country/" + countryId);
        const states = await resposne.json();
        setStateList(states)
    }

    async function onStateSelect(e:any) {
        const stateId = e.target.value;
        const response = await fetch("/api/state/" + stateId)
        const cities = await response.json();
        setCityList(cities);
    }

    async function selectCountryEscorts(e: any){
        const countryId = e.target.value;
        const resposne = await fetch("/api/escorts/country/" + countryId);
        const escorts = await resposne.json();
        setProfiles(escorts)
        console.log(escorts)
    }

    async function selectStateEscorts(e: any){
        const countryId = e.target.value;
        const resposne = await fetch("/api/escorts/country/" + countryId);
        const escorts = await resposne.json();
        setProfiles(escorts)
        console.log(escorts)
    }

    async function selectCityEscorts(e: any){
        const countryId = e.target.value;
        const resposne = await fetch("/api/escorts/country/" + countryId);
        const escorts = await resposne.json();
        setProfiles(escorts)
        console.log(escorts)
    }

    async function filterEscort(e: any, filter: string){
            if (filter === "country") {
                await selectCountryEscorts(e);
             } else if (filter === "state") {
                await selectStateEscorts(e);
             } else if (filter === "city") {
                await selectCityEscorts(e);
             }
    }


    return (<div className="flex ... overflow-x-auto gap-2 p-4">
    <select id="country" defaultValue="center" onChange={(e)=> {
        onCountrySelect(e);
        filterEscort(e, "country");
        setShowState(true);
    }} className="shrink-0 w-21 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
        <option value="center">All Countries</option>
        {countryList.map((country: Country) => 
            <option key={country.id} value={country.id} >{country.name} </option>)}

    </select>


{showState && 
    <select id="state" defaultValue="center" onChange={(e)=> {
        onStateSelect(e);
        filterEscort(e, "state");
        setShowCity(true);
    }} className="shrink-0 w-21 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue="">All States</option>
        {stateList.map ((state: State) => 
            <option key={state.id} value={state.id}>{state.name} </option>)}
    </select>}

{showCity && <div className="w-25">
    <select id="city" defaultValue="center" onChange={(e)=> {
        setShowGender(true);
        filterEscort(e, "city");
    }} className="shrink-0 w-21 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue="">All Cities</option>
        {cityList.map ((city: City) => 
        <option key={city.id} value={city.id}>{city.name}</option>)}
    </select>
</div>}

{showGender && <select id="gender" defaultValue="center" onChange={(e)=> {
        setShowOrt(true);
    }} className="shrink-0 w-21 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>}

{showOrt && <select id="sexOrientation" defaultValue="center"  onChange={(e)=> {
        onStateSelect(e);
        setShowOrder(true);
    }} className="shrink-0 w-21 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="center">Sexual Orientation</option>
        <option>Straight</option>
        <option>Bisexual</option>
        <option>Lesbian</option>
        <option>Gay</option>
        <option>Transexual</option>
        <option>Mistress(Domination)</option>
        <option>Master(Domination)</option>
    </select>}

{showOrder &&
    <select id="filter" defaultValue="center"  className="shrink-0 w-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
        <option value="center">Premium | New</option>
        <option>Premium</option>
        <option>New</option>
    </select>}
</div>)
}