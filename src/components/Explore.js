import React, {Component} from 'react'
import Table from './Table'

class Explore extends Component {
  render() {
    // Render explore card
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">AI List</h5>
                <Table columns={['name', 'description']} tableEntries={this.props.agents} switchToDetail={(id) => this.props.switchToDetail(id)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Explore;