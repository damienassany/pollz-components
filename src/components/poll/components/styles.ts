import styled from "@emotion/native";
import { theme } from "../../../themes/base";

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const RadioTouchable = styled.TouchableOpacity<{ active?: boolean }>`
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
