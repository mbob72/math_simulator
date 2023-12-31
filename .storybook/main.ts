import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import {mergeConfig} from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    console.log(config)
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');

    return config;
  }
};
export default config;
