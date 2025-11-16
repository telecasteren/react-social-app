import { submitReaction } from "@/services/api/posts/reactions/submitReaction";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import type { Post } from "@/utils/types/post/post";

export const useHandleLikePost = (postId: number, post?: Post) => {
  const queryClient = useQueryClient();
  const {
    auth: { user },
  } = useAuth();

  const initialLikes =
    post?.reactions?.some((reaction) =>
      reaction.reactors?.includes(user?.name || ""),
    ) || false;

  const [isLiked, setIsLiked] = useState(initialLikes);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const userHasLiked =
      post?.reactions?.some((reaction) =>
        reaction.reactors?.includes(user?.name || ""),
      ) || false;

    setIsLiked(userHasLiked);
    setLikeCount(post?._count?.reactions || 0);
  }, [post?.reactions, post?._count?.reactions, user?.name]);

  const handleLikePost = useCallback(async () => {
    const newLike = !isLiked;
    setIsLiked(newLike);
    setLikeCount((previousCount) => previousCount + (newLike ? 1 : -1));

    try {
      await submitReaction(postId);

      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    } catch (error) {
      setIsLiked(!newLike);
      throw Error(error instanceof Error ? error.message : "Unknown error");
    }

    queryClient.invalidateQueries({ queryKey: ["post", postId] });
  }, [postId, queryClient, isLiked]);

  return { handleLikePost, isLiked, likeCount };
};
