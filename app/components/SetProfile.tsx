import type { Country, State, City } from "@prisma/client";
import { useLoaderData, Form } from "@remix-run/react";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useOptionalUser } from "~/utils";
import { Header } from "./Header";

export default  function SetProfile() {
    const user = useOptionalUser();
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([])
    //const [selectedImage, setSelectedImage] = useState()

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

    const countries = useLoaderData();

    return <div className="grid grid-cols-1">
        <Header user={user}/>
        <Form className="p-3 grid grid-cols-1 gap-2" method="post" action="/setProfile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-2 ...">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input id="username" name="username" required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>

                    <div>
                        <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input id="fullname" name="fullname" required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>

                    <div>
                        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                        <input id="dob" name="dob" required type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>

                    <div>
                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <select required  onChange={onCountrySelect} id="country" name="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="">Choose a country</option>
                                {countries.map((country: Country) => 
                                    <option key={country.id} value={country.id}>{country.name}</option>)}
                                
                            </select>
                    </div>

                    <div>
                        <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                        <select required onChange={onStateSelect} id="state" name="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option defaultValue="">Choose a state</option>
                            {stateList.map ((state: State) => 
                                <option key={state.id} value={state.id}>{state.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                        <select required id="city" name="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option defaultValue="">Choose your city</option>
                            {cityList.map ((city: City) => 
                                <option key={city.id} value={city.id}>{city.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select required id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Select a Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div> 
                
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input id="phone" name="phone" required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>

                    <div>
                        <label htmlFor="userType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Type</label>
                        <select required id="userType" name="userType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Select a user type</option>
                            <option  value="CLIENT">Client</option>
                            <option value="ESCORT">Escort</option>
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tell us freaky things about you</label>
                        <input aria-required id="bio" minLength={4} maxLength={147} name="bio" required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-20 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                </div>  
            
            <input hidden readOnly name="profilePictureUrl" value="/public/file.jpeg" ></input>
            {/*** <img src={selectedImage} alt=""></img> **/}
            </div>            
            <div>   
                <Button type="submit">Update Profile</Button>
            </div>
        
        </Form>
    </div>
}
