import './index.html';
import './index.css';
import dva from 'dva';

var FastClick = require('fastclick');
FastClick.attach(document.body, {});

// 1. Initialize
const app = dva({});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./model/home'));
app.model(require('./model/category'));
app.model(require('./model/apply'));
app.model(require('./model/order'));
app.model(require('./model/delivery'));
app.model(require('./model/favor'));
app.model(require('./model/team'));

// 4. Router
app.router(require('./router'));

document.getElementById("loading").remove();

String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}

// 5. Start
app.start('#root');
