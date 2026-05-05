"use client";

import { ProjectDetailsImagesModalProps } from "@/app/types/props";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const ImagesModal = ({
  showImageModal,
  setShowImageModal,
  project,
  activeImageIndex,
  setActiveImageIndex,
}: ProjectDetailsImagesModalProps) => {
  return (
    <div>
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-2 text-white text-3xl hover:text-[#E0234E]"
            >
              <MdCancel />
            </button>

            <img
              src={project.images[activeImageIndex]}
              alt="project"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />

            {project.images.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8">
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? project.images.length - 1 : prev - 1
                    )
                  }
                  className="text-white text-4xl hover:text-[#E0234E]"
                >
                  <IoIosArrowBack />
                </button>

                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === project.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="text-white text-4xl hover:text-[#E0234E]"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesModal;
