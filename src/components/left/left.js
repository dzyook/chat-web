import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import s from './left.scss';
const Search = Input.Search;

class Left extends React.Component {
	static propTypes = {
    socket: PropTypes.object,
    dispatch: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
	}
	
  constructor(props) {
    super(props);
    this.state = {
    };
  };

	componentWillMount() {
		
	}

  componentDidMount() {
  }


	render() {
		return (
			<div className={s.box}>
				<div className={s.header}>
					<div className={s.avatar}>
						<img src='https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxgeticon?seq=1722791886&username=@e27c41d47b587b3d23e841ff1b35d895c9d221802d6d8abd5088b339a23d416a&skey=@crypt_abda819e_fa5b9f8a40cebf4f06064d3c129edc29' />
					</div>
					<div className={s.username}>笑我</div>
				</div>
				<div className={s.search}>
					<Search placeholder="搜索"  />
				</div>
				<div className={s.list}>
					
				</div>
			</div>
		);
	}
}

export default Left;