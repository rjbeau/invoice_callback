var Callback = React.createClass({
  render: function() {
    console.log(this.props.children);
    var rating;
    // if(this.props.children[2] == null) {
    //   rating = '0';
    // } else {
    //   rating = this.props.children[2];
    // }
    // var mobileurl = "";
    // if(location.href.indexOf("/mobile/") > 0) {
    //   mobileurl = "/mobile";
    // };

    // var imagefile = "/assets/rating-" + rating + ".png";
    // var linkWinery = location.origin + mobileurl + "/wineries/" + this.props.children[4];
    // var linkUser = location.origin + "/mobile/reviews/" + this.props.children[5] + "/reviews";
    return (
      <li className="callbackItem row">
        <div className='callbackHeader'>
          <div className="columns large-8 small-8">
            {this.props.id}
          </div>
          <div className="columns large-4 small-4">
            {this.props.children[0]}
          </div>
          <div className="columns large-8 small-8">
            <span className="user-name">{this.props.username}</span>
          </div>
          <div className="columns large-4 small-4">
            <span className="callback-date">{this.props.children[3]}</span>
          </div>          
        </div>
        <div className="callbackBody">
          {this.props.children[1]}
        </div>
      </li>
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
      <div className="callbackBox">
        <CallbackList data={this.state.data} />
      </div>
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
          {callback.created_at}
          {callback.updated_at}
        </Callback>
      );
    });
    return (
      <ul className="callbackList">
        {callbackNodes}
      </ul>
    );
  }
});

React.render(
  <CallbackBox url="/callbacks.json?reference=bogus" pollInterval={5000} />,
  document.getElementById('recent_callbacks')
);
