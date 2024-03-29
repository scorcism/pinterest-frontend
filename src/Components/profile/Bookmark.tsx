import { useParams } from "react-router-dom";
import { useLazyGetBookmarksQuery } from "../../redux/services/utilityApi";
import { useCallback, useEffect, useState } from "react";
import SinglePost from "../SinglePost";
import { Box, Heading } from "@radix-ui/themes";
import { Bath } from "lucide-react";
import { postType } from "../../types/utility.type";

type postsType = {
  postId: postType;
};
const Bookmark = () => {
  const { username } = useParams();
  const [trigger, getBookmarkResult] = useLazyGetBookmarksQuery();
  const [posts, setPosts] = useState([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const getUserBookmarks = useCallback(async () => {
    await trigger({ username });
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getUserBookmarks();
  }, [username]);

  useEffect(() => {
    if (getBookmarkResult.isSuccess) {
      setPosts(getBookmarkResult.data.data.bookmarks);
    }
  }, [getBookmarkResult.data, getBookmarkResult.isSuccess]);

  return (
    <>
      <Box className="columns-2 gap-5 xs:columns-1 ss:columns-2 sm:columns-3 md:columns-5 mx-2 mb-3">
        {posts &&
          posts.map((post: postsType) => (
            <SinglePost key={post.postId._id} post={post.postId} />
          ))}
      </Box>
      {posts.length < 1 && <NoBookmarks />}
    </>
  );
};

const NoBookmarks = () => {
  return (
    <Box className="w-full flex gap-2">
      <Heading size="5">No Bookmarks Yet</Heading>
      <Bath />
    </Box>
  );
};

export default Bookmark;
