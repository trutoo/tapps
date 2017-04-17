module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "selector-type-no-unknown": [
      true,
      {
        "ignoreTypes": [
          "/deep/"
        ]
      }
    ]
  }
}