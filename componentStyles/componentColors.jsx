export function spreadColors(colordata) {
  // console.log(colordata);
  // console.log(colorUIModal);

  return {
    PRIMARY: colordata?.primary,
    THIRD: colordata?.third,
    WHITE: 'white',
    BLACK: 'black',
    SECONDARY: colordata?.secondary,
  };
}
export const todoColors = {};
