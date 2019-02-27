import {connect} from 'react-redux';//引入connect 用于把数据和组件进行关联
import {incraceAction} from '../redux/action.js';//引入action 和react相关组件
import React,{Component} from 'react';
import {
    Route,
    Link
  } from 'react-router-dom';
// import '../css/increase.css'
class Counter extends Component{
    render(){
        const {count,decreaseClick}=this.props;
        return(
            <div className='content'>
            <ul >
          <li  >
            <Link to="/">登录</Link>
          </li>
          <li>
            <Link to="/increase">jianfa</Link>
          </li>
          <li>
            <Link to="/decrease">关于我们</Link>
          </li>
          <li>
            <Link to="/News">新闻页面</Link>
          </li>
          <li>
            <Link to="/PageShow">分页演示</Link>
          </li>
        </ul>
            <p className="title">加法页面</p>
            <p className="text">{count}</p>
            <button className='btn' onClick={decreaseClick}>加上</button>
            </div>
        )
    }
 }
 const mapStateToProps=(state)=>({
     count:state.count
 })
 const mapDispatchToProps=(dispatch)=>({
    incraceClick:()=>dispatch(incraceAction(2)),
 })
 const Decrease =connect(
    mapStateToProps,
    mapDispatchToProps
 )(Counter)
 export default Decrease;