import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
// import Select from "react-select";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

const CreatePost = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    url: "",
  });

  const [tags, setTags] = useState([]);
  const [image, setImage] = useState<any>(null);

  const handleSavePost = async () => {
    if (
      data.title.length < 1 ||
      data.description.length < 1 ||
      tags.length < 0 ||
      data.url.length < 0 ||
      image == null
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.description);
    formData.append("postUrl", data.url);
    formData.append("image", image[0]);
    formData.append("tags", JSON.stringify(tags));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/root/addPost`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        }
      );
      if (response.ok) {
        setData({
          title: "",
          description: "",
          url: "",
        });
        setTags([]);
        setImage(null);
        toast.success("New Post Added. 🥳🎈🎉🎊🪅");
      }
    } catch (error) {
      console.log("erorr: ", error);
    }
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Box className="flex flex-row justify-between items-center px-4 py-4 border-b-[1px] border-t-[1px] border-black/20">
        <Heading size="4">Create Post</Heading>
        <Button
          variant="solid"
          color="red"
          className="rounded-2xl text-md cursor-pointer"
          onClick={handleSavePost}
        >
          Publish
        </Button>
      </Box>
      <Box className="flex flex-row justify-around gap-10 md:px-56 pt-10">
        <Box className="flex-1 flex gap-5 flex-col ">
          <Box className="w-full h-full rounded-lg">
            <label
              htmlFor="file-upload"
              className="w-full text-center bg-gray-300/80 h-full flex flex-row items-center justify-center border-dotted cursor-pointer rounded-3xl"
            >
              <Flex
                direction="column"
                justify="center"
                style={{ alignItems: "center" }}
                gap="4"
              >
                <Upload color="black" size="30px" />
                <Heading as="h3" className="text-black/80">
                  Choose a file
                </Heading>
                <Text size="2" color="red">{image && image[0].name}</Text>
              </Flex>
            </label>
            <TextField.Input
              type="file"
              variant="soft"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              id="file-upload"
              style={{
                display: "none",
              }}
              onChange={(e) => setImage(e.target.files)}
            />
          </Box>
          {/* <Box className="flex flex-col gap-5">
            {image && (
              <>
                <Text>Preview: </Text>
                <Box
                  style={{
                    width: "400px",
                    height: "400px",
                  }}
                >
                  <img src={URL.createObjectURL(image[0])} alt="image" />
                </Box>
              </>
            )}
          </Box> */}
        </Box>
        <Box className="flex-1 flex flex-col gap-10">
          <Box className="flex flex-col gap-2">
            <Text size="4">Title: </Text>
            <TextField.Root>
              <TextField.Input
                radius="medium"
                placeholder="Enter the Title"
                size="3"
                className="py-6"
                value={data.title}
                name="title"
                onChange={handleChange}
              />
            </TextField.Root>

            {data.title && data.title.length >= 1 && data.title.length < 60 && (
              <Text size="2">
                Only{" "}
                <span className="text-red-800 font-bold">
                  {60 - data.title.length}
                </span>{" "}
                characters are allowed now.
              </Text>
            )}
            {data.title && data.title.length > 60 && (
              <Text size="2">
                Please delete {"  "}
                <span className="text-red-800 font-bold">
                  {Math.abs(60 - data.title.length)}
                </span>{" "}
                characters.
              </Text>
            )}
          </Box>
          <Box className="flex flex-col gap-2">
            <Text size="4">Description: </Text>
            <TextArea
              className="rounded-md"
              rows={5}
              size="3"
              placeholder="Enter the Description"
              value={data.description}
              name="description"
              onChange={handleChange}
            />
            {data.description &&
              data.description.length >= 1 &&
              data.description.length < 250 && (
                <Text size="2">
                  Only{" "}
                  <span className="text-red-800 font-bold">
                    {250 - data.description.length}
                  </span>{" "}
                  characters are allowed now.
                </Text>
              )}
            {data.description && data.description.length > 250 && (
              <Text size="2">
                Please delete {"  "}
                <span className="text-red-800 font-bold">
                  {Math.abs(250 - data.description.length)}
                </span>{" "}
                characters.
              </Text>
            )}
          </Box>
          <Box className="flex flex-col gap-2">
            <Text size="4">Link: </Text>
            <TextField.Root>
              <TextField.Input
                radius="medium"
                placeholder="Add a Link"
                size="3"
                className="py-6"
                value={data.url}
                name="url"
                onChange={handleChange}
              />
            </TextField.Root>
          </Box>
          <Box className="flex flex-col gap-2">
            <Text size="4">Tag: </Text>
            <SelectTags setTags={setTags} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const SelectTags = ({ setTags }: any) => {
  // const colourOptions = [
  //   {
  //     value: "red",
  //     label: "red",
  //   },
  //   {
  //     value: "yellow",
  //     label: "yellow",
  //   },
  //   {
  //     value: "black",
  //     label: "black",
  //   },
  //   {
  //     value: "white",
  //     label: "white",
  //   },
  // ];
  const [localTagsSuggested, setLocalTagsSuggested] = useState([]);
  const [customTags, setCustomTags] = useState("");

  const saveTags = () => {
    let customTagsArray: any = [];
    localTagsSuggested.map((t: any) => {
      customTagsArray.push(t.value);
    });
    customTags.split(",").map((t: any) => {
      customTagsArray.push(t.trim());
    });
    setLocalTagsSuggested([]);
    setTags(customTagsArray);
  };

  const handleTagSave = (e: any) => {
    setCustomTags(e.target.value);
  };

  useEffect(() => {
    saveTags();
  }, [customTags]);

  return (
    <>
      <Box className="flex flex-col gap-2">
        {/* <Select
          value={localTagsSuggested}
          isMulti
          onChange={(e: any) => setLocalTagsSuggested(e)}
          name="colors"
          options={colourOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        /> */}
        <Box className="flex gap-2  flex-row justify-between items-center">
          <TextField.Root className="flex-1">
            <TextField.Input
              placeholder="Enter the Tags. (Comma seperated)"
              size="3"
              value={customTags}
              onChange={handleTagSave}
            />
          </TextField.Root>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
