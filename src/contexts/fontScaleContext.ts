import { Dispatch, SetStateAction, createContext } from "react";

interface FontScaleContextType {
  fontScale: number;
  setFontScale: Dispatch<SetStateAction<number>>;
}

const FontScaleContext = createContext<FontScaleContextType>({
  fontScale: 0,
  setFontScale: () => {},
});

export default FontScaleContext;
