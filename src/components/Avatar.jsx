import React from "react";

/* Renders a colored square with athlete initials.
   Falls back gracefully when athlete photos fail to load. */
export default function Avatar({ initials, color, size = "md", rounded = "rounded-lg" }) {
  const sizes = {
    xs:  "w-6 h-6 text-[0.55rem]",
    sm:  "w-8 h-8 text-xs",
    md:  "w-10 h-10 text-sm",
    lg:  "w-14 h-14 text-base",
    xl:  "w-16 h-16 text-lg",
    "2xl": "w-20 h-20 text-xl",
  };

  return (
    <div
      className={`avatar-initials ${sizes[size]} ${rounded}`}
      style={{ backgroundColor: color || "#7c3aed" }}
    >
      {initials}
    </div>
  );
}
