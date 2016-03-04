import React from 'react';

export default class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({count: this.state.count + 1});
    }, 1000);
  }

  render() {
    return (
      <h2>The count is counting: {this.state.count}</h2>
    )
  }

}
