import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterResponse, Personajes } from 'src/app/estandares/personajes';
import { CharacteresService } from 'src/app/services/characteres.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  characters: Personajes[] = [];
  filteredCharacters: Personajes[] = [];
  filterText: string = '';
  favoriteIds: number[] = [];

  totalItems: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  nextPage: string | null = null;
  prevPage: string | null = null;

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

      this.totalItems = response.meta.totalItems;
      this.currentPage = response.meta.currentPage;
      this.totalPages = response.meta.totalPages;
      this.nextPage = response.links.next;
      this.prevPage = response.links.previous;
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
