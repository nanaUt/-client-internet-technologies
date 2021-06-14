import React from "react";

export default class RemoveButton extends React.Component {
  render() {
    return (
      <button
        onClick={() => this.props.onClick()}
        className="remove-from-friends"
      >
        {this.props.label}
      </button>
    );
  }
}
