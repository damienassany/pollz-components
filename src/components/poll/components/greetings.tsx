import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FadeIn } from "react-native-reanimated";
import { theme } from "../../../themes/base";
import { VotedText, VotedWrapper } from "../styles";

type Props = {
  greetingsText: string;
};

export const Greetings: React.FC<Props> = ({ greetingsText }) => {
  return (
    <VotedWrapper entering={FadeIn}>
      <Ionicons
        name="md-checkmark-circle"
        size={60}
        color={theme.colors.primary}
      />
      <VotedText>{greetingsText}</VotedText>
    </VotedWrapper>
  );
};
