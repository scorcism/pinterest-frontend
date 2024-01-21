import { Box } from "@radix-ui/themes";
import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <Box className="flex w-12 flex-row justify-center">
      <SyncLoader size="5px"/>
    </Box>
  );
};

export default Loader;
