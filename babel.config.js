

module.exports = function (api) {
  api.cache(false);

  return {
    plugins: [["module:react-native-dotenv"],["nativewind/babel"],],
    presets: ["babel-preset-expo"],
  };
};
