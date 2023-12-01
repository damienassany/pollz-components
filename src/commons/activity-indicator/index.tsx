import React from "react";
import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from "react-native";
import { theme } from "../../themes/base";

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = (props) => (
  <RNActivityIndicator color={theme.colors.primary} {...props} />
);
