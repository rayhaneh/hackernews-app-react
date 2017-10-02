import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    const topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/'

    fetch(topStories)
      .then(data => data.json())
      .then(ids => ids.map(id => (fetch(`${storyUrlBase}${id}.json`).then(d => d.json()))))
      .then(promises => Promise.all(promises))
      .then(stories => this.setState({stories}))
  }

  render() {
    const { stories } = this.state
    let views = <div>Loading ...</div>
    if (stories && stories.length > 0) {
      views = stories.map(s => (
        <p key={s.id}>
          <a href={s.url}>{s.title}</a> from <strong>{s.by}</strong>
        </p>
      ))
    }
    return (
      <div className="App">
        <h2>Hacker News Top Stories</h2>
        {views}
      </div>
    );
  }
}

export default App;
