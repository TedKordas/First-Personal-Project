import React, { Component } from 'react';
import './reset.css';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      newsToDisplay: [],
      filteredNews: [],
      addedArticle: [],
      title: "",
      author: "",
      description: "",
      article: ""
    };
    this.findNews = this.findNews.bind(this);
    this.getNews = this.getNews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addArticle = this.addArticle.bind(this);
  }

  findNews() {
    axios.get('https://newsapi.org/v2/everything?domains=dailywire.com&apiKey=f63fc3be810646ca85864d60a98cead1')
    .then( response =>{
      this.setState({newsToDisplay: response.data.articles});
      console.log(response);
    });
  }

  getNews() {
    axios.get('https://newsapi.org/v2/everything?domains=dailywire.com&apiKey=f63fc3be810646ca85864d60a98cead1')
    .then(response => {
      this.setState({
        newsToDisplay: response.data.results
      })
    })
  }


  handleChange(event) {
    var inputValue = event.target.value
    var filterArray = this.state.newsToDisplay.filter((e, i) => {
      if(e.title)  {
        var result = e.title.includes(inputValue)
        return result;
      }

    })
    this.setState({
      filteredNews: filterArray
    })
  }

  addArticle() {
    axios.post('/api/addArticle', );
    let newArticle = {
      title: this.refs.title.value,
      author: this.refs.author.value,
      description: this.refs.description.value,
      article: this.refs.article.value
    }
    this.setState({
      addedArticle: newArticle
    })
  }

  change(val) {
    this.setState({title: val})
  }

  change2(val) {
    this.setState({author: val})
  }

  change3(val) {
    this.setState({description: val})
  }

  updateArticle(newArticle) {
    axios.put('/api/updateArticle')
    let newState= this.state.data;
    if(newState.indexOf(newArticle) > +1) {
      newState.push(newState.indexOf(newArticle), 1);
      this.setState({data: newState})
    }
  }


  deleteArticle(newArticle) {
    axios.delete('/api/deleteArticle')
    let newState = this.state.data;
    if (newState.indexOf(newArticle) > -1) {
      newState.splice(newState.indexOf(newArticle), 1);
      this.setState({data: newState})
    }
  }



  



  render() {

  

    console.log(this.state.filteredNews.length)

    let newState = this.state.deleteArticle;
    let newArticle = this.state.addedArticle;
    let news = this.state.filteredNews.length < 1? this.state.newsToDisplay.map((e, i) => {
      return (
        <div key={i}>
        <h2>Title: {e.title}</h2>
        <p>Author: {e.author}</p>
        <p>Description: {e.description}</p>
        <p>URL: {e.url}</p>
        <hr />
        </div>
      )
    }): this.state.filteredNews.map((e, i) => {
      return (
        <div key={i}>
        <h2>Title: {e.title}</h2>
        <p>Author: {e.author}</p>
        <p>Description: {e.description}</p>
        <p>URL: {e.url}</p>
        <hr />
        </div>
      )
    })
      

    return (
      <div className="App">
        <div>
          <h1 className="app-title">News Search</h1>
          <input type="text" id="searchTerm" placeholder="What are you looking for?" onChange={this.handleChange}/>
          <button className="button" onClick={this.findNews}>Get News</button>
        </div>
        <div className="container">
          {news}
        </div>
        <div className="thoughts">
          <textarea type="text" id="thoughts-box"/>
        </div>
        <div className='article-holder'>
          <p className="add-article" >
            <input onChange={e => this.change(e.target.value)} className='new-art' placeholder='Title' ref='title' />
            <input className='new-art' placeholder='Author' ref='author' />
            <input className='new-art' placeholder='Description' ref='description' />
            <textarea className='new-article' placeholder='Article' ref='article' />
            <button onClick={this.addArticle} className='article-btn'>Add Article</button>
          </p>
        </div>
        <div className="new-art-container">
          {" Title: " + newArticle.title + ","}
          {" Author: " + newArticle.author + ","}
          {" Description " + newArticle.description + ","}
          {" Article: " + newArticle.article + ","}
          <button onClick={this.deleteArticle.bind(this, newArticle)} className='dlt-btn'>Delete Article</button>
        </div>
        <div>

        </div>

      </div>
    );
  }
}

export default App;
