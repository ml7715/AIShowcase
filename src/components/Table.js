import React, {Component} from 'react';

class Table extends Component {
  // Helper function to generate individual row
  generateRow(rowData) {
    let row = []

    // Add link to detail if switchToDetail is defined
    for (const column of this.props.columns) {
      if (column === 'name' && this.props.switchToDetail) {
        row.push(<td><button type="button" className="btn btn-link" onClick={() => this.props.switchToDetail(rowData.id)}>{rowData.name}</button></td>)
      }
      else {
        row.push(<td>{rowData[column]}</td>)
      }
    }

    return <tr>{row}</tr>
  }

  render() {
    // Generate rows of table
    let rows = this.props.tableEntries.map(rowData => this.generateRow(rowData))
    
    // Render table
    return (
      <table className="table">
        <thead>
          <tr>
            {this.props.columns.map(column => <th>{column.charAt(0).toUpperCase() + column.slice(1)}</th>)}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Table;