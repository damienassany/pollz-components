import styled from "@emotion/native";
import Animated from "react-native-reanimated";
import { Text, TextSemiBold } from "../../_components/text";
import { theme } from "../../themes/base";

export const VoteText = styled(Text)`
  color: white;
  font-size: 16px;
`;
export const VoteButton = styled.Pressable`
  background-color: ${theme.colors.primary};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const OptionLabel = styled(Text)`
  font-size: 16px;
  flex: 1;
`;

export const Tick = styled.View`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 5px;
`;

export const OptionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const PollName = styled(TextSemiBold)`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const Wrapper = styled.View`
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #ddd;
  margin-bottom: 16px;
  background-color: white;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
`;

export const NoPollWrapper = styled.View`
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #ddd;
  margin-bottom: 16px;
  background-color: white;
  width: 100%;
  min-height: 200px;
  align-items: center;
  justify-content: center;
`;

export const VotedText = styled(Text)`
  font-size: 20px;
`;

export const VotedWrapper = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-vertical: 20px;
`;
