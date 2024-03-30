import {fakeNetwork} from './utils.js';
//await fetchNetwork()



export async function fetchCategories(){
    let answer = await fetch('http://localhost:8080/api/categories');
    let data = await answer.json();
    return data;
}

/*
export async function fetchMovies(){
    let answer = await fetch('http://localhost:8080/api/movies');
    let data = await answer.json();
    return data;
}
*/

export async function fetchMovies(page = 1, limit = 50){
    let answer = await fetch(`http://localhost:8080/api/movies?page=${page}&limit=${limit}`);
    let data = await answer.json();
    return data;
}



export async function fetchNewMovies(page = 1, limit = 50){
    let answer = await fetch(`http://localhost:8080/api/movies?page=${page}&limit=${limit}`);
    let data = await answer.json();
    return data;
}