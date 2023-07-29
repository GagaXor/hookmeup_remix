import { Header } from "~/components/Header";
import { BottomNavigation } from "~/components/BottomNavigation";
import Profile from "~/components/Profile";
import { useOptionalUser } from "~/utils";

export default function ProfilePage() {
    const user = useOptionalUser();

    return (<>
    <Header user={user}/>
    <Profile/>
    <BottomNavigation/>
    </>)
}