import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

class Example extends React.Component{
  static propTypes = {
    socket: PropTypes.object,
    dispatch: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context){
    super(props, context);
    this.state = {
			value: '',
			num: 0,
    };
	}
  
  UNSAFE_componentWillMount() {
    const { history } = this.context.router;
    history.replace("/login");
  }

	componentDidMount() {
    const { socket, dispatch } = this.props;
    this._isMounted = false
    if(this._isMounted) {
      socket.on('disUser', (num) => {
        this.showNum(num);
      });
      dispatch({
        type: 'example/fetch',
        payload: {
          url: 'http://localhost:3000',
          body: { a: 1 },
        },
     })
    }
  };
  
  componentWillUnmount() {
    this._isMounted = true;
    // this.setState = (state,callback)=>{ return; };
  }

	showNum = num => {
		this.setState({ num });
	}

  handleChange = e => {
    console.log(e.target.value)
    this.setState({ value: e.target.value });
  }

  click = ev => {
    const { value } = this.state;
    const { socket } = this.props;
    socket.emit('new message', value)
  }

  render() {
		const { num } = this.state;
    return (
      <div id="chat">
        <ul id="chatList">
				当前人数: {num}
        </ul>
        <form>
            <input type="text" onChange={this.handleChange} />
            <input type="button" value="发送" onClick={this.click} />
        </form>
    </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(Example);
