import { Box } from "@radix-ui/themes";
import { ReactElement } from "react";

const AuthComponentWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <Box className="min-h-[94vh] flex flex-row justify-center items-center py-10 w-[100vw]">
      <Box className="bg-blue-60 min-w-[30%] border-2 border-slate-900 p-5 rounded-lg bg-slate-200">
        {children}
      </Box>
    </Box>
  );
};

export default AuthComponentWrapper;
