import React from "react";
import { ArrowRight } from "lucide-react";

interface AnnouncementProps {
  type: "announcement" | "critical";
  title: string;
  description: string;
}

const AnnouncementCard = ({ type, title, description }: AnnouncementProps) => {
  const isCritical = type === "critical";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-[25px] w-full transition-all cursor-pointer hover:opacity-90 ${
        isCritical ? "bg-[#fce8e8]" : "bg-[#e3f7e9]"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${isCritical ? "bg-[#ff5252]" : "bg-[#58f18e]"}`}
        >
          {isCritical ? (
            <span className="text-white">⏱️</span>
          ) : (
            <span className="text-white">📢</span>
          )}
        </div>

        <div>
          <p
            className={`text-[10px] font-bold uppercase tracking-wider ${isCritical ? "text-[#c53030]" : "text-[#2d7a4d]"}`}
          >
            {title}
          </p>
          <p className="text-sm font-bold text-gray-800">{description}</p>
        </div>
      </div>

      <ArrowRight size={20} className="text-gray-700 mr-2" />
    </div>
  );
};

export default AnnouncementCard;
