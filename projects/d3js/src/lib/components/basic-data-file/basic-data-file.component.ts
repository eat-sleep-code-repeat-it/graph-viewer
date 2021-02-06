import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { D3jsFileService } from '../../shared/d3js-file.service';

@Component({
  selector: 'lib-basic-data-file',
  templateUrl: './basic-data-file.component.html',
  styleUrls: ['./basic-data-file.component.css']
})
export class BasicDataFileComponent implements OnInit {
  data: any;

  constructor(private fileService: D3jsFileService) { }

  ngOnInit(): void {
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
    const jsonFile = 'assets/textdata.json';
    this.fileService.loadJsonFile(jsonFile).subscribe(data => {
      console.log('jsonFile', this.data);
      this.data = JSON.stringify(data);
    })
  }

  loadCSVFilePromise() {
    const csvFile = 'assets/textdata.csv'; 

    d3.csv(csvFile).then((data: any) => {
      console.log('data', data);
      
      this.data = JSON.stringify(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].parent, '->' ,data[i].name);
      }
    })
    .catch((err) => {
      console.error('loadCSVFile:Handle err', err);
    })
    .finally(() => {
      console.log('finally');
    });
  }
  loadJsonFilePromise() {
    const jsonFile = 'assets/textdata.json';
    d3.json(jsonFile)
    .then((data: any) => {
      console.log('data', data);
      this.data = JSON.stringify(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].name, '->' ,data[i].age, '->', data[i].city);
      }
    })
    .catch((err) => {
      console.error('loadJsonFile:Handle err', err);
    })
    .finally(() => {
      console.log('finally');
    });
  }

}
