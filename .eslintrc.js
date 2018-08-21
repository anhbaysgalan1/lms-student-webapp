module.exports = {
  "extends": "airbnb",
  "env": {
      "browser": true,
      "node": true
  },
  "settings": {
      "import/resolver": {
        "node": {
          "paths": ["src"]
        }
      }
  },
  "rules": {
      'no-underscore-dangle': ['error', {
          allow: ["_id"],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: false,
      }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};