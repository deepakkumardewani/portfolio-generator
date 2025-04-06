import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-children-prop": "off",
      "react-hooks/rules-of-hooks": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/no-array-index-key": "off",
      "react/no-unstable-nested-components": "off",
      "react/no-unknown-property": "off",
    },
  },
];

export default eslintConfig;
