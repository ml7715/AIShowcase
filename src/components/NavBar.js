import React, {Component} from 'react';

class NavBar extends Component {
  handleTabClick(e, id) {
    // Prevent default behaviour
    e.preventDefault()

    // Switch to explore or compare tab based on input
    if (id === "explore") {
        this.props.switchToExplore()
    }
    else if (id === "compare") {
        this.props.switchToCompare()
    }
  }

  render() {
    // Render empty navbar during error and loading screen
    if (this.props.activeTab==="error" || this.props.activeTab==="loading") {
      return (
        <nav className="navbar header-top fixed-top navbar-expand-xl navbar-dark bg-dark">
          <a className="navbar-brand" href=".">AI-Showcase</a>
        </nav>
      )
    }
    
    // Render navbar with links otherwise
    return (
      <nav className="navbar header-top fixed-top navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#" onClick={(e) => this.handleTabClick(e, "explore")}>AI-Showcase</a>
        <ul className="navbar-nav">
          <li className={this.props.activeTab==="explore" ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="#" onClick={(e) => this.handleTabClick(e, "explore")}>Explore</a>
          </li>
          <li className={this.props.activeTab==="compare" ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="#" onClick={(e) => this.handleTabClick(e, "compare")}>Compare</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar