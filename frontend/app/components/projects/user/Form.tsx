"use client";
import { SKILLS } from "@/app/libs/skills";
import { UserProjectsFormProps } from "@/app/types/props";
import { UserLevels } from "@/app/types/user";

const Form = ({
  handleSubmit,
  editingProject,
  projectForm,
  handleInputChange,
  toggleSkill,
  projectFiles,
  handleFilesChange,
  setProjectFiles,
  submitting,
}: UserProjectsFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5 mb-10">
        <h3 className="text-2xl font-bold">
          {editingProject ? "Edit Project" : "Create Project"}
        </h3>

        <input
          name="title"
          value={projectForm.title}
          onChange={handleInputChange}
          className="w-full bg-gray-800 p-3 rounded-xl"
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          value={projectForm.description}
          onChange={handleInputChange}
          className="w-full bg-gray-800 p-3 rounded-xl"
          placeholder="Description"
          rows={4}
          required
        />

        <select
          name="level"
          value={projectForm.level}
          onChange={handleInputChange}
          className="w-full bg-gray-800 p-3 rounded-xl"
        >
          {Object.values(UserLevels).map((lvl) => (
            <option key={lvl} value={lvl} className="cursor-pointer">
              {lvl}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="w-full bg-gray-800 p-3 rounded-xl"
          name="linkDemo"
          value={projectForm.linkDemo}
          onChange={handleInputChange}
          placeholder="Preview link (optional)"
        />

        <input
          type="text"
          className="w-full bg-gray-800 p-3 rounded-xl"
          name="linkGitHub"
          value={projectForm.linkGitHub}
          onChange={handleInputChange}
          placeholder="GitHub link (optional)"
        />

        {/* SKILLS */}
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <button
              type="button"
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 cursor-pointer rounded-full border transition ${
                projectForm.skills.includes(skill)
                  ? "bg-[#E0234E] border-[#E0234E]"
                  : "border-gray-600 hover:border-gray-400"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* FILE UPLOAD */}
        <div className="space-y-3">
          <label className="block text-sm text-gray-400">
            Project Images (max 5)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            disabled={projectFiles.length >= 5}
            onChange={handleFilesChange}
            className="block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:bg-[#E0234E]/20 file:text-[#E0234E]
              hover:file:bg-[#E0234E]/30
              cursor-pointer"
          />

          {/* PREVIEW */}
          {projectFiles.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {projectFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-28 h-28 rounded-2xl overflow-hidden border border-gray-700 group"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setProjectFiles(
                        projectFiles.filter((_, i) => i !== index),
                      )
                    }
                    className="absolute top-2 right-2 w-7 h-7 rounded-full
                      bg-black/70 text-white
                      opacity-0 group-hover:opacity-100
                      transition flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`
    flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-bold cursor-pointer
    transition
    ${
      submitting
        ? "bg-[#E0234E]/70 cursor-not-allowed"
        : "bg-[#E0234E] hover:opacity-90"
    }
  `}
        >
          {submitting && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {submitting
            ? editingProject
              ? "Updating..."
              : "Creating..."
            : editingProject
              ? "Update"
              : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Form;
