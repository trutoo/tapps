module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    /* Angular Specific */
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