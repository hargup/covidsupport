/**
 * Declared like so for color palette groupings
 */
const themeGroup = [
  {
    group: "All Colors",
    theme: {
      // theme colors
      background: "#fffff",
      white: "#ffffff",
      text: "#666",
      grayLight: "#E9EAEA",
      gray: "#4D4B45",
      grayDarker: "#2D2B35",
      border: "hsl(0, 0%, 80%)",
      primary: "#8D81EF",
      greenText: "#3CAA6B",
      greenBack: "rgba(111, 207, 151, 0.2)",
    },
  },
];

/**
 * Flatten colors for export
 * (used in theme etc)
 */
let theme = {};
themeGroup.forEach((group) => {
  theme = Object.assign(theme, group.theme);
});

module.exports = {
  themeGroup: themeGroup,
  theme: theme,
};
