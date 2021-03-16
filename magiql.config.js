module.exports = {
  schema: "./libs/hasura/schema.graphql",
  src: "./",
  artifactDirectory: "./libs/hasura/generated",
  extensions: ["ts", "tsx", "js", "jsx", "graphql"],
  quiet: false,
  watch: true,
  runWithBabel: false,
  language: "typescript",
  include: ["**"],
  exclude: ["**/node_modules/**", "**/__mocks__/**", `**/generated/**`],
};
