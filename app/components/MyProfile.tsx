import { Tabs  } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';
import { Button } from "flowbite-react";

export default function MyProfile(data: any) {
    const profile = data.profile;

    return <div className="grid grid-cols-1 gap-4 p-3">
        <div className="flex ... justify-between"> 
            <div className="flex ... gap-2">
                <img className="h-20 w-20  rounded-full" src={profile?.profilePictureUrl} alt=""></img>
                <p className="text-white font-bold my-auto">{profile?.fullName}</p>
            </div>
            <Button color="def" className="bg-blue-600 text-white">Edit Profile</Button>
        </div>
    <Tabs.Group
      aria-label="Tabs with underline"
    >
     <Tabs.Item active title="About" icon={HiUserCircle} >
                <div className="grid grid-cols-1 gap-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div >
                            <p className="text-white font-bold font-sans">USER NAME</p>
                            <p className="text-white">{profile?.id}</p>
                        </div>

                        <div>
                            <p className="text-white font-bold font-sans">DISPLAY NAME</p>
                            <p className="text-white">{profile?.fullName}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div >
                            <p className="text-white font-bold font-sans">EMAIL</p>
                            <p className="text-white text-sm overflow-auto ">{profile.email}</p>
                        </div>

                        <div>
                            <p className="text-white font-bold font-sans">AGE</p>
                            <p className="text-white">{profile.age}</p>
                        </div>
                    </div>

                     <div className="grid grid-cols-2 gap-2">
                        <div >
                            <p className="text-white font-bold font-sans">PHONE NUMBER</p>
                            <p className="text-white">{profile?.phone}</p>
                        </div>

                        <div>
                            <p className="text-white font-bold font-sans">COUNTRY</p>
                            <p className="text-white">{profile?.fullName}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-white font-bold font-sans">CITY</p>
                            <p className="text-white">{profile?.fullName}</p>
                        </div>
                    </div>

                    
                </div>
            </Tabs.Item>
            {profile.userType === "ESCORT" && <Tabs.Item  title="Escort Information" icon={HiUserCircle}>
                <div>
                    <div className="flex ... justify-end"> 
                        <Button color="def" className="bg-blue-600 text-white">Edit Info</Button>
                    </div>
                </div>
               
            </Tabs.Item>}

            <Tabs.Item  title="Reviews" icon={HiUserCircle} >
                <div className="grid grid-cols-2">
                   <div>
                    <p>Username</p>
                    <p>viktordragan</p>
                   </div>
                </div>
            </Tabs.Item>

            <Tabs.Item  title="Pictures" icon={HiUserCircle} >
                <div className="grid grid-cols-2">
                   <image></image>
                </div>
            </Tabs.Item>
    </Tabs.Group>
    </div>
}
