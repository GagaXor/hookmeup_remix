import { requireUser, requireUserId } from "~/session.server";
import { getAllCountries } from "~/models/country.server";
import { json,  type LoaderArgs,  redirect, type ActionArgs, } from "@remix-run/node";
import {  getProfileByUserId } from "~/models/profile.server";
import SetEscortProfile from "~/components/SetEscortProfile";
import { useOptionalUser } from "~/utils";
import { Header } from "~/components/Header";
import { createEscort } from "~/models/escort.server";

export const loader = async ({ request }: LoaderArgs) => {
    const userId = await requireUserId(request)
    const profile = await getProfileByUserId(userId);
       if (profile) {
        if (profile?.userType !== "ESCORT"){
            if(profile?.escort){
                return redirect("/setEscortProfile");
            }
            return redirect("myProfile");
        }
    }
    await requireUser(request);
    const countries = await getAllCountries();
    return json(countries);
}

export const action = async ({request}: ActionArgs) => {
    const userId = await requireUserId(request);
    const profile = await getProfileByUserId(userId);

    const formData = await request.formData();

    const sexualOrientation = formData.get("sexualOrientation");
    const build = formData.get("build");
    const bustSize = formData.get("bustSize");
    const occupation = formData.get("occupation");
    const education = formData.get("education");
    const smoker = formData.get("smoker");
    
    
   const escort = await createEscort(sexualOrientation, build, bustSize, occupation,education, smoker, profile?.id )
    if (!escort) {
        return null
    }
    return redirect("/myProfile");
}

export default function Index(){
    const user = useOptionalUser();

    return (<div   className="grid grid-cols-1">
         <Header user={user}/>
        <SetEscortProfile />
    </div>)
}