import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const sizes = (size:number) => screenWidth * (size / width);

const horizontalScale = (size:number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size:number) => (height / guidelineBaseHeight) * size;
const moderateScale = ({size, factor = 0.5} : {size : number, factor? : number}) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale, sizes, screenWidth, screenHeight };
