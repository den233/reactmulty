import 'babel-polyfill';
import 'raf/polyfill';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route,Link} from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer  from './reducers/reducers'
import Increase from './components/Increase';
import Decrease from './components/Decrease';
const store = createStore(reducer)
// import App from './components/App'
// class PageS extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1 className="App-title">PageS</h1>
//         </header>
// 				<div><a href="/index.html">to home</a></div>
// 				<div><a href="/pageF/index.html">to pageF</a></div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<PageS />, document.getElementById('root'));
 

ReactDOM.render(
  <Provider store={store}>
    
   <HashRouter>
        <Switch>
        <Route exact path="/" component={Increase}/>
          <Route exact path="/increase" component={Increase}/>
          <Route exact path="/decrease" component={Decrease}/>
        </Switch>
        {/* <span className="routerLink"><Link to='/'>加法页面</Link></span>
          <span className="routerLink"><Link to='/decrease'>减法页面</Link></span> */}
    </HashRouter>
  
   
 
     
  </Provider>,
  document.getElementById('root')
)
// ReactDOM.render(
//   <Router/>,
//   document.getElementById('root')
// );