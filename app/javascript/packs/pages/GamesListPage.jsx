import React from 'react';
import request from 'axios';
import { Layout, Button } from 'antd';
import { GamesList } from '../components';

const { Header, Content } = Layout;

export class GamesListPage extends React.Component  {
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

    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
    console.log(cable, 'cable')

    this.subscription = cable.subscriptions.create(
      'ScoresUpdateChannel',
      {
        received(data) {
          console.log(data)
        }
      }
    )
  }

  gamesList() {
    if (!this.state.games.length) return null;
    
    return <GamesList games={this.state.games}/>;
  }

  createGame = () => {
    request.post('/games').then(resp => {
      const game = resp.data; console.log('this.props.history', this.props.history)
      this.props.history.push(`/games/${game.id}`)
    });
  }

  render() {
    return (
      <Layout>
        <Header>
          Header
        </Header>
        <Content>
          <Button type="primary" onClick={this.createGame}>New game</Button>
          {this.gamesList()}
        </Content>
      </Layout>
    );
  }
}