import { useState, useEffect } from 'react'

import './App.css'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

const App = () => {
  const [searchField, setSearchField] = useState('a')
  const [title, setTitle] = useState('')
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  console.log('render')

  useEffect(() => {
    console.log('effect fired')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
  }, [])

  useEffect(() => {
    const newFilteredMonters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField)
    )

    setFilteredMonsters(newFilteredMonters)

    console.log('effect is firing')
  }, [monsters, searchField])

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLowerCase()

    setSearchField(searchFieldString)
  }
  const onTitleChange = event => {
    const searchFieldString = event.target.value.toLowerCase()

    setTitle(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <br />
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder="set title"
        className="title-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super()

//     this.state = {
//       monsters: [],
//       searchField: '',
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users =>
//         this.setState(() => {
//           return { monsters: users }
//         })
//       )
//   }

//   onSearchChange = event => {
//     const searchField = event.target.value.toLowerCase()

//     this.setState(() => {
//       return { searchField }
//     })
//   }

//   render() {
//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this

//     const filteredMonters = monsters.filter(monster =>
//       monster.name.toLowerCase().includes(searchField)
//     )

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//           className="monsters-search-box"
//         />
//         <CardList monsters={filteredMonters} />
//       </div>
//     )
//   }
// }

export default App
