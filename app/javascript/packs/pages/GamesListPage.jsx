import React from 'react';
import request from 'axios';
import { Layout, Button, Row, Col } from 'antd';
import { GamesList } from '../components';

const { Header, Content} = Layout;

const contentStyle = {
  display: 'flex',
  flexFlow: 'column',
}

const styles = {
  scoreRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  scoreCol: {
    textAlign: 'center',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
  }
}

export class GamesListPage extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      gameIsStarted: false,
    }
  }

  componentWillMount() {
  }

  gamesList() {
    if (!this.state.games.length) return null;
    
    return <GamesList games={this.state.games}/>;
  }

  createGame = () => {
    request.post('/games').then(resp => {
      this.setState({ gameIsStarted: true })
      const game = resp.data; console.log('this.props.history', this.props.history)
    });
  }

  button() {
    if(!this.state.gameIsStarted) {
      return (
        <div className='button-row' style={styles.buttonRow}>
          <Button type="primary" onClick={this.createGame}>New game</Button>
        </div>
      )
    } else {
      return (
        <div className='button-row' style={styles.buttonRow}>
          <Button type="primary" onClick={this.endGame}>End game</Button>
        </div>
      )
    }
  }

  render() {
    
    return (
      <Layout>
        <Header style={{
          fontSize: '32px',
          'textAlign': 'center',
          color: '#fff'
        }}>
          Kicker Tracker
        </Header>
        <Content>
          {this.button()}
          <div className="score-row" style={styles.scoreRow}>
            <div className="score-col" style={styles.scoreCol}>
              <div className="team-name">
                Team 1
              </div>
              <div className="team-score">
                0
              </div>
            </div>
            <div className="score-col" style={styles.scoreCol}>
              <div className="team-name">
                Team 2
              </div>
              <div className="team-score">
                0
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}