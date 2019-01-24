import React from 'react';
import { connect } from 'dva';
import Example from '../../components/Example';
import Left from '../../components/left/left';
import ChatSocket from '../../components/chat-socket';
import s from './chat.scss';

const socket = require('socket.io-client')('http://localhost:3000');

class Chat extends React.Component {

  render() {
    return (
			<div className={s.container}>
				<div className={s.chat}>
					<Left socket={socket} />
					<Example socket={socket} />
					<ChatSocket socket={socket} />
      	</div>
			</div>
    );
  }
}

export default connect()(Chat);
