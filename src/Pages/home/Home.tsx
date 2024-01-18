import { Box } from "@radix-ui/themes";
import { useGetAllPostsQuery } from "../../redux/services/utilityApi";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetAllPostsQuery({ page });

  useEffect(() => {
    if (isSuccess) {
      setPosts(data.data.posts);
    }
  }, [isLoading]);

  return (
    <Box className="relative w-[100%] h-screen mx-1">
      <Box className="columns-2 gap-5 xs:columns-1 md:columns-4">
        {posts && posts.map((post: any) => <SinglePost post={post} />)}
      </Box>
    </Box>
  );
};

const SinglePost = ({ post }: { post: any }) => {
  return (
    <Box onMouseEnter={() => {}}>
      <img
        src={post.url}
        alt={post.title}
        className="rounded-lg cursor-zoom-in"
      />
    </Box>
  );
};

export default Home;
