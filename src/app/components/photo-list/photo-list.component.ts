import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[];
  photo: Photo = {id: '', title: '', description: ''} as Photo;

  constructor(
    private photoService: PhotoService,         
    private router: Router
    ) { }

  ngOnInit() {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Photo;
      })
    });
  }

  create(photo: Photo){
    this.photoService.createPhoto(photo);
  }


}
