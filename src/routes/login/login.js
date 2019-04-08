import React from 'react';
import { Tabs, Input, Button, Form, Icon, message } from 'antd';
import classNames from 'classnames';
import { query } from '../../services/service';
import statuCode from '../../utils/response';
import PropTypes from 'prop-types';
import s from './login.scss';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

	constructor(props){
		super(props);
		this.state = {
		}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['id','password'],(err, values) => {
      if (!err) {
        const { id, password } = values;
        query({
          url: 'http://localhost:3000/login',
          body: {
            id: id,
            password,
          },
        }).then(this.loginChat, this.onReject)
      }
    });
  }

  loginChat = data => {
    console.log(data.code, statuCode.successCode);
    const { history } = this.context.router;
    if (data.code === statuCode.successCode) {
      console.log(history)
      const state = {
        loginStatu: true,
        key: history.location.key,
      };
      history.push({pathname: '/chat', state});
    }
    else  message.error(data.msg);
  }

  onResolve = data => {
    console.log(data.code, statuCode.successCode);
    if (data.code === statuCode.successCode) 
      message.success(data.msg);
    else  message.error(data.msg);
  }

  onReject = err => {
    console.log(err);
  }

	getRegister = (e) => {
		e.preventDefault();
    this.props.form.validateFields(['regID','regName','regPassword'],(err, values) => {
      if (!err) {
        const { regID, regName, regPassword } = values;
        query({
          url: 'http://localhost:3000/register',
          body: {
            regID,
            regName,
            regPassword,
          },
        }).then(this.onResolve, this.onReject)
      }
    });
	};

	handlerChange = key => {
		return e => {
			this.setState({ [key]: e.target.value });
		}
	};

	login = () => {
    const { getFieldDecorator } = this.props.form;
		return (
			<Form  onSubmit={this.handleSubmit} className={s.login}>
				<FormItem>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: 'Please input your id!' }],
          })(
            <Input 
              className={s.loginNum}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} 
            />} placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              {max: 8, message: '不能超过8位'},
              {min: 6, message: '不能少于6位'},
            ],
          })(
            <Input 
              className={s.loginNum}  
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} 
            />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
				<FormItem>
					<Button htmlType="submit" className={s.loginNum} type="primary">登录</Button>
				</FormItem>
			</Form>
		);
	};

	register = () => {
    const { getFieldDecorator } = this.props.form;
		return (
      <Form onSubmit={this.getRegister} className={s.login}>
				<FormItem>
          {getFieldDecorator('regID', {
            rules: [{ required: true, message: 'Please input your userID!' },
            { max: 12, message: '不能超过12位' }],
          })(
            <Input 
              className={s.loginNum}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} 
            />} placeholder="请输入用户名" />
          )} 
        </FormItem>
        <FormItem>
          {getFieldDecorator('regName', {
            rules: [{ required: true, message: 'Please input your userName!' }, 
              { max: 12, message: '不能超过12位' }],
          })(
            <Input 
              className={s.loginNum}  
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} 
            />} placeholder="请输入昵称" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('regPassword', {
            rules: [
              {required: true, message: 'Please input your Password!'},
              {max: 8, message: '不能超过8位'},
              {min: 6, message: '不能少于6位'},
            ],
          })(
            <Input 
              className={s.loginNum}  
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} 
            />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem>
					<Button htmlType="submit" className={s.loginNum} type="primary">注册</Button>
				</FormItem>
			</Form>
			// <div className={s.register}>
			// 	<div className={s.registerNum}>账号 ：
			// 		<Input 
			// 			maxLength={15}
			// 			placeholder="请输入初始账号"
			// 			value={regID} 
			// 			style={{ width: '200px' }} 
			// 			onChange={this.handlerChange('regID')} 
			// 		/>
			// 	</div>
			// 	<div className={s.registerNum}>昵称 ：
			// 		<Input 
			// 			maxLength={8} 
			// 			placeholder="请输入初始昵称"
			// 			value={regName}
			// 			style={{ width: '200px' }} 
			// 			onChange={this.handlerChange('regName')} 
			// 		/>
			// 	</div>
			// 	<div className={s.registerNum}>密码 ：
			// 		<Input 
			// 			maxLength={15} 
			// 			placeholder="请输入注册密码"
			// 			value={regPassword}
			// 			style={{ width: '200px' }}  
			// 			onChange={this.handlerChange('regPassword')} 
			// 		/>
			// 	</div>
			// 	<Button type="primary" onClick={this.getRegister}>注册</Button>
      // </div>
      
		);
	};

	render() {
		return (
			<div className={s.container}>
				<Tabs animated className={classNames(s.box, s['animated'])} onChange={this.tabChange} type="card">
					<TabPane tab="登录" key="1">{this.login()}</TabPane>
    			<TabPane tab="注册" key="2">{this.register()}</TabPane>
				</Tabs>
			</div>
		)
	}
}

const loginPage = Form.create()(Login);

export default loginPage;