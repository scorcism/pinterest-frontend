import { Box } from "@radix-ui/themes";
import { useGetAllPostsQuery } from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";
import SinglePost from "../../Components/SinglePost";
import toast from "react-hot-toast";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetAllPostsQuery({ page });

  useEffect(() => {
    if (isSuccess) {
      setPage(1)
      setPosts(data.data.posts);
    }
    if (isError) {
      toast.error("Interal server Error, Please try Later");
    }
  }, [isLoading]);
  return (
    <Box className="relative w-[100%] h-screen mx-1">
      <Box className="columns-2 gap-5 xs:columns-1 ss:columns-2 sm:columns-3 md:columns-5 mx-2">
        {posts &&
          posts.map((post: any) => <SinglePost key={post._id} post={post} />)}
      </Box>
    </Box>
  );
};

export default Home;
