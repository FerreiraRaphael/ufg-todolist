import { Dimensions } from "react-native";

const window = Dimensions.get('window');

export const theme = {
  unit: 10,
  window: {
    height: window.height,
    width: window.width
  }
}

