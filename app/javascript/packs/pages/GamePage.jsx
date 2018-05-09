import React from 'react';
import request from 'axios';
import { Layout } from 'antd';
import { GamesList } from '../components';

import { ActionCableProvider } from 'react-actioncable-provider'
const cable = ActionCable.createConsumer(`ws://${window.location.hostname}/cable`)

const { Header, Content } = Layout;

export class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
    }
  }

  componentWillMount() {
    request.get('/game/current').then(resp => {
      this.setState({ game: resp.data });
      this.setupActionCable();
    })
  }

  setupActionCable = () => {
    this.subscription = cable.subscriptions.create(
      'ScoresUpdateChannel',
      {
        received(data) {
          console.log(data)
        }
      }
    )
  }

  render() {
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
