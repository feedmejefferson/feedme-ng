import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photo$: Observable<Photo>;
  imageUrl$;

  constructor(private route: ActivatedRoute, private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
    this.getPhoto();
    this.getPhotoImageUrl();
  }

  getPhoto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.photo$ = this.photoService.getPhoto(id);
    } else {
 //     this.photo$ = of<Photo>(<Photo>{});
      this.photo$ = of<Photo>(<Photo><unknown>{isTags: [], containsTags: [], describedAsTags: []});
    }
  }

  updatePhoto(photo: Photo){
    if(photo.id) {
      this.photoService.updatePhoto(photo);
    } else {
      this.photoService.createPhoto(photo)
      .then(ref => this.router.navigate(['/photo',ref.id]));
    }
  }

  getPhotoImageUrl(): void {
    this.imageUrl$ = this.photo$.pipe(
      map(photo => this.photoService.getImageUrl(photo.id))
      );
  }
}
