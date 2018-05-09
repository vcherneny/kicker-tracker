import React from 'react';
import request from 'axios';
import { Layout, Table } from 'antd';
import { Link } from 'react-router-dom';
import { GamesList } from '../components';

const { Header, Content } = Layout;

const columns = [
  {
    title: 'Id',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Date',
    key: 'created_at',
    dataIndex: 'created_at',
  },
  {
    title: 'Team 1 score',
    key: 'left_team_score',
    dataIndex: 'left_team_score',
  },
  {
    title: 'Team 2 score',
    key: 'right_team_score',
    dataIndex: 'right_team_score',
  },
]

export class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    }
  }

  componentWillMount() {
    request.get('/games').then(resp => {
      console.log('resp.data', resp.data)
      this.setState({ games: resp.data.map(g => ({ ...g, key: g.id })) });
    });
  }

  table() {
    return (
      <Table 
        dataSource={this.state.games}
        columns={columns}
      />
    );
  }

  render() {
    return (
      <Layout>
        <Header style={{
            fontSize: '32px',
            'textAlign': 'center',
            color: '#fff'
          }}
        >
          Recent Games
        </Header>
        <Content>
          {this.table()}
        </Content>
        <Link to="/">Go back</Link>
      </Layout>
    );
  }
}
