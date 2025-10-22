import {
  createFileRoute,
  // redirect,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Profile } from "@/services/api/user/types/profile";
import { loadKey } from "@/services/helpers/storage";
import { fetchUserPosts } from "@/services/api/posts/fetchUserPosts";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";
import { POSTS_PER_PAGE } from "@/services/api/auth/config/constants";
import Heading from "@/features/user/components/Heading";
import Details from "@/features/user/components/Details";
import Description from "@/features/user/components/Description";
import Posts from "@/features/user/components/posts/Posts";
import GoBackBtn from "@/components/buttons/GoBackBtn";

function Profile() {
  const {
    id: profileId,
    scrollY,
    from,
  } = useSearch({ from: "/user/profile/" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState<Profile | null>(null);
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

  const currentUser = loadKey("profile") as Profile;
  const currentUserName = currentUser?.name;
  const profile = profileId || currentUserName;
  const isCurrentUser = profile === currentUserName;

  useEffect(() => {
    const loadProfile = async () => {
      if (!profile) return;

      try {
        console.log("Fetching profile for:", profile);
        const userProfile = await getSingleUserProfile(profile);
        setProfileUser(userProfile);
        setShowNewPost(isCurrentUser);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load profile.";
        setError(errorMessage);

        if (profileId && profileId !== currentUserName) {
          navigate({ to: "/user/profile/" });
        }
      }
    };

    loadProfile();
  }, [profile, profileId, isCurrentUser, currentUserName, navigate]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchUserPosts(
          POSTS_PER_PAGE,
          1,
          profileUser.name,
        );
        setPosts(postsData);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileUser) {
      loadPosts();
    }
  }, [profileUser]);

  if (!profileUser) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="profile-container w-[100vw] min-h-screen p-8 gap-16">
      <Heading user={profileUser} />
      <Details user={profileUser} />
      <Description user={profileUser} />
      <Posts posts={posts} loading={loading} />
      <GoBackBtn onClick={goBack} />
      {showNewPost && <div>New post menu here</div>}
    </div>
  );
}

export const Route = createFileRoute("/user/profile/")({
  validateSearch: (search) => ({
    id: search.id as string | undefined,
    scrollY: search.scrollY as number | undefined,
    from: search.from as string | undefined,
  }),
  component: Profile,
});
export default Profile;
