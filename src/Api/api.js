import fetch from 'src/utils/http';
let configPath = 'http://localhost:3100';// 真实环境
 var isProduction = process.env.NODE_ENV === 'production'
// if (isProduction) {} else {
//   configPath = 'http://localhost:3000' // 开发环境
// }
 
console.log(configPath)
 
// 1登录
// var wh = 'http://oms.52haigo.cn/api'
// 登录失效判断
 const handleToken = function(result) {
      console.log(result)
      return result.token;
  
}
const login = params => {
  let url='http://zhixiao.cn/api/auth/login';
  return fetch.request(url, params, {method:"get"}).then(response => handleToken(response));
};
let apiConfig = {};
// 2 商品分类
//  {baseurl}/v2/productSale.html?strAction=productsale_category_query
apiConfig.categoryList = params => {
  let url=configPath + '/v2/productSale.html?strAction=productsale_category_query'
  return fetch.get(url,params )
   
};
//  3在售商品
// strAction=productsale_list
// orderType=21(激活单)，22(重消单)
// productName=
// category=(商品分类)
// _currPageNo=1(当前页)
// _pageSize=20(页数)
apiConfig.productSale = params => {
  let url=configPath + '/v2/productSale.html?strAction=productsale_list'
  return fetch.request(url, params, {method:"get"})
};
//  4添加商品至购物车
//  {baseurl}/v2/trolley.html?strAction= trolley_detail_add
// 请求内容{
//  "ppsId" : 1007561,
//  "orderType": "21",
//  "quantity": 3
// }
apiConfig.trolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_add'
  return fetch.request(url, params, {method:"post"})
};
 
//  5修改商品至购物车
//  {baseurl}/v2/trolley.html?strAction= trolley_detail_modify
// 请求内容{
//  "ppsId" : 1007561,
//  "orderType": "21",
//  "quantity": 3
// }
apiConfig.editTrolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_modify'
  return fetch.request(url, params, {method:"post"})
};
 
//  6用户购物车
//  {baseurl}/v2/trolley.html?strAction=trolley_get&orderType=21
apiConfig.trolleyList = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_get'
  return fetch.request(url, params, {method:"get"})
};

//  7移除购物车条目
//  {baseurl}/v2/trolley.html?strAction=trolley_detail_remove
//  {"ppsId": 1005393, "orderType": "21"}
apiConfig.deleteTrolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_remove'
  return fetch.request(url, params, {method:"post"})
};

//  8查询购物车条目
//  baseurl} /v2/trolley.html?strAction=trolley_detail_get&trolleyDetailId=12
apiConfig.detailTrolley = params => {
  let url= configPath + '/v2/trolley.html?strAction=trolley_detail_get'
  return fetch.request(url, params, {method:"post"})
};

//  9新增待支付订单
// {baseurl}/v2/tmpOrder.html?strAction=tmporder_add
apiConfig.addTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_add'
  return fetch.request(url, params, {method:"post"})
};

//  10查询所有待支付订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_list&_currPageNo=1&_pageSize=10&orderNo=CZxxx
apiConfig.allTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_list'
  return fetch.request(url, params, {method:"get"})
};


//  11查询单个待支付订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_get&orderNo=CZxxx
apiConfig.oneTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_get'
  return fetch.request(url, params, {method:"get"})
};

//  12移除待支付订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_remove
apiConfig.deleteTmpOrder = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_remove'
  return fetch.request(url, params, {method:"post"})
};
//  13查询激活单卡别
//  {baseurl}/v2/tmpOrder.html?strAction= tmporder_cardtype_query&pv=2000
apiConfig.cardtype_query = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_cardtype_query'
  return fetch.request(url, params, {method:"get"})
};

//  14查询运费
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_postfee_query &price=499
apiConfig.postfee_query = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_postfee_query'
  return fetch.request(url, params, {method:"get"})
};

//  15查询待支付金额分配
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_payment_query&price=499&orderType=22&pv=100
apiConfig.payment_query = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_payment_query'
  return fetch.request(url, params, {method:"get"})
};
//  17.待支付激活单详情页
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_payment_query&price=499&orderType=22&pv=100
apiConfig.tmporder_czk_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czk_checkout'
  return fetch.request(url, params, {method:"get"})
};
//  18.当前会员信息
//  {baseurl}/v2/member.html?strAction=member_me_get
apiConfig.member_me_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_me_get'
  return fetch.request(url, params, {method:"get"})
};
 
//  19.会员信息
//  {baseurl}/v2/member.html?strAction=member_get&memberCode=999999
apiConfig.member_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_get'
  return fetch.request(url, params, {method:"get"})
};

//  20.查询服务人
//  {baseurl}/v2/member.html?strAction=member_linkno_get&linkNo=CN01363759
apiConfig.member_linkno_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_linkno_get'
  return fetch.request(url, params, {method:"get"})
};

//  20.查询销售网节点信息
//  {baseurl}/v2/member.html?strAction=member_recommendno_get&recommendNo=CN01363759
apiConfig.member_recommendno_get = params => {
  let url= configPath + '/v2/member.html?strAction=member_recommendno_get'
  return fetch.request(url, params, {method:"get"})
};

//  21.确认支付超值卡重销订单
//  {baseurl}/v2/tmpOrder.html?strAction=tmporder_czkre_checkout
apiConfig.tmporder_czkre_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czkre_checkout'
  return fetch.request(url, params, {method:"post"})
};
//  21.确认支付超值卡激活订单
// {baseurl}/v2/tmpOrder.html?strAction=tmporder_czk_checkout
apiConfig.tmporder_czk_checkout = params => {
  let url= configPath + '/v2/tmpOrder.html?strAction=tmporder_czk_checkout'
  return fetch.request(url, params, {method:"post"})
};
 
const apiList = {
  login,
  apiConfig
};

export default apiList;
