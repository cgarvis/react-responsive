import React from 'react';

class Responsive extends React.Component {
  constructor() {
    this.state = {
      viewportWidth: window.innerWidth,
    };

    this.handleResize = this.handleResize.bind(this)
  }

  // Set viewport type based on props for large, medium, small
  getChildContext() {
    let viewportType;
    let viewportWidth = this.state.viewportWidth

    if (viewportWidth >= this.props.huge) {
      viewportType = 'huge';
    } else if (viewportWidth >= this.props.large) {
      viewportType = 'large';
    } else if (viewportWidth >= this.props.medium) {
      viewportType = 'medium';
    } else if (viewportWidth >= this.props.small) {
      viewportType = 'small';
    }

    return { viewportType: viewportType };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener(this.handleResize);
  }

  handleResize() {
    this.setState({viewportWidth: window.innerWidth});
  }

  render() {
    return this.props.createChildren();
  }
}

// Integer based break points for view port types.  Similar to media queries
Responsive.propTypes = {
  huge: React.PropTypes.number, // Desktops
  large: React.PropTypes.number, // Laptops
  medium: React.PropTypes.number, // Tablets
  small: React.PropTypes.number, // Phones
}

// Defaults based on media queries in bootstrap
Responsive.defaultProps = {
  huge: 1200,
  large: 992,
  medium: 768,
  small: 0
}


Responsive.childContextTypes = {
  viewportType: React.PropTypes.string,
}

class Layout extends React.Component {
  get style() {
    let direction = ['huge', 'large'].indexOf(this.context.viewportType) !== -1 ? 'row' : 'column';

    return {
      display: 'flex',
      flexDirection: direction,
    }
  }

  render() {
    return (
      <div style={this.style}>
        {this.props.children}
      </div>
    )
  }
}

Layout.contextTypes = {
  viewportType: React.PropTypes.string.isRequired,
}

class Navigation extends React.Component {
  get style() {
    let width = this.context.viewportType === 'large' ? '34%' : '100%';

    return {
      background: 'blue',
      width: width,
    }
  }

  render() {
    return (
      <nav style={this.style}>
        <h1>Navigation</h1>
      </nav>
    )
  }
}

class Main extends React.Component {
  get style() {
    let width = this.context.viewportType === 'large' ? '66%' : '100%';

    return {
      background: 'red',
      width: width,
    }
  }

  render() {
    return (
      <main style={this.style}>
        <h1>Main</h1>
      </main>
    )
  }
}

class App extends React.Component {
  render() {
    // Children need to be created from inside Responsive due to context issues
    // between parent and owner.  This should be fixed soon in React.  Once
    // done we can do this like we would expect

    let children = () => {
      return (
        <Layout>
          <Navigation />
          <Main />
        </Layout>
      )
    }

    return (
      <Responsive createChildren={children} />
    )
  }
}

React.render(<App />, document.body);
