import Tooltip from "@/components/tooltip/Tooltip";
import type { Profile } from "@/utils/types/user/profile";

interface DetailsProps {
  user: Profile;
}

interface StatsCircleProps {
  number: number;
  label: string;
  tooltipContent?: string[];
}

const StatsCircle: React.FC<StatsCircleProps> = ({
  number,
  label,
  tooltipContent,
}) => {
  const circleContent = (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2 ring-accent-light dark:bg-gray-600 dark:ring-accent-dark">
        <div className="font-medium text-tiny text-gray-600 dark:text-gray-300">
          {number}
        </div>
      </div>
      <div className="text-xs text-gray-900 dark:text-gray-400 mt-1">
        {label}
      </div>
    </div>
  );

  if (tooltipContent && tooltipContent.length > 0) {
    return (
      <Tooltip label={label} content={tooltipContent}>
        {circleContent}
      </Tooltip>
    );
  }

  return circleContent;
};

const Details: React.FC<DetailsProps> = ({ user }) => {
  const numberOfPosts = user._count?.posts || 0;
  const numberOfFollowers = user._count?.followers || 0;
  const numberOfFollowing = user._count?.following || 0;
  const usernameText = user.name || "Unknown user";

  const followersNames =
    user._followers?.map((follower) => follower.name) || [];
  const followingNames =
    user._following?.map((following) => following.name) || [];

  return (
    <div className="flex flex-wrap justify-center mr-0 gap-2 md:ml-24">
      <p className="text-sm m-4">{usernameText}</p>

      <div className="flex flex-wrap gap-2">
        <StatsCircle number={numberOfPosts} label="posts" />

        <StatsCircle
          number={numberOfFollowers}
          label="followers"
          tooltipContent={followersNames}
        />

        <StatsCircle
          number={numberOfFollowing}
          label="following"
          tooltipContent={followingNames}
        />
      </div>
    </div>
  );
};
export default Details;
