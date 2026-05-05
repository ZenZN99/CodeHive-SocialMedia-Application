"use client";
import { ProjectDetailsImagesGridProps } from "@/app/types/props";

const ImagesGrid = ({
  project,
  setActiveImageIndex,
  setShowImageModal,
}: ProjectDetailsImagesGridProps) => {
  return (
    <div>
      {project.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {project.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={project.title}
              onClick={() => {
                setActiveImageIndex(idx);
                setShowImageModal(true);
              }}
              className="w-full h-48 md:h-60 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesGrid;
