import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction,  } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import type { V2_MetaFunction } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import {  getUser } from "~/session.server";
import { json } from "@remix-run/node";


export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];


export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  return json({user})
};

export default function App() {
  
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-slate-700">  
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js"></script>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <Outlet  />
        <ScrollRestoration /> 
        <Scripts />      
        <LiveReload />
      </body>
    </html>
  );
}
