import { useParams } from "react-router-dom";
import { useLazyGetUserPostsQuery } from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";
import SinglePost from "../SinglePost";
import { Box, Heading } from "@radix-ui/themes";
import { Sandwich } from "lucide-react";

const Posts = () => {
  const { username } = useParams();
  const [trigger, getUserPostsResult] = useLazyGetUserPostsQuery();
  const [posts, setPosts] = useState([]);

  const getUserBookmarks = async () => {
    await trigger({ username });
  };

  useEffect(() => {
    getUserBookmarks();
  }, [username]);

  useEffect(() => {
    if (getUserPostsResult.isSuccess) {
      setPosts(getUserPostsResult.data.data.posts);
    }
  }, [getUserPostsResult.data]);

  return (
    <>
      <Box className="columns-2 gap-5 xs:columns-1 ss:columns-2 sm:columns-3 md:columns-5 mx-2">
        {posts &&
          posts.map((post: any) => <SinglePost key={post._id} post={post} />)}
      </Box>
      {posts.length < 1 && <NoPosts />}
    </>
  );
};

const NoPosts = () => {
  return (
    <Box className="w-full flex gap-2">
      <Heading size="5">No Posts Yet</Heading>
      <Sandwich />
    </Box>
  );
};

export default Posts;
