import Ionicons from "@expo/vector-icons/Ionicons";
import { usePollz } from "pollz-react";
import React from "react";
import { FadeIn } from "react-native-reanimated";
import { theme } from "../../../themes/base";
import { VotedText, VotedWrapper } from "../styles";

type Props = {
  greetingsText: string;
};

export const Greetings: React.FC<Props> = ({ greetingsText }) => {
  const { theme: overrideTheme } = usePollz();

  return (
    <VotedWrapper entering={FadeIn}>
      <Ionicons
        name="md-checkmark-circle"
        size={60}
        color={overrideTheme?.colors.primary || theme.colors.primary}
      />
      <VotedText>{greetingsText}</VotedText>
    </VotedWrapper>
  );
};
