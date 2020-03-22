import React, {Component} from 'react';
import Table from './Table'

class Detail extends Component {
  // Calculate average by category
  // Return values in table friendly format
  static getAvgByCategory(tasks) {
    let scoresByCategory = {}
    for (const task of tasks) {
      if (task.category in scoresByCategory) {
        scoresByCategory[task.category].push(task.score)
      }
      else {
        scoresByCategory[task.category] = [task.score]
      }
    }

    let avgByCategory = []
    for (const category in scoresByCategory) {
      avgByCategory.push({
        category: category,
        averageScore: Math.round(scoresByCategory[category].reduce((a, b) => a + b, 0)/scoresByCategory[category].length)
      })
    }

    return avgByCategory
  }

  render() {
    const avgByCategory = Detail.getAvgByCategory(this.props.agent.tasks)

    return (
      <div className="container-fluid">
        {/* Generate Name/Descrition card */}
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{this.props.agent.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.agent.description}</h6>
              </div>
            </div>
          </div>
        </div>
        {/* Generate Average Scores by Category table card */}
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Average Scores by Category</h5>
                <Table columns={['category', 'averageScore']} tableEntries={avgByCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail;