const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  paths: {
    appIndexJs: path.resolve(__dirname, "src/app/index.js"),
  }
};