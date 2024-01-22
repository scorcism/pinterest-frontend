import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
// import Select from "react-select";
import Cookies from "js-cookie";
import { Upload, XCircle } from "lucide-react";
import toast from "react-hot-toast";

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
        `${import.meta.env.VITE_BACKEND_BASE_URL}/posts/addPost`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        },
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
      toast.error("Error while creating new Post, Please try later.");
      // console.log("erorr: ", error);
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
      <Box className="flex flex-col-reverse px-6 md:flex-row justify-around gap-5 md:gap-10 md:px-56 pt-10">
        <Box className="flex-1 flex gap-5 flex-col ">
          <Box className="w-full h-full rounded-lg">
            <label
              htmlFor="file-upload"
              className="w-full text-center py-6 mb-4 md:py-0 md:mb-0 bg-gray-300/80 h-full flex flex-row items-center justify-center border-dotted cursor-pointer rounded-3xl"
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
                <Text size="2" color="red">
                  {image && image[0].name}
                </Text>
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
        </Box>
        <Box className="flex-1 flex flex-col gap-10">
          <Box className="flex flex-col gap-2">
            <Text size="4">Title: </Text>
            <TextField.Root>
              <TextField.Input
                radius="medium"
                placeholder="Enter the Title"
                size="3"
                maxLength={100}
                className="py-6"
                value={data.title}
                name="title"
                onChange={handleChange}
              />
            </TextField.Root>

            {data.title &&
              data.title.length >= 1 &&
              data.title.length < 100 && (
                <Text size="2">
                  Only{" "}
                  <span className="text-red-800 font-bold">
                    {100 - data.title.length}
                  </span>{" "}
                  characters are allowed now.
                </Text>
              )}
            {data.title && data.title.length > 100 && (
              <Text size="2">
                Please delete {"  "}
                <span className="text-red-800 font-bold">
                  {Math.abs(100 - data.title.length)}
                </span>{" "}
                characters.
              </Text>
            )}
          </Box>
          <Box className="flex flex-col gap-2">
            <Text size="4">Description: </Text>
            <TextArea
              className="rounded-md"
              rows={7}
              size="3"
              placeholder="Enter the Description"
              maxLength={500}
              value={data.description}
              name="description"
              onChange={handleChange}
            />
            {data.description &&
              data.description.length >= 1 &&
              data.description.length < 500 && (
                <Text size="2">
                  Only{" "}
                  <span className="text-red-800 font-bold">
                    {500 - data.description.length}
                  </span>{" "}
                  characters are allowed now.
                </Text>
              )}
            {data.description && data.description.length > 500 && (
              <Text size="2">
                Please delete {"  "}
                <span className="text-red-800 font-bold">
                  {Math.abs(500 - data.description.length)}
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
            <SelectTags tags={tags} setTags={setTags} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const SelectTags = ({ tags, setTags }: any) => {
  const handleTagSave = (e: any) => {
    const currtags: string = String(e.target.value);

    const customTagsArray: any = [];

    currtags.split(",").map((t: any) => {
      customTagsArray.push(t.trim());
    });
    setTags(customTagsArray);
  };

  return (
    <>
      <Box className="flex flex-col gap-2">
        <Box className="flex gap-2  flex-row justify-between items-center">
          <Box className="w-full">
            <TextField.Root className="flex-1">
              <TextField.Input
                placeholder="Enter the Tags. (Comma seperated)"
                size="3"
                className=""
                value={tags.join(",")}
                onChange={handleTagSave}
                maxLength={100}
              />
            </TextField.Root>
            <Text size="1" color="red" className="pl-1">
              Only 100 Charcters are allowed🐲
            </Text>
          </Box>
        </Box>
        <Box className="flex gap-3 w-[100vw] md:w-[100%] flex-wrap px-1">
          {tags.map((tag: string) => (
            <Box className="bg-gray-300 flex px-1 rounded-full items-center gap-[2px] ">
              {tag.length > 0 && (
                <>
                  <Text className="pl-1">{tag}</Text>
                  <XCircle
                    size="17px"
                    className="cursor-pointer"
                    onClick={() => {
                      setTags(() => tags.filter((t: string) => t != tag));
                    }}
                  />
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
