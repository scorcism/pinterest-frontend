import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../redux/services/utilityApi";
import { Box, Button, DropdownMenu, Heading, Text } from "@radix-ui/themes";
import { postData } from "../../types/utility.type";
import { MoreHorizontal, Upload } from "lucide-react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAddBookmarkMutation } from "../../redux/services/utilityApi";
import Cookies from "js-cookie";

const Post = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<postData>({
    postId: "",
    url: "",
    title: "",
    desc: "",
    postUrl: "",
    tags: [],
    createdAt: "",
    firstname: "",
    username: "",
    lastname: "",
  });
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetPostQuery({ id });
  const [addBookmark, addBookmarkResult] = useAddBookmarkMutation();
  const auth_token = Cookies.get("AUTH_TOKEN");
  const addToBookmark = async (postId: string) => {
    // To add to bookmark check if logged in or not
    if (!auth_token) {
      toast.error("You are not logged in. To save post please login.");
    } else {
      await addBookmark({ postId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setPostData(data.data.data);
    }
    if (isError) {
      toast.error("Interal server Error, Please try Later");
    }
  }, [isLoading]);

  useEffect(() => {
    if (addBookmarkResult.isSuccess) {
      toast.success(addBookmarkResult.data.message);
    } else if (addBookmarkResult.isError) {
      // @ts-ignore
      toast.error(addBookmarkResult.error.data.message);
    }
  }, [addBookmarkResult.isLoading]);

  return (
    <>
      {isError && (
        <Box className="flex flex-row h-[90vh] w-full items-center justify-center">
          <Heading
            size="8"
            as="h2"
            style={{
              backgroundClip: "text",
              backgroundImage: "linear-gradient(90deg, red, blue)",
              color: "transparent",
            }}
          >
            No Post
          </Heading>
        </Box>
      )}
      {isSuccess && (
        <Box className=" md:h-[90vh] w-[100%] my-3 flex py-5 px-10 items-center justify-center ">
          <Box className="shadow-2xl h-[100%] xs:w-[100%] sm:w-[80%] lg:w-[60%] rounded-2xl flex xs:flex-col md:flex-row">
            <Box className="flex-1 flex items-center justify-center px-1 border-r-0 border-gray-100 md:border-r-2">
              <img
                src={postData.url}
                alt={postData.title}
                className="object-cover shadow-md rounded-md"
              />
            </Box>
            <Box className="flex-1 py-10 px-4 flex flex-col gap-5">
              <Box className="flex flex-row justify-between">
                <Box className="flex flex-row justify-between gap-5">
                  <Box
                    onClick={() => {
                      window.navigator.clipboard.writeText(
                        window.location.href
                      );
                      toast("Post Copied", { icon: "🍕" });
                    }}
                    className="bg-gray-500/20 hover:bg-gray-600/30 rounded-full p-1 cursor-pointer flex items-center"
                    title="Share"
                  >
                    <Upload />
                  </Box>
                  <Box className="bg-gray-500/20 hover:bg-gray-600/30 rounded-full p-1 cursor-pointer flex items-center">
                    <>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <MoreHorizontal size="25px" fontWeight="800" />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content size="2">
                          <DropdownMenu.Item
                            shortcut="👽"
                            className="cursor-pointer"
                            onClick={() => window.open(postData.url, "_blank")}
                          >
                            Download
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            disabled
                            shortcut="👾"
                            className="cursor-pointer"
                            onClick={() => {}}
                          >
                            SOON
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </>{" "}
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="solid"
                    color="red"
                    size="3"
                    className="rounded-3xl text-md cursor-pointer"
                    onClick={() => {
                      addToBookmark(postData.postId);
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
              <Box>
                <Link
                  to={postData.postUrl}
                  target="_blank"
                  className="underline hover:text-blue-700"
                >
                  {postData.postUrl}
                </Link>
              </Box>
              <Heading size="8" className="font-semibold break-words">
                {isLoading ? <Skeleton /> : postData.title}
              </Heading>
              <Box className="break-words">
                <Text className="">
                  {isLoading ? <Skeleton count={4} /> : postData.desc}
                </Text>
              </Box>
              <Box className="flex flex-wrap gap-2 w-[20vw] break-words">
                {postData.tags.map((tag: string) => (
                  <Text className="text-blue-800">#{tag}</Text>
                ))}
              </Box>
              <Box className="flex justify-between items-center">
                <Box className="flex items-center gap-3">
                  <Heading
                    className="bg-green-600 h-[50px] w-[50px] rounded-full text-center flex justify-center items-center"
                    size="8"
                  >
                    {postData.firstname.charAt(0)}{" "}
                  </Heading>
                  <Box className="flex flex-col gap-0">
                    {isLoading ? (
                      <Skeleton count={2} />
                    ) : (
                      <Text size="3">
                        {postData.firstname}
                        {postData.lastname}
                      </Text>
                    )}
                    <Text
                      size="2"
                      className="hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        navigate(`/profile/${postData.username}`);
                      }}
                    >
                      @{postData.username}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="solid"
                    color="red"
                    size="2"
                    className="rounded-3xl text-md cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${postData.username}`);
                    }}
                  >
                    Profile
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Post;
