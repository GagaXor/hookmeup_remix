import { Header } from "~/components/Header"
import { useOptionalUser } from "~/utils";
import {  useState } from "react";
import { Country, getAllCountries } from "~/models/country.server";
import { json,  type LoaderArgs, } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
export type { Country, State } from "@prisma/client";
import { requireUser } from "~/session.server";
import { City, State } from "@prisma/client";

export const loader = async ({ request }: LoaderArgs) => {
    await requireUser(request);
    const counties = await getAllCountries();
    return json(counties);
}



export default function SetProfile() {
    const user = useOptionalUser();
    const [file, setFile] = useState("");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([])

    function handleChange(e: any) {
        console.log(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
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

    return <div >
        <Header user={user}/>
        <Form>
        <div className="grid grid-cols-1 md:grid-cols-3 p-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 col-span-2 ...">
                <div>
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <select onChange={onCountrySelect} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue="">Choose a country</option>
                    {countries.map((country: Country) => 
                        <option key={country.id} value={country.id}>{country.name}</option>)}
                    
                </select>
                </div>

                <div>
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                <select onChange={onStateSelect} id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue="">Choose a state</option>
                    {stateList.map ((state: State) => 
                        <option key={state.id} value={state.id}>{state.name}</option>)}
                </select>
                </div>


                <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <select  id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue="">Choose a city</option>
                    {cityList.map ((city: City) => 
                        <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>
                </div>


                <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                <select id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>


                <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input id="phone" type="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>

                
            </div>
            <div className="grid grid-cols-2 p-3">
                <div  className="grid grid-cols-1 ...">
                    <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white md:mt-3">Add Image:</label>
                    <input id="picture" name="picture" type="file" onChange={handleChange} />
                </div>
            
                <img src={file} />
            </div>

            <button className="bg" type="submit">Submit</button>
        </div>
        </Form>
    </div>
}

export function ErrorBoundary({ error }) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
  