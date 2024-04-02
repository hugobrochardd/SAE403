import {fakeNetwork} from './utils.js';
//await fetchNetwork()



export async function fetchCategories(){
    let answer = await fetch('http://localhost:8080/api/categories');
    let data = await answer.json();
    return data;
}


export async function fetchMoviesByCategories(name, page = 1, limit = 50){
    let answer = await fetch('http://localhost:8080/api/category/' + name + '?page=' + page + '&limit=' + limit);
    let data = await answer.json();
    return data;
}


export async function fetchMovieById(id){
    let answer = await fetch('http://localhost:8080/api/movies/' + id);
    let data = await answer.json();
    return data;
}



export async function fetchMovies(page = 1, limit = 50){
    let answer = await fetch(`http://localhost:8080/api/movies?page=${page}&limit=${limit}`);
    let data = await answer.json();
    return data;
}



export async function fetchNewMovies(page = 1, limit = 50){
    let answer = await fetch(`http://localhost:8080/api/new?page=${page}&limit=${limit}`);
    let data = await answer.json();
    return data;
}


export async function fetchHighlightMovies(page = 1, limit = 50){
    let answer = await fetch(`http://localhost:8080/api/highlight?page=${page}&limit=${limit}`);
    let data = await answer.json();
    return data;
}


export async function fetchRandomMovies(page = 1, limit = 50){
    let answer = await fetch(`http://localhost:8080/api/random?page=${page}&limit=${limit}`);
    let data = await answer.json();
    return data;
}


export async function fetchSearchMovies(searchTerm, page = 1, limit = 50){
    let answer = await fetch('http://localhost:8080/api/search/' + searchTerm + '?page=' + page + '&limit=' + limit);
    let data = await answer.json();
    return data;
}

