import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  isLoading: Subject<boolean> = this.globalService.isLoading;

  constructor(private globalService:GlobalService) {
    
  }
}
