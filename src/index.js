import './index.html';
import './index.css';
import dva from 'dva';

import 'react-fastclick';

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

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
