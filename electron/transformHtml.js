var replace = require("replace");

// Trim all of the stuff we don't need to tell the browser, but keep the CSP
replace({
  regex: "<head>.*<title>",
  replacement:
    "<head><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'\" /><title>",
  paths: ["./dist/renderer/index.html"],
  recursive: false,
  silent: false,
});

// And make sure the content files are served relative
replace({
  regex: '"/static',
  replacement: "\"./static",
  paths: ["./dist/renderer/index.html"],
  recursive: false,
  silent: false,
});
