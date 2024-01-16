import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import Cookies from "js-cookie";
import { useLazyGetUserMetaDataQuery } from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const Settings = () => {
  const [getUserDataTrigger, getUserDataResult] = useLazyGetUserMetaDataQuery();

  const [userData, setUserData] = useState<any>({});
  const username = Cookies.get("AUTH_USERNAME");
  const genders = ["Male", "Female"];
  const pronounPairs = ["She/Her", "They/Them", "It/Its", "We/Us", "You/Your"];

  const [localUserData, setLocalUserData] = useState({
    firstname: "",
    lastname: "",
    pronounce: "",
    gender: "",
    about: "",
    website: "",
  });
  const getMetaData = async () => {
    // @ts-ignore
    await getUserDataTrigger();
  };

  useEffect(() => {
    getMetaData();
  }, []);

  useEffect(() => {
    if (getUserDataResult.isSuccess) {
      setUserData(getUserDataResult.data.data.data);
    }
  }, [getUserDataResult.isLoading]);

  const handleChange = (e) => {
    
  }

  return (
    <>
      {getUserDataResult.isLoading && (
        <Box className="flex flex-row items-center justify-center ">
          <PacmanLoader size="15px" />
        </Box>
      )}
      {getUserDataResult.isSuccess && (
        <Box className="h-[94vh] flex flex-row items-start justify-center pt-2 w-[100vw]">
          <Box className="flex flex-col gap-7 md:w-[30%]">
            <Flex direction="column" gap="4">
              <Heading as="h3">Edit profile</Heading>
              <Text size="3">
                Keep your personal details private. Information you add here is
                visible to any who can view your profile.
              </Text>
            </Flex>
            <Flex direction="row" gap="5" align="center">
              <Heading
                size="9"
                className="bg-green-600 inline-block w-20 h-20 rounded-full text-center text-white"
              >
                {username?.charAt(0)}
              </Heading>
              <Button
                variant="solid"
                className="rounded-full bg-black/30 text-black"
                disabled={true}
              >
                Change
              </Button>
            </Flex>
            <Flex direction="row" gap="5" align="center">
              <Box className="flex-1">
                <Text>First name: </Text>
                <TextField.Root className="py-1 w-[100%] rounded-2xl">
                  <TextField.Input size="3" type="text"
                  onChange={(e)=> handleChange(e)} />
                </TextField.Root>
              </Box>
              <Box className="flex-1">
                <Text>Last name: </Text>
                <TextField.Root className="py-1 rounded-2xl">
                  <TextField.Input size="3" type="text"
                  onChange={(e)=> handleChange(e)} />
                </TextField.Root>
              </Box>
            </Flex>
            <Flex direction="row" gap="5" align="center">
              <Box className="flex-1 flex flex-col">
                <Text>Pronounce: </Text>
                <Select.Root defaultValue="null" size="3">
                  <Select.Trigger />
                  <Select.Content position="popper">
                    <Select.Item value="null" disabled defaultChecked
                    onChange={(e)=> handleChange(e)}>
                      Add your pronounce
                    </Select.Item>
                    {pronounPairs.map((pronoun) => (
                      <Select.Item key={pronoun} value={pronoun}>
                        {pronoun}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>
              <Box className="flex-1 flex flex-col">
                <Text>Gender: </Text>
                <Select.Root defaultValue="null" size="3">
                  <Select.Trigger />
                  <Select.Content position="popper">
                    <Select.Item value="null" disabled defaultChecked
                    onChange={(e)=> handleChange(e)}>
                      Slect Your Gender
                    </Select.Item>
                    {genders.map((gender: string) => (
                      <Select.Item key={gender} value={gender}>
                        {gender}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>
            </Flex>
            <Box>
              <Text>About: </Text>
              <TextArea
                className="rounded-2xl"
                onChange={(e)=> handleChange(e)}
                rows={4}
                size="3"
                placeholder="Tell your story"
                // value={data.description}
                name="description"
              />
            </Box>
            <Box className="">
              <Text>Website: </Text>
              <TextField.Root className="py-1 w-[100%] rounded-2xl">
                <TextField.Input
                  size="3"
                  type="text"
                  placeholder="Add a link"
                  onChange={(e)=> handleChange(e)}
                />
              </TextField.Root>
            </Box>
            <Box className="">
              <Text>Username: </Text>
              <TextField.Root className="py-1 w-[100%] rounded-2xl">
                <TextField.Input
                  disabled
                  size="3"
                  type="text"
                  value={username}
                />
              </TextField.Root>
            </Box>
            <Box className="flex flex-row justify-end">
              <Button size="3" radius="full" color="red">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Settings;
