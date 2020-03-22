import React, {Component} from 'react'
import Table from './Table'

class Compare extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // IDs of the agents to compare
      idA:this.props.agents[0].id,
      idB:this.props.agents[0].id
    }
  }

  // Returns array of scores for each task category
  static getScoresByCategory(tasks) {
    let scoresByCategory = {}
    for (const task of tasks) {
      if (task.category in scoresByCategory) {
        scoresByCategory[task.category].push(task.score)
      }
      else {
        scoresByCategory[task.category] = [task.score]
      }
    }

    return scoresByCategory
  }

  // Given an array it calculates the rounded average of its values
  static getAverage(array) {
    if (!array) {
      return 0
    }
    else {
      return Math.round(
        array.reduce((a, b) => a + b, 0)
        /array.length
      )
    }
  }

  // Returns average score by category for each agent 
  // in table friendly format
  static getAverageByCategory(nameA, nameB, tasksA, tasksB) {
    // Extract scores by category of agents
    let scoresByCategoryA = Compare.getScoresByCategory(tasksA)
    let scoresByCategoryB = Compare.getScoresByCategory(tasksB)

    // Calculate score average by agent for each category
    let avgByCategory = []
    for (const category in scoresByCategoryA) {
      let row = {category: category}
      row[nameA] = Compare.getAverage(scoresByCategoryA[category])
      row[nameB] = Compare.getAverage(scoresByCategoryB[category])

      avgByCategory.push(row)
    }

    return avgByCategory
  }

  // Update id values on selection change
  updateId(value, first) {
    if (first) {
      this.setState(state => {return {idA:parseInt(value), idB:state.idB}})
    }
    else {
      this.setState(state => {return {idA:state.idA, idB:parseInt(value)}})
    }
  }

  render() {
    // Find agents by ID
    const agentA = this.props.agents.filter(agent => agent.id === this.state.idA)[0]
    const agentB = this.props.agents.filter(agent => agent.id === this.state.idB)[0]

    // Construct table entries
    const tableEntries = Compare.getAverageByCategory(agentA.name, agentB.name, agentA.tasks, agentB.tasks)

    return (
      <div className="container-fluid">
        {/* Generate card to select first agent */}
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">First AI</h5>
                <select className="custom-select" onChange={(e) => this.updateId(e.target.value, true)}>
                  {this.props.agents.map(agent => <option value={agent.id}>{agent.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          {/* Generate card to select second agent */}
          <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Second AI</h5>
                  <select className="custom-select" onChange={(e) => this.updateId(e.target.value, false)}>
                    {this.props.agents.map(agent => <option value={agent.id}>{agent.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
        </div>
      {/* Generate comparison table card */}
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Average Score by Category Comparison</h5>
              <Table columns={['category', agentA.name, agentB.name]} tableEntries={tableEntries} />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Compare