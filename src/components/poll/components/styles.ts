import styled from "@emotion/native";
import { theme } from "../../../themes/base";

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Circle = styled.TouchableOpacity<{ active?: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #aaa;
  justify-content: center;
  align-items: center;
  ${({ active }) => active && `background-color: ${theme.colors.primary};`}
`;

export const AddOptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const AddOptionInput = styled.TextInput`
  flex: 1;
  height: 40px;
  border-width: 1px;
  border-radius: 5px;
  margin-right: 8px;
  padding: 8px;
  border-color: #aaa;
`;

export const AddOptionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
