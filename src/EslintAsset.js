const { ESLint } = require('eslint');
const { Asset } = require('parcel-bundler');

const linter = new ESLint();

class EslintAsset extends Asset {
  async parse(code) {
    try {
      if (!await linter.isPathIgnored(this.name)) {
        const results = await linter.lintText(code);
        const formatter = await linter.loadFormatter("stylish");
        const resultText = formatter.format(results);
        console.info(resultText.replace('<text>', this.name));
      }
    } catch(e) {}
    return super.parse(code);
  }
}

module.exports = EslintAsset;