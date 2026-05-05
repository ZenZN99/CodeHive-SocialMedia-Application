"use client";
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
    <div className="flex items-center gap-3 text-gray-400">
      <span className="text-[#E0234E] text-lg">{icon}</span>
      <span>{label}</span>
    </div>
    <span className="text-gray-200 font-medium">{value || "-"}</span>
  </div>
);

export default InfoItem;