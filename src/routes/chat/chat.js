import React from 'react';
import { connect } from 'dva';
import Example from '../../components/Example';
import Left from '../../components/left/left';
import ChatSocket from '../../components/chat-socket';
import s from './chat.scss';

class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.socket = require('socket.io-client')('http://localhost:3000');
	}

  render() {
    return (
			<div className={s.container}>
				<div className={s.chat}>
					<Left socket={this.socket} />
					<Example socket={this.socket} />
					<ChatSocket socket={this.socket} />
      	</div>
			</div>
    );
  }
}

export default connect()(Chat);
