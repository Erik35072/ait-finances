const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@common-components": path.resolve(__dirname, "src/components/common"),
      "@components": path.resolve(__dirname, "src/components"),
      "@api": path.resolve(__dirname, "src/api"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@utils": path.resolve(__dirname, "src/utils")
    }
  }
};
