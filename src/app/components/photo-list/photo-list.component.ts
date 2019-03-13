import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.model';
import { environment } from  '../../../environments/environment';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[];

  constructor(
    @Inject(environment.photoServiceToken) private photoService: PhotoService,         
    private router: Router
    ) { }

  ngOnInit() {
    this.photoService.getPhotos()
    .subscribe(data => this.photos = data);
  }

}
