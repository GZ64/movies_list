import React, {Component} from 'react';
import Filter from './Filter';
import Pagination from "./Pagination"
import {movies$} from "./movies";
import './css/App.css';

// on recupere les categories dynamiquement dans le fichier movies.js
const getCategories = (movies) => {
    let categories = [];

    for (let movie in movies) {
        if (movies.hasOwnProperty(movie)) {
            let n = movies[movie];
            if (categories.indexOf(n.category) === -1) categories.push(n.category);
        }
    }
    return categories.sort();
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            categoriesAvailable: [],
            checkedItemsCategories: [],
            filter: false,
            currentPage: 1,
            itemPerPage: 4
        };
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleClickRemoveMovie = this.handleClickRemoveMovie.bind(this);
        this.handleClickNextPrev = this.handleClickNextPrev.bind(this);
        this.handleChangeItemPerPage = this.handleChangeItemPerPage.bind(this);
    }
    // au montage du composant on recupere les films et categories
    componentDidMount() {
        movies$.then(movies => {
            this.setState({movies: movies});
            this.setState({categoriesAvailable: getCategories(movies)});
        });
    }
    // filtre
    handleChangeFilter(e) {
        this.setState({currentPage: 1}); // On se replace en premiere page pour tout visualiser
        const category = e.target.name;
        const isChecked = e.target.checked;
        const filterMap = [...this.state.checkedItemsCategories];

        if (isChecked) { // si le filter est actif
            if (filterMap.indexOf(category) === -1) filterMap.push(category); // si la category n'existe pas dans le tableau on l'ajoute
        } else {
            if (filterMap.indexOf(category) !== -1) { // si c'est pas checked et que la category existe dans le tableau...
                for (let i = 0; i < filterMap.length; i++) {
                    if (category === filterMap[i]) filterMap.splice(i, 1);// on le supprime
                }
            }
        }
        if (filterMap.length > 0) this.setState({filter: true}); // si il y a au moins un filtre actif on set le state a true
        else this.setState({filter: false}); // sinon on set a false
        this.setState({checkedItemsCategories: filterMap}); // et on met a jour le state
    }

    handleClickRemoveMovie(e) {
        let idMovie = parseInt(e.currentTarget.id); // on recupere l'id de  la div
        let movies = [...this.state.movies]; // les films
        let idx;

        for (let i = 0, c = movies.length; i < c; i++) {
            let idArray = parseInt(movies[i].id); // et on en determine l'id du tableau
            if (idArray === idMovie) idx = i; // si ca match on garde l'id
        }
        movies.splice(idx, 1); // et on supprime
        // puis on met a jour les states
        this.setState({movies: movies});
        this.setState({categoriesAvailable: getCategories(movies)});
    };

    // gestion des boutons prev et next
    handleClickNextPrev(e) {
        if (e.target.id === "left" && this.state.currentPage > 1)
            this.setState({ currentPage: this.state.currentPage - 1 }); // page precedente

        if (e.target.id === "right" && this.state.currentPage < Math.ceil(this.state.movies.length / this.state.itemPerPage))
            this.setState({ currentPage: this.state.currentPage + 1 });// page suivante
    }
    // changement du nombre de film visible sur la page
    handleChangeItemPerPage(e) {
        let value = parseInt(e.currentTarget.value); // on recupere la valeur: 4, 8 ou 12
        this.setState({itemPerPage: value}); // et on met a jour son state
    }

    render() {
        const { movies, categoriesAvailable, filter, checkedItemsCategories, currentPage, itemPerPage } = this.state;
        return (
            <div className="App">
                <header className="category-bloc">
                    <Filter
                        categoriesAvailable={categoriesAvailable}
                        handleChangeFilter={this.handleChangeFilter}
                    />
                </header>
                <div>
                    <Pagination
                        movies={movies}
                        filter={filter}
                        checkedItems={checkedItemsCategories}
                        currentPage={currentPage}
                        itemPerPage={itemPerPage}
                        handleClickRemoveMovie={this.handleClickRemoveMovie}
                        handleClickNextPrev={this.handleClickNextPrev}
                        handleChangeItemPerPage={this.handleChangeItemPerPage}
                    />
                </div>
            </div>
        );
    }
}

export default App;