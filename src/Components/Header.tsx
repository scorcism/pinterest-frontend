import { Box, Button, DropdownMenu, Flex, Heading } from "@radix-ui/themes";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import Cookies from "js-cookie";

const Header = () => {
  const auth_token = Cookies.get("AUTH_TOKEN");
  const navigate = useNavigate();

  const logoutUser = () => {
    Cookies.remove("AUTH_TOKEN");
    Cookies.remove("AUTH_EMAIL");
    navigate("/login");
  };

  return (
    <Box className="h-[6vh] px-3 py-7">
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
          {auth_token && (
            <Heading as="h2" size="4">
              <Link to="/create">Create</Link>
            </Heading>
          )}
        </Flex>
        <Flex justify="between" gap="3" align="center" className="h-full">
          <Fragment>
            {!auth_token ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="cursor-pointer"
                  variant="solid"
                  color="red"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="cursor-pointer"
                  variant="solid"
                  color="red"
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft" size="2">
                      <CircleUserRound
                        color="black"
                        size="35"
                        className="cursor-pointer"
                      />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="2">
                    <DropdownMenu.Item
                      shortcut="🍕"
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/profile/${Cookies.get("AUTH_USERNAME")}`)
                      }
                    >
                      Profile
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      shortcut="🥬"
                      className="cursor-pointer"
                      onClick={() => navigate("/settings")}
                    >
                      Settings
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />

                    <DropdownMenu.Item
                      color="red"
                      className="cursor-pointer"
                      shortcut="👋"
                      onClick={logoutUser}
                    >
                      Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </>
            )}
          </Fragment>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
