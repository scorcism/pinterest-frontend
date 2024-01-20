import { useEffect, useState } from "react";
import { postType } from "../types/utility.type";
import { MoreHorizontal, MousePointer2, Upload } from "lucide-react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAddBookmarkMutation } from "../redux/services/utilityApi";

const SinglePost = ({ post }: { post: postType }) => {
  const [toShowHelper, setToShowHelper] = useState<boolean>(false);
  const auth_token = Cookies.get("AUTH_TOKEN");
  const navigate = useNavigate();
  const [addBookmark, addBookmarkResult] = useAddBookmarkMutation();

  const addToBookmark = async (postId: string) => {
    // To add to bookmark check if logged in or not
    if (!auth_token) {
      toast.error("You are not logged in. To save post please login.");
    } else {
      await addBookmark({ postId });
    }
  };

  useEffect(() => {
    if (addBookmarkResult.isSuccess) {
      toast.success(addBookmarkResult.data.message);
    } else if (addBookmarkResult.isError) {
      // @ts-ignore
      toast.error(addBookmarkResult.error.data.message);
    }
  }, [addBookmarkResult.isLoading]);

  return (
    <Box
      onMouseEnter={() => {
        setToShowHelper(true);
      }}
      onMouseLeave={() => {
        setToShowHelper(false);
      }}
      className="relative my-3 mx-1 flex items-center justify-center"
    >
      <img
        src={post.url}
        alt={post.title}
        className="rounded-3xl cursor-zoom-in w-full"
        onClick={() => {
          navigate(`/post/${post._id}`);
        }}
      />
      {toShowHelper && (
        <Button
          className="absolute top-2 right-3 rounded-full cursor-pointer"
          color="red"
          size="3"
          onClick={() => {
            addToBookmark(post._id);
          }}
        >
          {!addBookmarkResult.isLoading ? "Save" : "Saving"}
        </Button>
      )}
      {toShowHelper && (
        <Flex
          direction="row"
          className="absolute flex w-[100%] justify-between items-center bottom-2 left-1 right-2"
        >
          {post.postUrl ? (
            <Link
              to={post.postUrl}
              target="_blank"
              className="bg-white/70 rounded-lg px-2 text-black font-bold flex justify-center items-center gap-2 text-sm"
            >
              {post.postUrl.substring(0, 20)} <MousePointer2 size="15px" />
            </Link>
          ) : (
            <>
              <Box></Box>
            </>
          )}
          <Flex direction="row" gap="3" className="mr-4">
            <Box>
              <Box
                className="bg-white/70 rounded-full p-1 cursor-pointer"
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    `${window.location.href}post/${post._id}`
                  );
                  toast("Post Copied", { icon: "🍕" });
                }}
              >
                <Upload size="25px" fontWeight="800" />
              </Box>
            </Box>
            <Box>
              <Box className="bg-white/70 rounded-full p-1 cursor-pointer">
                <MoreHorizontal size="25px" fontWeight="800" />
              </Box>
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default SinglePost;
