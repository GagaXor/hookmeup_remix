import { useState } from "react";
import type {  Profile } from "@prisma/client";
import { BackgroudImageCard } from "~/components/BackgroundImageCard";
import SearchComponent from "~/components/Escorts/SearchComponent";


export default function Escorts() {
    const [profiles, setProfiles] = useState([]);   
    
    return <div className="grid grid-cols-1" >
        <SearchComponent setProfiles={setProfiles} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {profiles.map((profile: Profile) => <BackgroudImageCard key={profile.id} profile={profile} /> )} 
        </div>
    </div>
}