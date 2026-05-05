"use client";
import { getProjectById } from "@/app/api/project/request";
import { getProjectRating, rateProject } from "@/app/api/rating/request";
import ImagesGrid from "@/app/components/projects/[id]/ImagesGrid";
import ImagesModal from "@/app/components/projects/[id]/ImagesModal";
import Links from "@/app/components/projects/[id]/Links";
import Ratings from "@/app/components/projects/[id]/Ratings";
import Skills from "@/app/components/projects/[id]/Skills";
import ProjectDetailsSkeleton from "@/app/components/skeleton/ProjectDetailsSkeleton";
import ProtectedRoute from "@/app/routes/ProtectedRoute";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { IProject } from "@/app/types/project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface IUserRating {
  _id: string;
  userId: string;
  fullname: string;
  avatar: string;
  value: number;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();

  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRatings, setUserRatings] = useState<IUserRating[]>([]);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [userHasRated, setUserHasRated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProject = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getProjectById(id as string);
      setProject(data);

      const ratingData = await getProjectRating(id as string);
      setAverageRating(ratingData.average);
      setRatingCount(ratingData.count);

      setUserRatings(ratingData.userRatings || []);

      if (user && ratingData.userRatings) {
        const existing = ratingData.userRatings.find(
          (r: any) => r.userId === user._id,
        );
        if (existing) {
          setSelectedRating(existing.value);
          setUserHasRated(true);
        }
      }
    } catch {
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleConfirmRating = async () => {
    if (!user || !project || selectedRating === null) return;
    if (userHasRated) {
      toast.error("You have already rated this project!");
      return;
    }

    setSubmitting(true);
    try {
      await rateProject(project._id, selectedRating);
      toast.success("Rating submitted!");
      setUserHasRated(true);
      fetchProject();
    } catch {
      toast.error("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !project) {
    return <ProjectDetailsSkeleton />;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-6 text-gray-300">
        {/* Title & Description */}
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {project.title}
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          {project.description}
        </p>

        {/* Images Grid */}
        <ImagesGrid
          project={project}
          setActiveImageIndex={setActiveImageIndex}
          setShowImageModal={setShowImageModal}
        />

        {/* Skills */}
        <Skills project={project} />

        {/* Links */}
        <Links project={project} />

        {/* Ratings */}
        <Ratings
          user={user}
          averageRating={averageRating}
          ratingCount={ratingCount}
          userHasRated={userHasRated}
          submitting={submitting}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
          handleConfirmRating={handleConfirmRating}
          userRatings={userRatings}
        />

        {/* Image Modal */}
        <ImagesModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          project={project}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
        />
      </div>
    </ProtectedRoute>
  );
};

export default ProjectDetails;
