import React from 'react';
import request from 'axios';
import { Layout } from 'antd';
import { GamesList } from '../components';

import { ActionCableProvider } from 'react-actioncable-provider'
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

const { Header, Content } = Layout;

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    }
  }

  componentDidMount() {


    const socket = new WebSocket('ws://localhost:3000/cable');

    socket.onmessage = function(params) {
      console.log(params)
    }
  }

  componentWillMount() {
    
  }

  gamesList() {
  }

  render() {
    console.log('created')
    this.subscription = cable.subscriptions.create(
      'ScoresUpdateChannel',
      {
        received(data) {
          console.log(data)
        }
      }
    )
    return (
      <Layout>
        <Header>
          Header
        </Header>
        <Content>
          <div>left: </div>
          <div>right: </div>
        </Content>
      </Layout>
    );
  }
}
