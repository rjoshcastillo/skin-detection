// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
    // Adds support for `.db` files for SQLite databases
    'json'
  );
config.resolver.sourceExts = config.resolver.sourceExts.filter(
    (ext) => ext !== "json"
  );

  
config.resolver.assetExts.push(
    // Adds support for `.db` files for SQLite databases
    'bin'
  );
config.resolver.sourceExts = config.resolver.sourceExts.filter(
    (ext) => ext !== "bin"
  );

module.exports = config;
