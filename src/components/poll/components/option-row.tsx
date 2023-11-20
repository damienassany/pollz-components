import Ionicons from "@expo/vector-icons/Ionicons";
import { Option, PollTypes } from "pollz-js";
import React from "react";
import { OptionLabel, OptionWrapper, Tick } from "../styles";
import { Circle } from "./styles";

type Props = {
  option: Option;
  selectedOptionIds: number[];
  handleSelectOption(id: number | null): void;
  pollTypeId: PollTypes;
};

export const OptionRow: React.FC<Props> = ({
  option,
  selectedOptionIds,
  handleSelectOption,
  pollTypeId,
}) => {
  return (
    <OptionWrapper>
      <Circle
        active={selectedOptionIds.includes(option.id)}
        onPress={() => handleSelectOption(option.id)}
      >
        {selectedOptionIds.includes(option.id) && (
          <>
            {pollTypeId === PollTypes.MultipleChoice ? (
              <Ionicons name="checkmark" color={"white"} size={14} />
            ) : null}

            {pollTypeId === PollTypes.SingleChoice ? <Tick /> : null}
          </>
        )}
      </Circle>

      <OptionLabel
        suppressHighlighting
        onPress={() => handleSelectOption(option.id)}
      >
        {option.label}
      </OptionLabel>
    </OptionWrapper>
  );
};
