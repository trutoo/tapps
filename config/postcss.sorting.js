module.exports = {
  "order": [
    "custom-properties",
    "dollar-variables",
    "declarations",
    "at-rules",
    {
      "type": "at-rule",
      "name": "include"
    },
    {
      "type": "at-rule",
      "name": "include",
      "parameter": "icon"
    },
    "rules"
  ],
  "properties-order": [
    {
      "emptyLineBefore": true,
      "properties": [
        "margin",
        "padding"
      ]
    },
    {
      "emptyLineBefore": true,
      "properties": [
        "border",
        "background"
      ]
    }
  ],
  "unspecified-properties-position": "bottom"
}