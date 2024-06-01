"use client";

import FontScaleContext from "@/contexts/fontScaleContext";
import { useState } from "react";

const SettingsWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [fontScale, setFontScale] = useState(1);
  return (
    <FontScaleContext.Provider value={{ fontScale, setFontScale }}>
      {children}
    </FontScaleContext.Provider>
  );
};

export default SettingsWrapper;
