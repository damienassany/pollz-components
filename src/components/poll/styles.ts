import styled from "@emotion/native";
import { Text, TouchableOpacity, View } from "react-native";

export const VoteText = styled(Text)`
  color: white;
  font-size: 16px;
`;
export const VoteButton = styled(TouchableOpacity)`
  background-color: #3498db;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const OptionLabel = styled(Text)`
  font-size: 16px;
`;

export const Tick = styled(View)`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 5px;
`;

export const OptionWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const PollName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Wrapper = styled(View)`
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #ddd;
  margin-bottom: 16px;
  background-color: white;
  flex: 1;
  justify-content: space-between;
`;

export const NoPollWrapper = styled.View`
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #ddd;
  margin-bottom: 16px;
  background-color: white;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
