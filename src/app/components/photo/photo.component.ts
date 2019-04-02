import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PhotoFallbackService } from 'src/app/services/photo.fallback.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photo$: Observable<Photo>;
  imageUrl$;

  constructor(
    private route: ActivatedRoute, 
    @Inject(PhotoFallbackService) private photoService: PhotoService,         
    private router: Router
    ) { }

  ngOnInit() {
    this.getPhoto();
  }

  getPhoto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.photo$ = this.photoService.getPhoto(id);
    } else {
      this.photo$ = of<Photo>(<Photo><unknown>{isTags: [], containsTags: [], describedAsTags: []});
    }
  }

  updatePhoto(photo: Photo){
    if(photo.id) {
      this.photoService.updatePhoto(photo);
    } else {
      this.photoService.createPhoto(photo);
    }
    this.router.navigate(['/photos']);
  }
}
