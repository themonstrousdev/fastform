const pdf = require('pdfmake');
var fonts = {
    Roboto: {
        light: 'assets/fonts/Roboto-Light.ttf',
        lightitalic: 'assets/fonts/Roboto-LightItalic.ttf',
        thin: 'assets/fonts/Roboto-Thin.ttf',
        thinitalic: 'assets/fonts/Roboto-ThinItalic.ttf',
        normal: 'assets/fonts/Roboto-Regular.ttf',
        italic: 'assets/fonts/Roboto-Italic.ttf',
        medium: 'assets/fonts/Roboto-Medium.ttf',
        mediumitalic: 'assets/fonts/Roboto-MediumItalic.ttf',
        bold: 'assets/fonts/Roboto-Bold.ttf',
        bolditalic: 'assets/fonts/Roboto-BoldItalic.ttf'
    }
};

var printer = new pdf(fonts);

module.exports = printer;