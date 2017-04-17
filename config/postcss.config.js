var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

module.exports = (webpack) => ({
  plugins: [
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require('postcss-import')({
      path: 'src/',
      addModulesDirectories: ["node_modules", "evry_modules"],
      resolve: (id, basedir, importOptions) => {
        return id.charAt(0) === '/' ? importOptions.path.map((path) => {
          return path + id;
        }) : id;
      }
    }),
    // Simple template to prevent repeating code, e.g. @define-mixin headline $size { font-size: $size; } span { @mixin headline 32px; }
    // https://github.com/postcss/postcss-mixins
    require('postcss-mixins')(),
    // Sass like variables, e.g. $red: #f00 div { background: $red; }
    // https://github.com/postcss/postcss-simple-vars
    require('postcss-simple-vars')(),
    // Enables @if statements, e.g. .foo { @if 3 < 5 { background: green; }
    // https://github.com/andyjansson/postcss-conditionals
    require('postcss-conditionals')(),
    // PostCSS plugin to rebase url(), inline or copy asset, e.g. div { background: url('img.jpg'); }
    // https://github.com/assetsjs/postcss-assets
    require('postcss-url')({}),
    // Custom vr unit to help maintain a vertical rhythm, e.g. p { margin-bottom: 2vr; }
    // https://github.com/jameskolce/postcss-lh
    require('postcss-lh')({ lineHeight: 2.5, rhythmUnit: 'vr' }),
    // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
    // https://github.com/postcss/postcss-custom-media
    require('postcss-custom-media')(),
    // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
    // https://github.com/postcss/postcss-media-minmax
    require('postcss-media-minmax')(),
    // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
    // https://github.com/postcss/postcss-custom-selectors
    require('postcss-custom-selectors')(),
    // Enables @for loop syntax, e.g. @for @i from $from to $to { .a-@i { width: calc(100% / $to * @i) } }
    // https://github.com/xori/postcss-for
    require('postcss-for-var')(),
    // W3C calc() function, e.g. div { height: calc(100px - 2em); }
    // https://github.com/postcss/postcss-calc
    require('postcss-calc')(),
    // Allows you to nest one style rule inside another
    // https://github.com/postcss/postcss-nested
    require('postcss-nested')(),
    // W3C color() function, e.g. div { background: color(red alpha(90%)); }
    // https://github.com/postcss/postcss-color-function
    require('postcss-color-function')(),
    // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
    // https://github.com/iamvdo/pleeease-filters
    require('pleeease-filters')(),
    // Generate pixel fallback for 'rem' units, e.g. div { margin: 2.5rem 2px 3em 100%; }
    // https://github.com/robwierzbowski/node-pixrem
    require('pixrem')({ rootValue: 10, }),
    // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
    // https://github.com/postcss/postcss-selector-matches
    require('postcss-selector-matches')(),
    // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
    // https://github.com/postcss/postcss-selector-not
    require('postcss-selector-not')(),
    // Add vendor prefixes to CSS rules using values = require(caniuse.com)
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
    // Removes /* Comment */ but keeps /*! Comment */ to clean up code
    // https://github.com/ben-eb/postcss-discard-comments
    require('postcss-discard-comments')(),
  ]
});