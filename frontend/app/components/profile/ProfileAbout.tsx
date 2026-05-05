import { badgeStyles } from "@/app/libs/badge";
import { IUser } from "@/app/types/user";

interface ProfileAboutProps {
  user: IUser;
}

const ProfileAbout = ({ user }: ProfileAboutProps) => {
  return (
    <div className="xl:col-span-2 bg-gray-900 border-2 border-gray-800 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center flex-col sm:flex-row gap-3 mb-4">
        <h2 className="text-2xl font-bold text-white">About</h2>
        {user.badge ? (
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
              badgeStyles[user.badge].className
            } text-white`}
          >
            {badgeStyles[user.badge].icon}
            {user.badge}
          </span>
        ) : (
          <span className="text-gray-500">No badge</span>
        )}
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 text-gray-300 leading-relaxed">
        {user.bio ? (
          <p>{user.bio}</p>
        ) : (
          <p className="text-gray-500 italic">No bio added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileAbout;
