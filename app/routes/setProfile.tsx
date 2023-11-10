import { requireUser, requireUserId } from "~/session.server";
import { getAllCountries } from "~/models/country.server";
import { json,  type LoaderArgs, type ActionArgs, redirect} from "@remix-run/node";
import { createProfile, } from "~/models/profile.server";
import SetProfile from "~/components/SetProfile";
import { useRouteError } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
    const user = await requireUser(request);
    if (user.profile !== null) {
        return redirect("/myProfile");
    }
   
    await requireUser(request);
    const counties = await getAllCountries();
    return json(counties);
    
}

export const action = async ({request}: ActionArgs) => {
    const userId = await requireUserId(request);
    const formData = await request.formData();

    const id = formData.get("username");
    const fullname = formData.get("fullname");
    const dob = new Date(formData.get("dob"));
    const cityId = formData.get("city");
    const gender = formData.get("gender");
    const phone = formData.get("phone");
    const usertype = formData.get("userType");
    const bio = formData.get("bio");
    const profilePictureUrl = formData.get("profilePictureUrl")
    
   const profile = await createProfile(id, fullname, dob, cityId,gender, phone, usertype, bio, userId,profilePictureUrl )
    if (!profile) {
        return null
    }
    return redirect("/myProfile");
}

export default function Index() {
    return <>
    <SetProfile/>
    </>
}

export function ErrorBoundary(){
    const error = useRouteError()
    console.log(error)
}

