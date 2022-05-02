import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectInputInitialValue,
  selectIsEditMode,
  createNewMessage,
  editMessage,
} from "../chatsSlice";

export function MessageForm() {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector(selectInputInitialValue);
  const isEditMode = useAppSelector(selectIsEditMode);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.length > 0) {
      dispatch(
        isEditMode
          ? editMessage({ text: value })
          : createNewMessage({ text: value })
      );
      setValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="textarea"
        name="message"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">{isEditMode ? "edit" : "send"}</button>
    </form>
  );
}
