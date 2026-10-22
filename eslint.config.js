import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginVueScopedCSS from 'eslint-plugin-vue-scoped-css'

export default defineConfig([
    {
        ignores: ['dist/**', 'temp*/**'],
    },

    // Standard JavaScript rules

    js.configs.recommended,

    // TypeScript rules

    ...tseslint.configs.recommended,

    // Vue 3 rules

    ...pluginVue.configs['flat/recommended'],

    // Vue-specific overrides

    {
        files: ['**/*.vue'],
        rules: {
            'vue/attribute-hyphenation': 'off',
            'vue/attributes-order': 'off',
            'vue/first-attribute-linebreak': 'off',
            'vue/html-closing-bracket-newline': 'off',
            'vue/html-closing-bracket-spacing': 'off',
            'vue/html-indent': 'off',
            'vue/html-quotes': 'off',
            'vue/html-self-closing': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/order-in-components': 'off',
            'vue/no-multi-spaces': 'off',
            'vue/multiline-html-element-content-newline': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/mustache-interpolation-spacing': 'off',
            'vue/no-spaces-around-equal-signs-in-attribute': 'off',
            'vue/no-v-html': 'off',
            'vue/no-v-text-v-html-on-component': 'off',
            'vue/singleline-html-element-content-newline': 'off',
        },
    },

    // TypeScript + Vue configuration

    {
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                sourceType: 'module',
            },
        },
    },

    // Vue scoped CSS

    {
        files: ['**/*.vue'],
        plugins: {
            vueScopedCss: eslintPluginVueScopedCSS,
        },
        extends: [
            'vueScopedCss/recommended',
        ],
    },
]);
