import { Option } from "pollz-js";
import React from "react";
import { OptionLabel, OptionWrapper, Tick } from "../styles";
import { RadioTouchable } from "./styles";

type Props = {
  option: Option;
  selectedOptionId: number | null;
  handleSelectOption(id: number | null): void;
};

export const OptionRow: React.FC<Props> = ({
  option,
  selectedOptionId,
  handleSelectOption,
}) => {
  return (
    <OptionWrapper>
      <RadioTouchable
        active={selectedOptionId === option.id}
        onPress={() => handleSelectOption(option.id)}
      >
        {selectedOptionId === option.id && <Tick />}
      </RadioTouchable>
      <OptionLabel
        suppressHighlighting
        onPress={() => handleSelectOption(option.id)}
      >
        {option.label}
      </OptionLabel>
    </OptionWrapper>
  );
};
