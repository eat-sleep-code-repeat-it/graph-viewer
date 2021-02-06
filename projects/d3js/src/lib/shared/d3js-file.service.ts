import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class D3jsFileService {
  constructor() { }

  loadCsvFile(fileName: string): Observable<any>  {
    return from(
      d3.csv(fileName)
    );
  }

  loadJsonFile(fileName: string): Observable<any>  {
    return from(
      d3.json(fileName)
    );
  }

  loadJsonFileParse(fileName: string): Observable<any>  {
    return from(d3.json(fileName, (d) => {
      return {
        year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
        make: d.Make,
        model: d.Model,
        length: +d.Length // convert "Length" column to number
      };
    }));
  }
}