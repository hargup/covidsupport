/**
 * Declared like so for color palette groupings
 */
const mediaGroup = [
  {
    group: "All Media Breakpoints",
    media: {
      // theme colors
      desktop: "@media (min-width: 800px)",
      mobile: "@media (max-width: 799px)",
    },
  },
];

/**
 * Flatten colors for export
 * (used in theme etc)
 */

let media = {};
mediaGroup.forEach((group) => {
  media = Object.assign(media, group.media);
});

module.exports = {
  mediaGroup: mediaGroup,
  media: media,
};
