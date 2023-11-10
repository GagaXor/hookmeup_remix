import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import invariant from "tiny-invariant";
import { deleteNote } from "~/models/note.server";
import { getProfileById } from "~/models/profile.server";
import { requireUserId } from "~/session.server";
import EscortProfile from "~/components/EscortProfile";
import { Header } from "~/components/Header";
export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request);
  invariant(params.escortId, "Profile not found");

  const escort = await getProfileById(params.escortId);
  if (!escort) {
    throw new Response("Not found", {status: 404});
  }

  return json(escort);

  // const note = await getNote({ id: params.noteId, userId });
  // if (!note) {
  //   throw new Response("Not Found", { status: 404 });
  // }
  // return json(note);

};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ id: params.noteId, userId });

  return redirect("/notes");
};

export default function EscortDetail(){
  const profile = useLoaderData<typeof loader>();

    return (<div>
        <Header/>
        <EscortProfile/>
    </div>)
}

export function ErrorBoundary() {
    const error = useRouteError();
  
    if (error instanceof Error) {
      return <div>An unexpected error occurred: {error.message}</div>;
    }
  
    if (!isRouteErrorResponse(error)) {
      return <h1>Unknown Error</h1>;
    }
  
    if (error.status === 404) {
      return <div>Note not found</div>;
    }
  
    return <div>An unexpected error occurred: {error.statusText}</div>;
  }