import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personajes } from 'src/app/estandares/personajes';
import { CharacteresService } from 'src/app/services/characteres.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  character!: Personajes;

  constructor(private route: ActivatedRoute, private characterService: CharacteresService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.characterService.getCharacteresById(+id).subscribe(
        (data: Personajes) => {
          this.character = data;
        });
    }
  }

}
