import { Box, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="flex flex-row justify-center h-8 bg-gray-100 items-center gap-2 w-full">
      <Text>Product by</Text>
      <Link
        to={"https://www.linkedin.com/in/abhishekpathak32/"}
        target="_blank"
        className="text-red-500"
      >
        Abhishek Pathak🍕
      </Link>
    </Box>
  );
};

export default Footer;
