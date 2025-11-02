import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Profile } from "@/utils/types/user/profile";
// import { loadKey } from "@/services/helpers/storage";
import { fetchUserPosts } from "@/services/api/posts/fetchUserPosts";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";
import { POSTS_PER_PAGE } from "@/services/api/auth/config/constants";
import Heading from "@/features/user/components/Heading";
import Details from "@/features/user/components/Details";
import Description from "@/features/user/components/Description";
import Posts from "@/features/post/Posts";
import GoBackBtn from "@/components/buttons/GoBackBtn";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import SkeletonProfile from "@/components/loaders/SkeletonProfile";
// import { getUserParams } from "@/services/helpers/getUserParams";

function Profile() {
  const { username } = Route.useParams();
  const profileUser = Route.useLoaderData();
  const [posts, setPosts] = useState([]);
  // const [showNewPost, setShowNewPost] = useState(false);
  // const currentUser = loadKey("profile") as Profile;
  // const isCurrentUser = username === currentUser?.name;

  const [loading, setLoading] = useState(true);

  useScrollRestore(`/user/profile/${username}`);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchUserPosts(POSTS_PER_PAGE, 1, username);
        setPosts(postsData);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [username]);

  if (!profileUser) {
    return <div>Loading profile...</div>;
  }

  if (loading) {
    return <SkeletonProfile />;
  }

  return (
    <div className="profile-container w-[100vw] min-h-screen p-8 gap-16">
      <Heading user={profileUser} />
      <Details user={profileUser} />
      <Description user={profileUser} />
      <Posts posts={posts} loading={loading} />
      {/* {showNewPost && setShowNewPost(isCurrentUser)} */}
      <GoBackBtn />
    </div>
  );
}

export const Route = createFileRoute("/user/profile/$username")({
  loader: async ({ params }) => {
    const profileUser = await getSingleUserProfile(params.username);
    return profileUser;
  },
  component: Profile,
});
