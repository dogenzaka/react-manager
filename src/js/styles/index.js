
import { Styles } from 'material-ui';

let DefaultTheme = require('./theme');

let ThemeManager = new Styles.ThemeManager();
ThemeManager.setTheme(DefaultTheme);

let Theme = ThemeManager.getCurrentTheme();

export { Theme, ThemeManager };
