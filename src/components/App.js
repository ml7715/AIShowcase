import React, {Component} from 'react';
import {AgentsApi} from '../api/AgentsApi'

import Explore from './Explore'
import Detail from './Detail'
import Error from './Error'
import Loading from './Loading'
import Compare from './Compare'
import NavBar from './NavBar'

import './App.css';

class App extends Component {
  // Possible view types
  view_type = {
    DETAIL: 'detail',   // Detail of a specific agent
    EXPLORE: 'explore', // Explore agents
    COMPARE: 'compare', // Compare two agents
    ERROR: 'error',     // Error while fetching data
    LOADING: 'loading'  // Loading data
  }

  // Number of default retries during api call
  retries = 5

  constructor(props) {
    super(props)

    this.state = {
      // View currently active
      view: this.view_type.LOADING,
      // ID of agent to show for detail view
      detailId: undefined,
      // Agents extracted from api
      agents: undefined,
    }
  }

  static async fetchNRetries(apiCall, n) {
    // Retry apiCall n times before failing
    let error
    for (let i=0; i<n; i++) {
      try {
        return await apiCall()
      } catch(err) {
        error = err
      }
    }
    throw error
  }

  componentDidMount() {
    // Fetch data from API and update view type
    App.fetchNRetries(
      new AgentsApi().listAgents, 
      this.retries
    )
    .then(data => this.setState({
      agents:data, 
      view: this.view_type.EXPLORE
    }))
    .catch(_ => this.setState({
      view: this.view_type.ERROR
    }))
  }

  render() {
    let view

    //  Render correct view based on type
    switch(this.state.view) {
      case this.view_type.ERROR:
        view = <Error />
        break
      case this.view_type.EXPLORE:
        view = (
          <Explore 
            agents={this.state.agents} 
            switchToDetail={(id) => this.setState({view: this.view_type.DETAIL, detailId: id})}
          />
        )
        break
      case this.view_type.DETAIL:
        const agent = this.state.agents.filter(agent => agent.id === this.state.detailId)[0]
        view = <Detail agent={agent}/>
        break
      case this.view_type.COMPARE:
        view = <Compare agents={this.state.agents}/>
        break
      default:
        view = <Loading />
    }

    return (
      <div id="wrapper">
        <NavBar
          activeTab={this.state.view} 
          switchToExplore={() => this.setState({view: this.view_type.EXPLORE})}
          switchToCompare={() => this.setState({view: this.view_type.COMPARE})}
        />
        {view}
      </div>
    )
  }
}

export default App
