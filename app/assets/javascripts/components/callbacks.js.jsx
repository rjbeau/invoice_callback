// ugly parsing to get reference from url
function reference() {
  array = location.href.split('reference=');
  if(array.length >= 2) {
    return array[1];
  }
  else return '';
}

var Callback = React.createClass({
  render: function() {
    // console.log(this.props.children);
    var linkItem = "/callbacks/" + this.props.id + "?reference=" + this.props.children[0];
    return (
      <tr>
        <td><a href={linkItem}>view</a></td>
        <td>{JSON.stringify(this.props.children[1], null, 2)}</td>
        <td>{this.props.children[2]}</td>
      </tr>
    );
  }
});

var CallbackList = React.createClass({
  render: function() {
    var callbackNodes = this.props.data.map(function(callback, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Callback id={callback.id} key={index}>
          {callback.ref}
          {callback.contents}
          {callback.time_ago}
        </Callback>
      );
    });
    return (
      <table className="callbackList">
        <theader>
          <tr>
            <th width='10%'></th>
            <th className='center' width='80%'>Params</th>
            <th className='center' width='10%'>Time Ago</th>
          </tr>
        </theader>
        <tbody>
          {callbackNodes}
        </tbody>
      </table>
    );
  }
});

var CallbackBox = React.createClass({
  loadCallbacksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCallbacksFromServer();
    setInterval(this.loadCallbacksFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <CallbackList data={this.state.data} />
    );
  }
});

React.render(
  <CallbackBox url={"/callbacks.json?reference=" + reference()} pollInterval="5000" />,
  document.getElementById('recent_callbacks')
);
