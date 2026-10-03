import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personajes } from 'src/app/estandares/personajes';
import { CharacteresService } from 'src/app/services/characteres.service';

@Component({
  selector: 'app-lista-favoritos',
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.css']
})
export class ListaFavoritosComponent implements OnInit {

  favoriteCharacters: Personajes[] = [];
  favoriteIds: number[] = [];

  constructor(private characterService: CharacteresService, private router: Router) { }

  ngOnInit(): void {
    this.characterService.favorites$.subscribe(favs => {
      this.favoriteIds = favs;
      this.loadFavoriteCharacters();
    });
  }

  loadFavoriteCharacters(){
    this.characterService.getCharacteres().subscribe(response => {
      this.favoriteCharacters = response.items.filter(character => 
        this.favoriteIds.includes(character.id)
      );
    });
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

  get favoriteCount(): number{
    return this.favoriteCharacters.length;
  }

}
