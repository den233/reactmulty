import React from 'react';
import Counter from '../components/counter'
import counter from '../reducers/reducers'
import { createStore } from 'redux'
const store = createStore(counter)
import {
  Route,
  Link
} from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul >
          <li style={{ display: this.props.isLogin ? "none" : "block" }}>
            <Link to="/">登录</Link>
          </li>
          <li>
            <Link to="/increase">jianfa</Link>
          </li>
          <li>
            <Link to="/About">关于我们</Link>
          </li>
          <li>
            <Link to="/News">新闻页面</Link>
          </li>
          <li>
            <Link to="/PageShow">分页演示</Link>
          </li>
        </ul>
        <Counter
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
        
      </div>

    )

  }
}
// store.subscribe(render)