import React from "react";

export default class Button extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()} className="add-to-friends">
        {this.props.label}
      </button>
    );
  }
}
