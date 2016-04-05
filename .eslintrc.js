module.exports = {
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "ecmaFeatures": {
        "arrowFunctions": true,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "modules": true,
        "spread": true,
        "templateStrings": true
    },
    "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        }
    },
    "rules": {
        "no-unused-vars": 1,
        "prefer-const": 1,
        "no-var": 2,
        "strict": [2, "never"],
        "quotes": [1, "single"],         // http://eslint.org/docs/rules/quotes
        "no-underscore-dangle": 0,       // http://eslint.org/docs/rules/no-underscore-dangle
        "new-cap": [2, {                 // http://eslint.org/docs/rules/new-cap
          "capIsNewExceptions": [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "Eid",
            "Mixin",
            "Reflux",
            "RefluxPromise"
          ]
        }],
        "indent": 2,

        /**
         * JSX style
         */
        "react/display-name": 0,         // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
        "react/jsx-boolean-value": 1,    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        "jsx-quotes": [1, "prefer-double"], // https://github.com/eslint/eslint/blob/master/lib/rules/jsx-quotes.js
        "react/jsx-no-undef": 2,         // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
        "react/jsx-uses-vars": 1,        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        "react/no-did-mount-set-state": [1, "allow-in-func"], // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        "react/no-did-update-set-state": 1, // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        "react/no-unknown-property": 1,  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        "react/self-closing-comp": 1,    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        "react/wrap-multilines": 1,      // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md

        /**
         * Complexity
         */
        "complexity": [1, 11],           // http://eslint.org/docs/rules/complexity.html
        "max-depth": [1, 5],             // http://eslint.org/docs/rules/max-depth
        "max-nested-callbacks": [1, 5],  // http://eslint.org/docs/rules/max-nested-callbacks
        "max-params": [1, 5],            // http://eslint.org/docs/rules/max-params
        "max-statements": [1, 25],       // http://eslint.org/docs/rules/max-statements

        /**
         * Component validation
         */
        "react/prop-types": 1            // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    }
};