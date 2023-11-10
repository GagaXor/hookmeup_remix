import { Header } from "~/components/Header";
import { useOptionalUser } from "~/utils";
import Escorts from "~/components/Escorts/Index";

export default function Index() {
    const user = useOptionalUser();    
    return <div >
        <Header user={user}/>
        <Escorts/>
    </div>
}