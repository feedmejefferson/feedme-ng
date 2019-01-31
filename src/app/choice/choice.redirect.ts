import { Component, OnInit, Injector } from '@angular/core';
import { ChoiceService } from '../choice.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-choice-redirect',
  template: ''
})
export class ChoiceRedirect implements OnInit {

  private choiceService: ChoiceService;

  constructor(private route: ActivatedRoute,
    private injector: Injector,
    private router: Router
  ) {
    const serviceToken = route.snapshot.data['requiredService'];
    this.choiceService = injector.get(serviceToken);
  }

  ngOnInit() {
    this.choiceService.getChoiceRoute(0,1).then(choiceRoute => {
      this.router.navigate(choiceRoute, { replaceUrl: true });
    });
  }
}


