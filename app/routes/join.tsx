import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId, getUser } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import { useSubmit } from "@remix-run/react";
import {unstable_parseMultipartFormData, unstable_createFileUploadHandler, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler} from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
   const formData = await request.formData();
  // const uploadHandler = unstable_composeUploadHandlers(
  //   unstable_createFileUploadHandler({
  //     maxPartSize: 5_000_000,
  //     file: ({ filename }) => filename,
  //   }), unstable_createMemoryUploadHandler()
  //   );

  // const formData = await unstable_parseMultipartFormData(
  //     request,
  //     uploadHandler
  // );

  //const file = formData.get("file") as File;
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const userType = formData.get("userType");
  console.log(userType);
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password, userType, firstName, lastName);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [userType, setUserType] = useState("");
  const submit = useSubmit();

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }

    console.log(userType);
  }, [actionData, userType]);

  function onUserChange(e: any) {
    setUserType(e.target.value)
  }
  

  function onformSubmit(e){
    let formData = new FormData();
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current
    const email = emailRef.current;
    const password = passwordRef.current
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password)
    formData.append("userType", userType);
    submit(formData, {
      method: "post",
      action: "/join"
    })
  }

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <form method="post" className="space-y-6">
          <div>
            <label 
              htmlFor="firstName"
              className="block text-sm font-medium text-white">
                First Name
              </label>
              <div>
                <input
                  ref={firstNameRef}
                  id="firstName"
                  required
                  autoFocus={true}
                  name="firstName"
                  type="text"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg">
                </input>
              </div>
            
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white">
                Last Name
              </label>
              <div>
                <input
                ref={lastNameRef}
                id="lastName"
                required
                autoFocus={true}
                name="lastName"
                type="text"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"></input>
              </div>
            
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email ? (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
          </div>
                       
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              ) : null}
            </div>
          </div>
         
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Account Tyoe</h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                      <input  
                      id="horizontal-list-radio-client" 
                      type="radio" 
                      name="userType" 
                      value="client"
                      checked={userType === "client"}
                      onChange={onUserChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                      <label htmlFor="horizontal-list-radio-client" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client</label>
                  </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                      <input 
                      id="horizontal-list-radio-escort" 
                      type="radio"  
                      name="userType"   
                      value="escort"
                      checked={userType === "escort"}
                      onChange={onUserChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                      <label htmlFor="horizontal-list-radio-escort" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Escort</label>
                  </div>
              </li>
          </ul>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            onClick={onformSubmit}
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                className="text-blue-300 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
