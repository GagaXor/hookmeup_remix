import { City, State } from "@prisma/client";
import { Label, Modal, Select } from "flowbite-react"
import { useEffect, useState } from "react";
import { Country } from "~/models/country.server";

export default function Index(props: any){ 
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([])

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

    return (
    <Modal show={props.openModal} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Search Escorts</Modal.Header>
        <Modal.Body>
        <div className="flex flex-wrap gap-2">
        <div className="w-25">
        <Label htmlFor="country">Country</Label>
          <Select id="country" defaultValue="center" onChange={onCountrySelect} className="text-xs" >
            <option value="center">All Countries</option>
            {countryList.map((country: Country) => 
                <option key={country.id} value={country.id}>{country.name}</option>)}
    
          </Select>
        </div>

        <div className="w-25">
            <Label htmlFor="state">State</Label>
          <Select id="state" defaultValue="center" onChange={onStateSelect}>
          <option defaultValue="">All States</option>
            {stateList.map ((state: State) => 
                <option key={state.id} value={state.id}>{state.name}</option>)}
          </Select>
        </div>

        <div className="w-25">
        <Label htmlFor="city">City</Label>
          <Select id="city" defaultValue="center" onChange={(event) => props.setModalPlacement(event.target.value)}>
          <option defaultValue="">All Cities</option>
            {cityList.map ((city: City) => 
            <option key={city.id} value={city.id}>{city.name}</option>)}
          </Select>
        </div>

        <div className="w-25">
            <Label htmlFor="gender">City</Label>          
            <Select id="gender" defaultValue="center" onChange={(event) => props.setModalPlacement(event.target.value)}>
            <option value="center">Center</option>
            <option value="top-left">Top left</option>
            <option value="top-center">Top center</option>
            <option value="top-right">Top right</option>
            <option value="center-left">Center left</option>
            <option value="center-right">Center right</option>
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-center">Bottom center</option>
            <option value="bottom-left">Bottom left</option>
          </Select>
        </div>
      </div>
        </Modal.Body>
    </Modal>)
}