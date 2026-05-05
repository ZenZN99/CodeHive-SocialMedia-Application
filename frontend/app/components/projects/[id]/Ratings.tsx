"use client";
import { ProjectDetailsRatingsProps } from "@/app/types/props";
import Link from "next/link";
import { FaSignInAlt, FaStar } from "react-icons/fa";

const Ratings = ({
  user,
  averageRating,
  ratingCount,
  userHasRated,
  submitting,
  setSelectedRating,
  selectedRating,
  handleConfirmRating,
  userRatings,
}: ProjectDetailsRatingsProps) => {
  return (
    <div className="mt-6">
      {user ? (
        <>
          <p className="text-white font-semibold mb-2">
            Average Rating: {averageRating} / 5 ({ratingCount}{" "}
            {ratingCount === 1 ? "vote" : "votes"})
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  disabled={userHasRated || submitting}
                  onClick={() => setSelectedRating(star)}
                  className={`text-3xl transition ${
                    star <= (selectedRating || 0)
                      ? "text-yellow-400"
                      : "text-gray-500"
                  } hover:text-yellow-400`}
                >
                  <FaStar />
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmRating}
              disabled={userHasRated || selectedRating === null || submitting}
              className={`mt-2 md:mt-0 ml-0 md:ml-4 px-4 py-2 rounded-xl font-bold transition ${
                userHasRated || selectedRating === null
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#E0234E] hover:opacity-90"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </button>
          </div>

          {userHasRated && (
            <p className="text-green-400 mt-2">
              You have already rated this project.
            </p>
          )}

          {/* User Ratings List */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-4">User Ratings</h2>
            {userRatings.length === 0 ? (
              <p className="text-gray-400">No ratings yet.</p>
            ) : (
              <div className="space-y-4">
                {userRatings.map((r) => (
                  <div
                    key={r._id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-800 p-4 rounded-2xl"
                  >
                    <Link href={`/profile/${r.userId}`}>
                      <img
                        src={r.avatar || "/default-avatar.png"}
                        alt={r.fullname}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#E0234E]"
                      />
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                      <p className="text-white font-semibold">{r.fullname}</p>
                      <div className="flex gap-1 mt-1 md:mt-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-xl ${
                              star <= r.value
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }`}
                          >
                            <FaStar />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className="mt-4 px-6 py-2 bg-[#E0234E] text-white rounded-xl hover:bg-[#ff2255] transition flex items-center gap-3 w-fit"
        >
          Login to Rate <FaSignInAlt />
        </Link>
      )}
    </div>
  );
};

export default Ratings;
