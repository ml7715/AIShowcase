import React, {Component} from 'react'

class Error extends Component {
  render() {
    // Render error card
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Error</h5>
                <h6 className="card-subtitle mb-2 text-muted">An error has occurred while fetching the data, please <a href=".">refresh</a>.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Error