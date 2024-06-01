import { MainText } from "@/app/styles/globalStyles";
import {
  ColorPickerInput,
  ColumnInuput,
  ColumnSubmitButton,
  ColumnSubmitForm,
} from "../style";
import { CrossIcon } from "@/app/styles/icons";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { invoke } from "@tauri-apps/api/tauri";
import HintWrapper from "@/app/components/hintWrapper/hintWrapper";
import FontScaleContext from "@/contexts/fontScaleContext";

interface Props {
  searchParams: ReadonlyURLSearchParams;
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

const CreateColumnItem = (props: Props) => {
  const { searchParams, setColumns } = props;

  const { fontScale } = useContext(FontScaleContext);

  const [isAcitve, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ff5d5d");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAcitve && title !== "") {
      invoke<Column[]>("add_column", { title, color })
        .then(setColumns)
        .catch(console.error);
      setTitle("");
      setIsActive(false);
      return;
    }
    setIsActive(!isAcitve);
  };

  useEffect(() => {
    setIsActive(false);
    setTitle("");
  }, [searchParams]);

  return (
    <ColumnSubmitForm onSubmit={submit}>
      {isAcitve && (
        <>
          <ColumnInuput
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            $fontScale={fontScale}
          />
          <ColorPickerInput
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </>
      )}
      <HintWrapper hint="Create column">
        <ColumnSubmitButton $fontScale={fontScale}>
          {isAcitve && <MainText>Submit</MainText>}
          <CrossIcon />
        </ColumnSubmitButton>
      </HintWrapper>
    </ColumnSubmitForm>
  );
};

export default CreateColumnItem;
