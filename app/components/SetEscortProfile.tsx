import { Form } from "@remix-run/react";
import { Button } from "flowbite-react";

export default  function Index() {
    return <Form className="p-3 grid grid-cols-1 gap-2" method="post" action="/setEscortProfile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-2 ...">
                <div>
                        <label htmlFor="sexualOrientation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexual Orientation</label>
                        <select required id="sexualOrientation" name="sexualOrientation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Sexual Orientaion</option>
                            <option value="male">Straight</option>
                            <option value="female">Bisexual</option>
                            <option value="female">Gay</option>

                        </select>
                    </div> 

                    <div>
                        <label htmlFor="build" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Build</label>
                        <select required id="build" name="build" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >How are you built?</option>
                            <option value="male">Curvy</option>
                            <option value="female">Slim</option>
                            <option value="female">Petite</option>

                        </select>
                    </div> 

                    <div>
                        <label htmlFor="bustSize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bust Size</label>
                        <select required id="bustSize" name="bustSize" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >What's your bust size?</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div> 

                    <div>
                        <label htmlFor="education" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Education</label>
                        <select required id="education" name="education" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Secondary</option>
                            <option value="female">Masters</option>
                            <option value="male">Bachelor</option>
                            <option value="female">Phd</option>
                            <option value="female">Diploma</option>

                        </select>
                    </div> 

                    <div>
                        <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Occupation</label>
                        <input id="occupation" name="occupation" required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>

                    <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Smoker</label>
                        <select required id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Yes/No</option>
                            <option value="male">Yes</option>
                            <option value="female">No</option>
                        </select>
                    </div> 
                </div>  
            
            <input hidden readOnly name="profilePictureUrl" value="/public/file.jpeg" ></input>
            {/*** <img src={selectedImage} alt=""></img> **/}
            </div>            
            <div>   
                <Button type="submit">Update Profile</Button>
            </div>
        
        </Form>
}
