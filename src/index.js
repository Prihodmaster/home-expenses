// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router-dom";
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';
// import "assets/css/material-dashboard-react.css?v=1.3.0";
// import indexRoutes from "routes/index.jsx";
//
// const history = createBrowserHistory();
// const store = configureStore();
//
// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <Switch>
//                 {indexRoutes.map((prop, key) => {
//                     return <Route path={prop.path} component={prop.component} key={key} />;
//                 })}
//             </Switch>
//         </Router>
//     </Provider>,
//   document.getElementById("root")
// );
//
// export default history;


import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/configureStore';
import "assets/css/material-dashboard-react.css?v=1.3.0";
import indexRoutes from "routes/index.jsx";

const history = createBrowserHistory();
// const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </Router>
    </Provider>,
  document.getElementById("root")
);

export default history;