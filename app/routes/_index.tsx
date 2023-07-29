import type { V2_MetaFunction } from "@remix-run/node";
import { useOptionalUser } from "~/utils";
import {  BackgroudImageCard } from "~/components/BackgroundImageCard";
import { Header } from "~/components/Header";
import { BottomNavigation } from "~/components/BottomNavigation";
import type { LoaderArgs } from "@remix-run/node";
import { requireUser } from "~/session.server";
import { json } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async ({ request }: LoaderArgs) => {
    const user = await requireUser(request);
    if (!user) {
        return json(user)
    }
    return  user; //json({ noteListItems });
};

export default function Index() {
    const user = useOptionalUser();
    return (<>
            <Header user={user} />  
            <div className="grid grid-cols-1 w-full h-full">
                <BackgroudImageCard user={user}/>
            </div>
            <BottomNavigation/>
        </>
        )
}




