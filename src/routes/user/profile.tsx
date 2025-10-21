import {
  createFileRoute,
  redirect,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Heading from "@/features/user/components/Heading";
import Details from "@/features/user/components/Details";
import Description from "@/features/user/components/Description";
import Posts from "@/features/user/components/posts/Posts";
import { POSTS_PER_PAGE } from "@/services/api/auth/config/constants";
import GoBackBtn from "@/components/buttons/GoBackBtn";

export const Route = createFileRoute("/user/profile")({
  beforeLoad: ({ context }) => {
    // Add auth check if needed
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  validateSearch: (search) => ({
    scrollY: search.scrollY as number | undefined,
    from: search.from as string | undefined,
  }),
  component: Profile,
});

function Profile() {
  const { scrollY, from } = useSearch({ from: "/user/profile" });
  const navigate = useNavigate();

  const [posts, setPosts] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);

  useEffect(() => {
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }
  }, [scrollY]);

  const goBack = () => {
    navigate({
      to: from || "/feed",
      search: { scrollY: window.scrollY },
    });
  };

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await Posts(POSTS_PER_PAGE, 1);
      setPosts(postsData);
    };

    const checkCurrentUser = () => {
      const isCurrentUser = true; // Replace this one with real logic
      setShowNewPost(isCurrentUser);
    };

    loadPosts();
    checkCurrentUser();
  }, []);

  return (
    <div className="profile-container w-[100vw] min-h-screen p-8 gap-16">
      <GoBackBtn onClick={goBack} />
      <Heading user={} />
      <Details user={} />
      <Description user={} />
      {posts && <Posts />}
      {showNewPost && <div>New post menu here</div>}
    </div>
  );
}
