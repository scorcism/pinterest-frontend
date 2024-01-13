import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const Header = () => {

  const navigate = useNavigate();

  return (
    <Box className="h-[6vh] px-3">
      <Flex direction="row" justify="between" align="center" className="h-full">
        <Flex justify="between" gap="6">
          <Heading as="h2" size="4">
            <Link
              to="/"
              style={{
                backgroundClip: "text",
                backgroundImage: "linear-gradient(90deg, red, blue)",
                color: "transparent",
              }}
            >
              Memories
            </Link>
          </Heading>
          <Heading as="h2" size="4">
            <Link to="/">Explore</Link>
          </Heading>

          <Heading as="h2" size="4">
            <Link to="/create">Create</Link>
          </Heading>
        </Flex>
        <Flex justify="between" gap="3" align="center" className="h-full">
          <Fragment>
            <Button className="cursor-pointer" variant="solid" color="red">
              <Link to="/login">Login</Link>
            </Button>
            <Button className="cursor-pointer" variant="solid" color="red">
              <Link to="/register">Signup</Link>
            </Button>
          </Fragment>
          <CircleUserRound size="35" className="cursor-pointer" onClick={()=> navigate("/settings")} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
