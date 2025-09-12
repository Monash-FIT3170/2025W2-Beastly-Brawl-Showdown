import React from "react";
import { OutlineText } from "../../components/texts/OutlineText";

const PathNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
      <OutlineText size="extraLarge">404 - Page Not Found</OutlineText>
    </div>
  );
};

export default PathNotFound;
