import React from "react";

export const SuggestionList = ({ suggestions }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      case "danger":
        return "bg-rose-50 border-rose-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Suggestions</h2>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-xl border ${getTypeStyles(
              suggestion.type
            )}`}
          >
            {suggestion.icon}
            <p className="text-sm text-gray-700">{suggestion.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
