import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterResponse, Personajes } from 'src/app/estandares/personajes';
import { CharacteresService } from 'src/app/services/characteres.service';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent implements OnInit {

  characters: Personajes[] = [];
    filteredCharacters: Personajes[] = [];
    filterText: string = '';
    favoriteIds: number[] = [];

  constructor(private characterService: CharacteresService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCharacteres();
    this.characterService.favorites$.subscribe(favs => {
      this.favoriteIds = favs;
    });
  }

  obtenerCharacteres(){
      this.characterService.getCharacteres().subscribe(
        (response: CharacterResponse) => {
        this.characters = response.items;
        this.filteredCharacters = this.characters;
        }
      )
    }
  
    filterCharacters() {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  
    toggleFavorite(character: Personajes) {
      if (this.favoriteIds.includes(character.id)) {
        this.characterService.removeFavorite(character.id);
      } else {
        this.characterService.addFavorite(character.id);
      }
    }
  
    isFavorite(character: Personajes): boolean {
      return this.favoriteIds.includes(character.id);
    }
  
    goToDetalles(characterId: number){
      this.router.navigate(['/detalles', characterId]);
    }

}
