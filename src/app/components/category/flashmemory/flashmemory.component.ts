import { Component, OnInit } from '@angular/core';
import {FlashmemoryService} from "../../../services/products/flashmemory/flashmemory.service";

@Component({
  selector: 'app-flashmemory',
  templateUrl: './flashmemory.component.html',
  styleUrls: ['./flashmemory.component.css']
})
export class FlashmemoryComponent implements OnInit {
  flashMemory : any;
  constructor(private flashServic:FlashmemoryService) {
    this.getAllFlashmemory()
  }

  ngOnInit(): void {
  }

  getAllFlashmemory() {
    this.flashServic.getAllFlashmemory().subscribe(data =>{
     this.flashMemory= data;
    },
      error => {
      console.log(error)
      }
    )
  }
}
