import './App.css';
import React from 'react';

class DisplayDrinks extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: false,
      data : [],
      idDrinks: [],
      drinkIds: [],
      strDrinks: [],
      strDrinkThumbs: [],
      final: [],
      pics: [],
      drinkNames: [],
      favorites: [],
      idArr: [],
      search: ''
    }
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({isFavorite: !this.state.isFavorite})
  }

  addFavoriteDrink = (id) => {
    let index = this.state.drinkIds.indexOf(id)
    let match = this.state.drinkIds.slice()
    let matchingIdArr = this.state.idArr.slice();
    match = match.splice(index, 1)
    let matchingDrinkName = this.state.drinkNames[index]
    let matchingPic = this.state.pics[index]
    if(matchingIdArr.includes(id) === false){
      matchingIdArr.push(id)
      let favDrink = 
        <div id ="favorites">
          <li>{matchingDrinkName}</li>
          <img id='favoriteImg' src={matchingPic} alt="testing"></img>
          <button id={id} onClick={this.removeFavoriteDrink.bind(this, {id})}>Remove Favorite</button>
        </div>
      let mirror = this.state.favorites.slice()
      mirror.push(favDrink)
      this.setState({favorites: mirror, idArr: matchingIdArr})
    }
  }

  removeFavoriteDrink = (e) => {
    let search = e.id
    let match = this.state.favorites.slice()
    let matchingId = this.state.idArr.slice()
    for(let i =0; i < match.length; i++)
    { 
      if(search === match[i].props.children[2].props.id) {
        match.splice(i, 1) 
      }
    }
    let index = matchingId.indexOf(search)
    matchingId.splice(index, 1)
    this.setState({favorites: match, idArr: matchingId})
  }

  handleChange = (e) => {
    e.preventDefault();
    let searchInput = e.target.value;
    this.setState({search: searchInput})
  }

  clear = () => {
    this.componentDidMount();
  }

  click = () => {
    let searchInput = this.state.search;
    fetch(`http://localhost:3001/search/${searchInput}`)
    .then(res => res.json())
    .then(data => { 
      let test = [];
      let drinkIds = data.drinks.map(e => <li>{e.idDrink}</li>)
      let ids = data.drinks.map(e => e.idDrink)
      let drinkNames = data.drinks.map(e => <li>{e.strDrink}</li>)
      let names = data.drinks.map(e => e.strDrink)
      let drinkPics = data.drinks.map(e => <li>{e.strDrinkThumb}</li>)
      let pictures = data.drinks.map(e => e.strDrinkThumb)
      for(let i =0; i < data.drinks.length; i++){
        test[i] = (
          <div>
            <li>{data.drinks[i].strDrink}</li>
            <img src={data.drinks[i].strDrinkThumb} alt="testing"></img>
            <button id={ids[i]} onClick={this.addFavoriteDrink.bind(this, ids[i])}>Favorite</button>
          </div>
        )
      }
      this.setState({
        idDrinks: drinkIds,
        drinkIds: ids,
        strDrinks: drinkNames,
        strDrinkThumbs: drinkPics,
        final: test,
        drinkNames: names,
        pics: pictures
      })
    })
  };

  componentDidMount() {
    fetch(`http://localhost:3001/`)
    .then(res => res.json())
    .then(data => {
      let test = [];
      let drinkIds = data.drinks.map(e => <li>{e.idDrink}</li>)
      let ids = data.drinks.map(e => e.idDrink)
      let drinkNames = data.drinks.map(e => <li>{e.strDrink}</li>)
      let names = data.drinks.map(e => e.strDrink)
      let drinkPics = data.drinks.map(e => <li>{e.strDrinkThumb}</li>)
      let pictures = data.drinks.map(e => e.strDrinkThumb)
      for(let i =0; i < data.drinks.length; i++){
        test[i] = (
          <div id ="drinks">
            <p id='drinkName'>{data.drinks[i].strDrink}</p>
            <img id='img' src={data.drinks[i].strDrinkThumb} alt="testing"></img>
            <button id={ids[i]} onClick={this.addFavoriteDrink.bind(this, ids[i])}>Favorite</button>
          </div>
        )
      }
      this.setState({
        idDrinks: drinkIds,
        drinkIds: ids,
        strDrinks: drinkNames,
        strDrinkThumbs: drinkPics,
        final: test,
        drinkNames: names,
        pics: pictures
      })
    })
  }
  render() {
    return (
    <div id='background'>
      <div id="grid">
        <div className="ingredients">
          Search by ingredient:
          <input type="text" placeholder="Search Here" onChange={this.handleChange} />
          <button type='submit' onClick={this.click}>Search!</button>
          <button type='submit' onClick={this.clear}>Clear</button>
        </div>
        <div id='row'>
          Favorites:
          {this.state.favorites}
        </div>
        <div className='all'>
          List of All Cocktails:
          {this.state.final}
        </div>
      </div>
    </div>
    )
  }
}

export default DisplayDrinks;