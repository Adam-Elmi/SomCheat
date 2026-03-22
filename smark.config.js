import somcheatMapper from "./mapper/somcheatMapper.js";

const config = {
    outputDir: "./",
    outputFile: "example",
    format: "mdx",
  mappingFile: somcheatMapper,
  plugins: [
    {
        name: "raw-content", options: {targetBlocks: ["Code"]}
      }
    ]
};

export default config;
