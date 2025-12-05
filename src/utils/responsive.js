import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// Base sizes (based on standard 375x812 device)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const responsiveFont = (size) => {
  return PixelRatio.getFontScale() < 1.2
    ? moderateScale(size)
    : moderateScale(size * 0.9);
};
