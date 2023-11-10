import {BsFillPatchCheckFill, BsStarFill} from "react-icons/bs"
import {HiX, HiHeart } from "react-icons/hi"
import {GiHouse} from "react-icons/gi"
import {ImLocation2} from "react-icons/im"
import {GoDotFill} from "react-icons/go"
import { type Profile } from "@prisma/client"
import { Link } from "@remix-run/react"

export function BackgroudImageCard(data: any) {
    const profile: Profile = data.profile;
    const profileId = profile.id;
    return (<div className="bg-center bg-no-repeat bg-[url('/berry.jpeg')] bg-gray-500 bg-blend-multiply">
                <div className="grid grid-cols-1 ml-7 mt-40 mb-7">
                    <div  className="flex ... justify-between">
                        <div className="flex ...">
                            <GoDotFill className="fill-green-400 text-2xl "/>
                            <p className=" text-white text-center ... my-auto">Active</p>
                            
                        </div>

                        <Link  to={`/escort/${profileId}`}><button className="bg-blue-600 text-sm px-2 text-white rounded-full hover:bg-blue-500  mr-5 pt-1 pb-1">View Profile</button></Link>           
                        
                    </div>
                    <div className="flex ... text-white gap-2 ">
                        <p className="font-bold text-xl">{profile.fullName}</p>
                        <p className="my-auto">23</p>
                        <BsFillPatchCheckFill className="my-auto fill-blue-500 text-lg"/>
                    </div>
                    <div className="flex ... text-white gap-2 ">
                        <GiHouse className="my-auto  text-lg"/>
                        <p className="">Lives in {profile.city.name}</p>
                        
                    </div>
                    <div className="flex ... text-white gap-2 mb-2">
                        <ImLocation2 className="my-auto  text-lg"/>
                        <p className=" ">3 km away</p>
                    </div>
                    
                    <div className="flex justify-between ...  mx-12 ">
                        <div className="rounded-full ... p-2 outline outline-red-600 hover:outline-red-400 ">
                            <HiX className="fill-red-600 hover:fill-red-400 text-2xl mx-auto"/>
                        </div>
                        <div className="rounded-full ... outline outline-yellow-300 hover:outline-yellow-200 p-2">
                            <BsStarFill className="fill-yellow-300 hover:fill-yellow-200 text-2xl"/>
                        </div>
                        <div className="rounded-full ... outline outline-green-500 hover:outline-green-400 p-2">
                            <HiHeart className="fill-green-500 hover:fill-green-400 text-2xl"/>
                        </div>

                    </div>
                </div>
            </div>

    )
}