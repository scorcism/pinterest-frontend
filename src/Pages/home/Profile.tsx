import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetUserMetaDataUsingUserNameQuery } from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import Cookies from "js-cookie";

const Profile = () => {
  const parans = useParams();

  const username = parans.username;
  const navigate = useNavigate();
  const auth_token = Cookies.get("AUTH_TOKEN");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    about: "",
  });
  const [shareText, setShareText] = useState("Share");
  const [trigger, getUserDataResult] =
    useLazyGetUserMetaDataUsingUserNameQuery();

  const getUserData = async () => {
    await trigger({ username });
  };

  useEffect(() => {
    if (getUserDataResult.isSuccess) {
      setUserData(getUserDataResult.data.data.data);
    }
  }, [getUserDataResult.isLoading]);

  useEffect(() => {
    getUserData();
  }, [username]);

  return (
    <>
      {getUserDataResult.isError && <Box></Box>}
      {userData == null && <NotFound />}
      {username && userData != null && (
        <Box className="flex flex-col items-center gap-5">
          <Flex direction="column" gap="5" align="center">
            <Heading
              size="9"
              className="bg-green-600 inline-block w-20 h-20 rounded-full text-center text-white"
            >
              {username.charAt(0)}
            </Heading>
          </Flex>
          <Flex direction="row" gap="3" align="center" position="relative">
            <Heading
              size="8"
              style={{
                backgroundClip: "text",
                backgroundImage: "linear-gradient(90deg, red, blue)",
                color: "transparent",
              }}
            >
              {userData.firstname} {userData.lastname}
            </Heading>
          </Flex>
          <Box className="w-[50%] text-center flex flex-col gap-2">
            <Text size="3">@{username}</Text>
            <Text className="rounded-2xl w-full" size="3">
              {userData.about}
            </Text>
          </Box>
          <Box className="flex flex-row gap-5">
            <Button
              size="3"
              radius="full"
              className="bg-black/20 text-black cursor-pointer"
              onClick={() => {
                setShareText("Copied");
                window.navigator.clipboard.writeText(window.location.href);
                setTimeout(() => {
                  setShareText("Share");
                }, 2000);
              }}
            >
              {shareText}
            </Button>
            {auth_token && (
              <Button
                size="3"
                radius="full"
                className="bg-black/20 text-black cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
          <Flex direction="row" gap="7">
            <Heading
              color="crimson"
              size="4"
              className="my-5 border-none hover:bg-gray-400/20 py-2 px-5 rounded-lg cursor-pointer transition duration-300"
            >
              All Posts
            </Heading>
            <Heading
              color="crimson"
              size="4"
              className="my-5 border-none hover:bg-gray-400/20 py-2 px-5 rounded-lg cursor-pointer transition duration-300"
            >
              Bookmarks
            </Heading>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Profile;
