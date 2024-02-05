import Ionicons from "@expo/vector-icons/Ionicons";
import { Option, PollTypes } from "pollz-js";
import { usePollz } from "pollz-react";
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
  const { theme: overrideTheme } = usePollz();

  return (
    <OptionWrapper>
      <Circle
        active={selectedOptionIds.includes(option.id)}
        color={overrideTheme?.colors.primary}
        onPress={() => handleSelectOption(option.id)}
      >
        {selectedOptionIds.includes(option.id) && (
          <>
            {pollTypeId === PollTypes.MultipleChoice ? (
              <Ionicons name="checkmark" color={"white"} size={14} />
            ) : null}

            {[PollTypes.SingleChoice, PollTypes.Scale].includes(pollTypeId) ? (
              <Tick />
            ) : null}
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
