import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-attribution',
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.scss']
})
export class AttributionComponent {

  @Input() photo: Photo;

  constructor() { }

}
