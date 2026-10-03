import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CharacterResponse, Personajes } from '../estandares/personajes';

@Injectable({
  providedIn: 'root'
})
export class CharacteresService {

  private apiUrl = "http://localhost:5000/api";
  private favorites = new BehaviorSubject<number[]>([]);
  favorites$ = this.favorites.asObservable();

  constructor(private http: HttpClient) { }

  getCharacteres(): Observable<CharacterResponse>{
    return this.http.get<CharacterResponse>(`${this.apiUrl}/characteres`);
  }


  addFavorite(id: number) {
    const currentFavorites = this.favorites.getValue();
    if(!currentFavorites.includes(id)){
      this.favorites.next([...currentFavorites, id]);
    }
  }

  removeFavorite(id:number){
    const updatedFavorites = this.favorites.getValue().filter(favId => favId != id);
    this.favorites.next(updatedFavorites);
  }

  getFavorites(): number[] {
    return this.favorites.getValue();
  }


  getCharacteresById(id: number){
    return this.http.get<Personajes>(`${this.apiUrl}/characteres/${id}`);
  }
}
