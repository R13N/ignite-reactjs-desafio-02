import { useEffect, useState } from "react";
import { MovieCard } from '../components/MovieCard';
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface SelectedGenreIdProps {
  selectedGenreId: number;
}


export function Content({selectedGenreId}: SelectedGenreIdProps) {


  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  // Complete aqui

  return(
    <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard 
            key ={movie.imdbID} 
            title={movie.Title} 
            poster={movie.Poster} 
            runtime={movie.Runtime} 
            rating={movie.Ratings[0].Value} 
          />
        ))}
      </div>
    </main>
  </div>
  )
}