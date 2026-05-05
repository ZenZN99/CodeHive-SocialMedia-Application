"use client";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export const promptToast = (
  onConfirm: (value: string) => void,
  {
    title = "Enter value",
    placeholder = "",
    confirmText = "Confirm",
    cancelText = "Cancel",
    initialValue = "",
  } = {},
) => {
  let value = initialValue;

  toast.custom((t) => (
    <div className="bg-gray-900 border border-blue-700 rounded-xl p-4 w-85 shadow-xl">
      <p className="text-white text-sm mb-3">{title}</p>

      <input
        autoFocus
        defaultValue={initialValue}
        onChange={(e) => (value = e.target.value)}
        placeholder={placeholder}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 text-sm rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          {cancelText}
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm(value);
          }}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          {confirmText}
        </button>
      </div>
    </div>
  ));
};

export const confirmDeleteToast = (
  onConfirm: () => void,
  message = "Are you sure?",
) => {
  toast.custom((t) => (
    <div className="bg-gray-900 border border-red-700 rounded-xl p-4 w-[320px] shadow-xl">
      <p className="text-white text-sm mb-4">{message}</p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 text-sm rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-500 flex items-center gap-1"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  ));
};
