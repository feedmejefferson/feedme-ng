import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseImageUrl;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  public url: string;

  @Input()
  set image(image: string) {
    this.url = baseUrl + image;
  } 

  constructor() { }


}
