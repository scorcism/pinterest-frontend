import { Box, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box className="h-[94vh] w-[100vw] flex flex-col items-center justify-center">
      <Heading
        style={{
          backgroundClip: "text",
          backgroundImage: "linear-gradient(90deg, blue, red)",
          color: "transparent",
        }}
        size="8"
      >
        Page Not Found
      </Heading>
      <Link className="text-red-800 underline text-base" to="/">
        Home
      </Link>
    </Box>
  );
};

export default NotFound;
