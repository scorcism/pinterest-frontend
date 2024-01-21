import { Box, Text } from "@radix-ui/themes";
import { useLazyGetAllPostsQuery } from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";
import SinglePost from "../../Components/SinglePost";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // const [totalPost, setTotalPosts] = useState(0);
  const [allPostsTrigger, allPostsTriggerResult] = useLazyGetAllPostsQuery();

  const getAllPosts = async () => {
    await allPostsTrigger({ page }, false);
  };

  useEffect(() => {
    getAllPosts();
  }, [page]);

  useEffect(() => {
    if (allPostsTriggerResult.isSuccess) {
      console.log("im here");
      // @ts-ignore
      setPosts((prev: any) => [
        ...prev,
        ...allPostsTriggerResult.data.data.posts,
      ]);
      // setTotalPosts(allPostsTriggerResult.data.data.totalPosts);
      setPageCount(allPostsTriggerResult.data.data.pageCount);
      // setPage(Number(allPostsTriggerResult.data.data.page));
    }
    if (allPostsTriggerResult.isError) {
      toast.error("Interal server Error, Please try Later");
    }
  }, [allPostsTriggerResult.isLoading]);

  const fetchMoreData = () => {
    if(page != pageCount){
      setPage(page + 1);
    }
  };

  return (
    <Box className="relative w-[100%] h-screen mx-1">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={page <= pageCount}
        loader={<Text>Loading..</Text>}
      >
        <Box className="columns-2 gap-5 xs:columns-1 ss:columns-2 sm:columns-3 md:columns-5 mx-2">
          {posts &&
            posts.map((post: any) => <SinglePost key={post._id} post={post} />)}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default Home;
