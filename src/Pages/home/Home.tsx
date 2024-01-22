import { Box, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import SinglePost from "../../Components/SinglePost";
import { useLazyGetAllPostsQuery } from "../../redux/services/utilityApi";
import { postType } from "../../types/utility.type";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const [allPostsTrigger, allPostsTriggerResult] = useLazyGetAllPostsQuery();

  const getAllPosts = async () => {
    await allPostsTrigger({ page }, false);
    if (page <= pageCount) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    getAllPosts();
  }, []);

  useEffect(() => {
    if (allPostsTriggerResult.isSuccess) {
      // @ts-expect-error: Define Type
      setPosts((prevPosts) => [
        ...prevPosts,
        ...allPostsTriggerResult.data.data.posts,
      ]);
      setTotalPosts(allPostsTriggerResult.data.data.totalPosts);
      setPageCount(allPostsTriggerResult.data.data.pageCount);
    }
    if (allPostsTriggerResult.isError) {
      toast.error("Interal server Error, Please try Later");
    }
  }, [allPostsTriggerResult.isLoading, allPostsTriggerResult.data]);

  return (
    <Box className="relative w-[100%] h-screen mx-1">
      <InfiniteScroll
        dataLength={posts.length}
        next={getAllPosts}
        hasMore={posts.length < totalPosts}
        loader={
          <Text size="4" color="red" className="font-bold">
            Loading...
          </Text>
        }
      >
        <Box className="columns-2 gap-5 xs:columns-1 ss:columns-2 sm:columns-3 md:columns-5 mx-2">
          {posts &&
            posts.map((post: postType) => (
              <SinglePost key={post._id} post={post} />
            ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default Home;
