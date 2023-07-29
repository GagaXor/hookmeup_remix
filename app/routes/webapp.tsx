import { useEffect } from 'react';
import {useTelegram} from "bot-web-app/dist/reactjs";

export default function Index() {
useEffect(()=> {
  if (typeof window !== "undefined"){
    const telegram = window.Telegram.WebApp;
  console.log(telegram)
  }
  
})
    return <div>
      
    </div>
}