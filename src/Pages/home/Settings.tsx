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
import {
  useLazyGetUserMetaDataQuery,
  useUpdateUserMetaMutation,
} from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";

const Settings = () => {
  const [getUserDataTrigger, getUserDataResult] = useLazyGetUserMetaDataQuery();
  const [updateUserMeta, updateUserMetaResult] = useUpdateUserMetaMutation();

  const username = Cookies.get("AUTH_USERNAME");
  const genders = ["Male", "Female"];
  const pronounPairs = [
    "He/Him",
    "She/Her",
    "They/Them",
    "It/Its",
    "We/Us",
    "You/Your",
  ];

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
      setLocalUserData((prev: any) => {
        return {
          ...prev,
          ...getUserDataResult.data.data.data,
        };
      });
    }
  }, [getUserDataResult.isLoading]);

  const handleChange = (e: any) => {
    setLocalUserData({ ...localUserData, [e.target.name]: e.target.value });
  };

  const updateUserData = async () => {
    console.log(localUserData);
    await updateUserMeta(localUserData);
  };
  useEffect(() => {
    if (updateUserMetaResult.isSuccess) {
      toast.success("Updated");
    } else if (updateUserMetaResult.isError) {
      toast.error("Please check all the fileds.");
    }
  }, [updateUserMetaResult]);

  return (
    <>
      {getUserDataResult.isLoading && (
        <Box className="flex flex-row items-center justify-center ">
          <PacmanLoader size="15px" />
        </Box>
      )}
      {getUserDataResult.isSuccess && (
        <Box className="h-[94vh] flex flex-row items-start justify-center pt-2 w-[100vw]">
          <Box className="flex flex-col gap-7 xs:w-[90%] sm:w-[80%] md:w-[40%] ">
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
                  <TextField.Input
                    size="3"
                    type="text"
                    name="firstname"
                    value={localUserData.firstname}
                    onChange={(e) => handleChange(e)}
                  />
                </TextField.Root>
              </Box>
              <Box className="flex-1">
                <Text>Last name: </Text>
                <TextField.Root className="py-1 rounded-2xl">
                  <TextField.Input
                    size="3"
                    type="text"
                    name="lastname"
                    value={localUserData.lastname}
                    onChange={(e) => handleChange(e)}
                  />
                </TextField.Root>
              </Box>
            </Flex>
            <Flex direction="row" gap="5" align="center">
              <Box className="flex-1 flex flex-col">
                <Text>Pronounce: </Text>
                {pronounPairs && (
                  <Select.Root
                    defaultValue={
                      localUserData.pronounce == ""
                        ? "null"
                        : localUserData.pronounce
                    }
                    size="3"
                    onValueChange={(value) =>
                      setLocalUserData({ ...localUserData, pronounce: value })
                    }
                  >
                    <Select.Trigger />
                    <Select.Content position="popper">
                      <Select.Item
                        value="null"
                        disabled
                        defaultChecked
                        onChange={(e) => handleChange(e)}
                      >
                        Add your pronounce
                      </Select.Item>
                      {pronounPairs.map((pronoun) => (
                        <Select.Item key={pronoun} value={pronoun}>
                          {pronoun}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              </Box>
              <Box className="flex-1 flex flex-col">
                <Text>Gender: </Text>
                {genders && (
                  <Select.Root
                    defaultValue={
                      localUserData.gender != "" ? localUserData.gender : "null"
                    }
                    size="3"
                    onValueChange={(value) =>
                      setLocalUserData({ ...localUserData, gender: value })
                    }
                  >
                    <Select.Trigger />
                    <Select.Content position="popper">
                      <Select.Item
                        value="null"
                        disabled
                        defaultChecked
                        onChange={(e) => handleChange(e)}
                      >
                        Slect Your Gender
                      </Select.Item>
                      {genders.map((gender: string) => (
                        <Select.Item key={gender} value={gender}>
                          {gender}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              </Box>
            </Flex>
            <Box>
              <Text>About: </Text>
              <TextArea
                className="rounded-2xl"
                onChange={(e) => handleChange(e)}
                rows={4}
                size="3"
                placeholder="Tell your story"
                value={localUserData.about}
                name="about"
              />
              {localUserData.about.length < 1 && (
                <Text size="1" className="pl-2" color="red">
                  About should be within 250 characters.
                </Text>
              )}{" "}
              {localUserData.about.length > 1 &&
                localUserData.about.length <= 250 && (
                  <Text size="1" className="pl-2" color="red">
                    You can add{" "}
                    <span className="font-bold">
                      {250 - localUserData.about.length}
                    </span>{" "}
                    more characters' 🤗.
                  </Text>
                )}
              {localUserData.about.length > 250 && (
                <Text size="1" className="pl-2" color="red">
                  Please remove{" "}
                  <span className="font-bold">
                    {Math.abs(250 - localUserData.about.length)}
                  </span>{" "}
                  characters' 🎈
                </Text>
              )}
            </Box>
            <Box className="">
              <Text>Website: </Text>
              <TextField.Root className="py-1 w-[100%] rounded-2xl">
                <TextField.Input
                  size="3"
                  type="text"
                  name="website"
                  value={localUserData.website}
                  placeholder="Add a link"
                  onChange={(e) => handleChange(e)}
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
              <Button
                disabled={updateUserMetaResult.isLoading ? true : false}
                size="3"
                className="cursor-pointer"
                radius="full"
                color="red"
                onClick={updateUserData}
              >
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
