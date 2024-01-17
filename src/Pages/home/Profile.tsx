import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const parans = useParams();

  const username = parans.username;
  const navigate = useNavigate();
  return (
    username && (
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
            {"Abhishek Pathak"}
          </Heading>
        </Flex>
        <Box className="w-[50%] text-center flex flex-col gap-2">
          <Text size="3">@{username}</Text>
          <Text className="rounded-2xl w-full" size="3">
            {"Im abhishek"} 
          </Text>
        </Box>
        <Box className="flex flex-row gap-5">
          <Button size="3" radius="full" className="bg-black/20 text-black cursor-pointer" onClick={()=>{

          }}>Share</Button>
          <Button size="3" radius="full" className="bg-black/20 text-black cursor-pointer" onClick={()=>{
            navigate("/settings")
          }}>Edit Profile</Button>
        </Box>
        <Heading className="my-5">
          All Posts
        </Heading>
      </Box>
    )
  );
};

export default Profile;
