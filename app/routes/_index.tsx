import type { V2_MetaFunction } from "@remix-run/node";
import { useOptionalUser } from "~/utils";
import {  BackgroudImageCard } from "~/components/BackgroundImageCard";
import { Header } from "~/components/Header";
import { BottomNavigation } from "~/components/BottomNavigation";
import type { LoaderArgs } from "@remix-run/node";
import { requireUser } from "~/session.server";
import {  redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {  type Profile } from "~/models/profile.server";
import { getProfileWithEscorts } from "~/models/profile.server";

export const meta: V2_MetaFunction = () => [{ title: "Hook Me Up" }];

export const loader = async ({ request }: LoaderArgs) => {
    const user = await requireUser(request);
     if (user.profile === null) {
        return redirect("/setProfile")
    }
    const profiles = await getProfileWithEscorts();
    return  profiles;
};

export default function Index() {
    const user = useOptionalUser();
    const profiles = useLoaderData()
    return (<>
            <Header user={user} />  
            <div className="grid grid-cols-1 w-full h-full md:grid-cols-6 gap-2">
                {profiles.map((profile: Profile) =>  <BackgroudImageCard key={profile.id} profile={profile}/>)}
            </div>
            <BottomNavigation/>
        </>
    )
}




