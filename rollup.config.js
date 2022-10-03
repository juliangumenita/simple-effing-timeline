import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default {
  input: "./src/library.js",
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "esm", sourcemap: true },
  ],
  external: [
    /@babel\/runtime/,
    /react\/jsx-runtime/,
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    babel({
      babelHelpers: "runtime",
      plugins: ["@babel/plugin-transform-runtime"],
    }),
  ],
};
