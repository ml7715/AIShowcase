import React, {Component} from 'react'

class Loading extends Component {
  render() {
    // Render loading spinner
    return (
      <div className="container pt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading