import React, { Component } from 'react'
import api from 'src/Api/api'
import { message, Icon, Collapse, Pagination, Select, Form, Card, Input, Col, InputNumber, Tabs,  Button, Spin } from 'antd'
import styles from './App.scss'
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const { Meta } = Card;
const { Option } = Select;
const InputGroup = Input.Group;

// function hasErrors(fieldsError) {
// 	return Object.keys(fieldsError).some(field => fieldsError[field]);
// }
console.log(process.env)
const customPanelStyle = {
	background: '#f7f7f7',
	borderRadius: 4,
	marginBottom: 24,
	border: 0,
	overflow: 'hidden',
  };
class HorizontalLoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productName: '',
			orderType: '',
			minPrice: '',
			maxPrice: '',
			minPv: '',
			maxPv: '',
		};
	}
	componentDidMount() {
		// To disabled submit button at the beginning.
		//this.props.form.validateFields();
	}

	handleSubmit(e) {
		const { minPrice, maxPrice, minPv, maxPv } = this.state;
		//console.log(this.state)
		let params={}
		//查看全部
        if(e==="1"){
			this.setState({
				productName:'',
				minPrice:'',
				maxPrice:'',
				minPv:'',
				maxPv:''
			})
			 params={
				productName:''
			}
		} 
	    else{
			
			params = Object.assign({}, this.state);
			if (minPrice === "") {
				delete params['minPrice'];
			}
			if (maxPrice === "") {
				delete params['maxPrice'];
			}
			if (minPv === "") {
				delete params['minPv'];
			}
			if (maxPv === "") {
				delete params['maxPv'];
			}
		}
		//console.log(params);
		// console.log(this.state)
		this.props.callback(params)
		// this.props.form.validateFields((err, values) => {
		// 	if (!err) {
		// 		console.log('Received values of form: ', values);
		// 	}
		// });
	}
 
	handleProduct(type, e) {
		if(type==="orderType"){
			this.setState({
				orderType: e
			})
			const { minPrice, maxPrice, minPv, maxPv } = this.state;
			let params = Object.assign({}, this.state);
			if (minPrice === "") {
				delete params['minPrice'];
			}
			if (maxPrice === "") {
				delete params['maxPrice'];
			}
			if (minPv === "") {
				delete params['minPv'];
			}
			if (maxPv === "") {
				delete params['maxPv'];
			}
			params.orderType=e
			this.props.callbackProduct(type, params)
		}else{
		  const value = e.target.value
		  this.setState({
			[type]: value
		})
		  this.props.callbackProduct(type, value)
		}
	}
    collapseTab(e){
		this.props.collapseTab(e)
	}
	render() {
		// Only show error after a field is touched.
		// const cb = (msg) => {
		// 	const { productName, orderType, minPrice, maxPrice, minPv, maxPv } = this.state
		// 	// console.log(this.state)
		// 	return () => {
		// 		this.props.callback(msg)
		// 	}
		// }
		return (
			<div className="searchBar">
				<Collapse
					bordered={false}
					defaultActiveKey={['1']}
					onChange={this.collapseTab.bind(this)}
					expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
				>
					<Panel header="查询" key="1" style={customPanelStyle}>
						<Form layout="inline"  >
							<Form.Item >
								<Input value={this.state.productName} onChange={this.handleProduct.bind(this, 'productName')} placeholder="输入产品名" />
							</Form.Item>
							<Form.Item>
								<InputGroup compact>
									<Select defaultValue="1">
										<Option value="1">价格区间</Option>
									</Select>
									<Input type="number" value={this.state.minPrice} onChange={this.handleProduct.bind(this, 'minPrice')} style={{ width: 100, textAlign: 'center' }} placeholder="最小价格" />
									<Input
										style={{
											width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
										}}
										placeholder="~"
										disabled
									/>
									<Input type="number" value={this.state.maxPrice} onChange={this.handleProduct.bind(this, 'maxPrice')} style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大价格" />
								</InputGroup>
							</Form.Item>
							<Form.Item>
								<InputGroup compact>
									<Select defaultValue="1">
										<Option value="1">pv区间</Option>
									</Select>
									<Input type="number" value={this.state.minPv} onChange={this.handleProduct.bind(this, 'minPv')} style={{ width: 100, textAlign: 'center' }} placeholder="最小pv" />
									<Input
										style={{
											width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
										}}
										placeholder="~"
										disabled
									/>
									<Input type="number" value={this.state.maxPv} onChange={this.handleProduct.bind(this, 'maxPv')} style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大pv" />
								</InputGroup>
							</Form.Item>
							<Form.Item
							>
								<Select defaultValue="21" onChange={this.handleProduct.bind(this,'orderType')}>
									<Option value="21">重消单</Option>
									<Option value="22">激活单</Option>
									<Option value="23">升级单</Option>
								</Select>
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									onClick={this.handleSubmit.bind(this,'0')}
								// disabled={hasErrors(getFieldsError())}
								>
									搜索
                        </Button>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									onClick={this.handleSubmit.bind(this,'1')}
								>
				                  显示全部
			                     </Button>
							</Form.Item>
						</Form>
						 
					</Panel>
				</Collapse>
			</div>
		);
	}
}
const HorizontalLoginForm1 = Form.create()(HorizontalLoginForm);
class Lists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: '1'
		}
		this.onChange = this.onChange.bind(this);

	}
	onChange(e) {
		const { index } = this.props;
		this.setState({
			number: e
		})
		var newState = {
			number: e,
			index: index
		};
		this.props.onChange(newState);
	}
	addCart() {
		const { number } = this.state;
		const { list } = this.props;
		console.log(list)
		let queryParam = {
			//"strAction": "trolley_detail_add",
			"ppsId": list['ppsId'],
			"orderType": '21',
			"quantity": Number(number)
		}
		// return false;
		api.apiConfig.trolley(queryParam).then(data => {
			message.success('加入成功')
			let v1 = data.trolley_detail_add_response;
			var arr = Object.getOwnPropertyNames(v1);
			if (arr.length === 0) {
				message.error('加入失败');
				return false;
			}


		}).catch(e => {
			message.error(e);
		})
	}
	componentDidMount() {
		console.log(444)
		// api.categoryList().then(res=>{
		// 	console.log(res)
		// })
	}
	render() {
		const { list } = this.props
		return (
			<Col xs={24} sm={12} md={6} style={{ padding: '10px' }}>
				<Card
					hoverable
					className={styles.card}

					cover={<img alt={list.productName} style={{ height: '210px' }} src={list.imgUrl} />}
				>
					<Meta
						title={list.productName}
					/>
					<div className="price" style={{ color: ' red', padding: ' 5px 0px' }}>价格：¥{list.price}</div>
					<div className="price" style={{ color: ' red', padding: ' 5px 0px' }}>pv {list.pv}</div>
					<ul className="ant-card-actions">
						<li style={{ color: 'red', fontSize: '32', marginLeft: '10px' }}><span>
							<a>
								<InputNumber min={1} max={99} defaultValue={1} onChange={this.onChange} />
							</a></span></li>
						<li style={{ color: 'red', fontSize: '32', marginLeft: '10px' }}> <Button onClick={this.addCart.bind(this)} type="primary">加入购物车</Button></li>
					</ul>

				</Card>
			</Col>
		)
	}
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: true,
			catArr: [],
			hasdata:true,
			productName: '',
			orderType: '21',
			minPrice: '',
			maxPrice: '',
			minPv: '',
			maxPv: '',
			cartNum: '',
			serviceList: [],
			page_size: 10,
			currentPage: 1,
			categoryId: '',
			showLoading:true,
			totalPage:0
		};
		this.handleChildChange = this.handleChildChange.bind(this);
	}
 
	handleChildChange(comment) {
		console.log('comment', comment)
		this.setState(comment)
	}
	componentDidMount() {
		const { productName, page_size, orderType, currentPage, categoryId } = this.state;
		let querydata = {
			productName: productName,
			category: categoryId,
			_currPageNo: currentPage,
			_pageSize: page_size,
			orderType: orderType
		};
		this.getCategory();
		this.getGoodsList(querydata);

	}

	getGoodsList(params) {
		let _this = this;

		_this.setState({
			showLoading: true
		})
		let serviceList = [];
		let querydata = params;
		api.apiConfig.productSale(
			querydata
		).then(res => {
			_this.setState({
				showLoading: false
			})
			 let v1 = res.productsale_list_response;
			var arr = Object.getOwnPropertyNames(v1);
			serviceList = v1.content.map(v => {
				return {
					id: v.id,
					imgUrl: v.imgUrl,
					price: v.price,
					productName: v.productName,
					productNo: v.productNo,
					pv: v.pv,
					ppsId: v.ppsId,
					number: 1
				}
			});
			_this.setState({
				serviceList: serviceList,
				totalPage:v1.total
			})
			if (arr.length === 0) {
				_this.setState({
					hasdata: true
				})
				return false;
			}
			if (v1.content.length === 0) {
				_this.setState({
					hasdata: true
				})
				return false;
			}
			_this.setState({
				hasdata: false
			})
			
			console.log(v1.total)
			
		})
	}
	getCategory() {
		let _this = this;
		
		api.apiConfig.categoryList().then(res => {
			console.log('cat')
			let catArr = res.productsale_category_query_response.map(v => {
				return {
					categoryId: v.categoryId,
					categoryName: v.categoryName,
					active: false
				}
			})
			catArr.unshift({
				categoryId: "",
				categoryName: "全部商品"
			})
			 
			_this.setState({
				catArr: catArr
			})

		})
	}
	onTabClick(e) {
		this.setState({
			serviceList: [],
			currentPage:1
		})
		const { catArr } = this.state
		let id = catArr[e].categoryId;
		this.setState({
			categoryId: id
		})
		const { productName, page_size, orderType, minPrice, maxPrice, minPv, maxPv } = this.state;
		let querydata = {
			productName: productName,
			category: id,
			_currPageNo: 1,
			_pageSize: page_size,
			orderType: orderType,
			minPrice: minPrice,
			maxPrice: maxPrice,
			minPv: minPv,
			maxPv: maxPv
		};
		if (minPrice === "") {
			delete querydata['minPrice'];
		}
		if (maxPrice === "") {
			delete querydata['maxPrice'];
		}
		if (minPv === "") {
			delete querydata['minPv'];
		}
		if (maxPv === "") {
			delete querydata['maxPv'];
		}
		this.getGoodsList(querydata);
	}
	callbackProduct(name, val) {
		if(name==="orderType"){
            this.setState({
				[name]:val.orderType
			})
			this.setState({
				serviceList: [],
				currentPage:1
			})
			const {page_size, currentPage, categoryId } = this.state;
			let querydata = {
				...val,
				category: categoryId,
				_currPageNo: 1,
				_pageSize: page_size
			};
			this.getGoodsList(querydata)
		}else{
			this.setState({
				[name]:val
			})
		}
	}
	//搜索
	callback(msg) {
		//const {productName,orderType}=msg;
		const {page_size, categoryId } = this.state;
		this.setState({
			currentPage:1
		})
		let querydata = {};
		querydata = { ...msg }
		querydata.currentPage = 1;
		querydata.page_size = page_size;
		querydata.category = categoryId;
		console.log(querydata)
		this.getGoodsList(querydata);
		// this.setState({
		// 	productName:productName,
		// 	orderType:orderType},()=>{
		// 		this.getGoodsList("");
		// 	}
		// )

	}
	onShowSizeChange(current, pageSize) {
		this.setState({
			page_size:pageSize
		})
		const {categoryId, productName, currentPage,orderType, minPrice, maxPrice, minPv, maxPv } = this.state;
        let querydata = {
			productName: productName,
			category: categoryId,
			_currPageNo: currentPage,
			_pageSize: pageSize,
			orderType: orderType,
			minPrice: minPrice,
			maxPrice: maxPrice,
			minPv: minPv,
			maxPv: maxPv
		};
		if (minPrice === "") {
			delete querydata['minPrice'];
		}
		if (maxPrice === "") {
			delete querydata['maxPrice'];
		}
		if (minPv === "") {
			delete querydata['minPv'];
		}
		if (maxPv === "") {
			delete querydata['maxPv'];
		}
		this.getGoodsList(querydata);
	}
	pageChange(page, pageSize){
        this.setState({
			currentPage:page,
			page_size:pageSize
		})
		const {categoryId, productName,  page_size, orderType, minPrice, maxPrice, minPv, maxPv } = this.state;
        let querydata = {
			productName: productName,
			category: categoryId,
			_currPageNo: page,
			_pageSize: page_size,
			orderType: orderType,
			minPrice: minPrice,
			maxPrice: maxPrice,
			minPv: minPv,
			maxPv: maxPv
		};
		if (minPrice === "") {
			delete querydata['minPrice'];
		}
		if (maxPrice === "") {
			delete querydata['maxPrice'];
		}
		if (minPv === "") {
			delete querydata['minPv'];
		}
		if (maxPv === "") {
			delete querydata['maxPv'];
		}
		this.getGoodsList(querydata);
	}
	onClick(e) {
		this.setState({
			a: 22
		})
	}
	collapseTab(e){
		console.log(...e)
		if(e.length > 0){
          this.setState({
			  mode:true
		  })
		}else{
			this.setState({
				mode:false
			})
		}
	}
	render() {
		const { mode, catArr, serviceList } = this.state;
		return (
			<div className="product-sale">
				<HorizontalLoginForm1 data={this.state} collapseTab={this.collapseTab.bind(this)} callbackProduct={this.callbackProduct.bind(this)} callback={this.callback.bind(this)} />
				<div className="listcontent" className={["listcontent", !mode?"active":null].join(' ')} >
					<Tabs
						defaultActiveKey="1"
						tabPosition="top"
						onTabClick={this.onTabClick.bind(this)}
					>
						{catArr.map((list, i) => <TabPane tab={list.categoryName} key={i}>
						</TabPane>
						)}
					</Tabs>
					<div style={{margin:' 0 auto',width:'100%',textAlign:'center'}} >
						
						<Spin spinning={this.state.showLoading} tip="Loading...">
						 {
							 serviceList.length>0?
						<div className="productList">
							 {serviceList.map((list, k) => <Lists onChange={this.handleChildChange.bind(this)} key={k} index={k} list={list} />)}
						 </div>:null
						 }
							
						</Spin>
						<div className="clear"></div>
					</div>
				</div>
					{
					  this.state.hasdata?<div style={{textAlign:'center'}}><img src={require('src/assets/images/nodata.png')} /><p style={{marginTop:'20px'}}>暂无数据</p></div>:null
					}

				<div className="pagination">
				    <Pagination hideOnSinglePage={true} current={this.state.currentPage} showSizeChanger onChange={this.pageChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)} defaultCurrent={1} total={this.state.totalPage} />
				</div>
			</div>

		)
	}

}

export default App
//export default HorizontalLoginForm1;