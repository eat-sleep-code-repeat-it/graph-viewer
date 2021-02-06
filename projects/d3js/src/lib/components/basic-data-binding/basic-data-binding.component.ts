import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { D3jsFileService } from '../../shared/d3js-file.service';

@Component({
  selector: 'lib-basic-data-binding',
  templateUrl: './basic-data-binding.component.html',
  styleUrls: ['./basic-data-binding.component.css']
})
export class BasicDataBindingComponent implements OnInit {
  @ViewChild('d3jchartcontainer', { static: true }) private chartContainer: ElementRef;
  data: any;

  constructor(private fileService: D3jsFileService) { }

  ngOnInit(): void {
    this.loadJsonFile();
  }

  // D3 adopted the use of Promises to handle those asynchronous requests.
  // fetch https://fetch.spec.whatwg.org/
  loadCSVFile() {
    const csvFile = 'assets/textdata.csv';  
    this.fileService.loadCsvFile(csvFile).subscribe(data => {
      console.log('jsonFile', this.data);
      this.data = JSON.stringify(data);
    });
  }

  loadJsonFile() {
    let element: any = this.chartContainer.nativeElement;
    const jsonFile = 'assets/textdata.json';

    this.fileService.loadJsonFile(jsonFile)
    .subscribe(data => {
      console.log('jsonFile', this.data);
      this.data = JSON.stringify(data);
      
      this.drawSvg(element, data);
    });
  }

  drawSvg(elem:any, data:any) {
    d3.select(elem)
    .selectAll('p')
    .data(data)
    .enter()
    .append('p')
    .text(function(d) { return 'City->' + d.city; });
  }
}
