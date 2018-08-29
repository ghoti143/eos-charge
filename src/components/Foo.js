import React from 'react'
import agent from '../agent'

class Foo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      agent.Aggregations.get()
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <table>
            <thead>
              <tr>
                <td>account</td>
                <td>name</td>
                <td>avg_cpu_us</td>
                <td>avg_net_words</td>
                <td>count</td>
              </tr>
            </thead>
            <tbody>
            {items.map(item => (
              <tr>
                <td>{item._id.acct}</td>
                <td>{item._id.name}</td>
                <td>{item.avg_cpu_us}</td>
                <td>{item.avg_net_words}</td>
                <td>{item.count}</td>
              </tr>
            ))}
            </tbody>
          </table>
        );
      }
    }
  }

  export default Foo