import { Header } from "~/components/Header";
import { BottomNavigation } from "~/components/BottomNavigation";
import MyProfile from "~/components/MyProfile";
import { useUser } from "~/utils";
import type { LoaderArgs  } from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { requireUser } from "~/session.server";
import { getProfileByUserId } from "~/models/profile.server";
import moment from "moment"
import { isRouteErrorResponse, useLoaderData, useRouteError} from "@remix-run/react";
import { getEscortByProfile } from "~/models/escort.server";

export const loader = async ({ request }: LoaderArgs) => {
    const user = await requireUser(request);
    if (!user.profile) {
      return redirect("/setProfile");
    }

    const profile = await getProfileByUserId(user.id)
    if(profile?.userType === "ESCORT") {
      const escort = await getEscortByProfile(profile.id)
      if (!escort) {
        return redirect("/setEscortProfile")
      }
    }

    const age = moment().diff(moment(profile?.dob, "YYYY-MM-DD"), 'years')
    console.log(profile)
    return {...profile, age};
    
}

export default function ProfilePage() {
    const user = useUser();
    const profile = useLoaderData();
    return (<>
    <Header user={user}/>
    <MyProfile profile={profile}/>
    <BottomNavigation/>
    </>)
}

export function ErrorBoundary() {
    const error = useRouteError();
  
    if (error instanceof Error) {
      return <div>An unexpected error occurred: {error.message}</div>;
    }
  
    if (!isRouteErrorResponse(error)) {
      return <h1>Unknown Error</h1>;
    }
  
   
    return <div>An unexpected error occurred: {error.statusText}</div>;
  }