import React from 'react';
import request from 'axios';
import { Layout } from 'antd';
import { GamesList } from '../components';

const { Header, Content } = Layout;

export class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    }
  }

  componentWillMount() {
    request.get('/games').then(resp => {
      const games = resp.data;
      this.setState({ games });
    });
  }

  gamesList() {
    if (!this.state.games.length) return null;

    return <GamesList games={this.state.games} />;
  }

  render() {
    return (
      <Layout>
        <Header>
          Header
        </Header>
        <Content>
          {this.gamesList()}
        </Content>
      </Layout>
    );
  }
}