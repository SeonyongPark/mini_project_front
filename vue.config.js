const { defineConfig } = require('@vue/cli-service')
let path = require("path");
__dirname = path.resolve();

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "C:/ssafy/workspace/new_gwan/whereismyhome_vue/whereismyhome_springboot_source/src/main/resources/static"),
  publicPath: "/"
});
