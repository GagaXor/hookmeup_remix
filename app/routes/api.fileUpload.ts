import type { ActionArgs } from "@remix-run/node";
import { unstable_createFileUploadHandler, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        maxPartSize: 5_000_000,
        file: ({ filename }) => filename,
        directory: ".public/uploads"
      }),
      // parse everything else into memory
      unstable_createMemoryUploadHandler()
    );
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
  
    const file = formData.get("picture");
    console.log(file)
    // file is a "NodeOnDiskFile" which implements the "File" API
    // ... etc
    return {};
  };

 