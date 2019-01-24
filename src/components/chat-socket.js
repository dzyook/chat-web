import React from 'react';
import PropTypes from 'prop-types';

class ChatSocket extends React.Component{
	static propTypes = {
    socket: PropTypes.object,
  }

  constructor(props){
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
		const { socket } = this.props;
    socket.on('login', (data) => {
      console.log(data)
    });
    socket.on('new message', (data) => {
        console.log(data)
    });
  }

  render() {
    return null;
  }
};

export default ChatSocket;
