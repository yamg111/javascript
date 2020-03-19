import { Pipe,PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
    name:"filter",
})

export class OrdersFilterPipe implements PipeTransform {
    constructor(public http:HttpClient) { }
    transform(searchResults, searchVal:string){
        if(!searchResults|| !searchVal)
            return searchResults

        // filtering search results        
            return searchResults.filter(
                 value=>{ return value["item_name"].toLowerCase().indexOf(searchVal.toLowerCase()) >-1
        })
    }  
}
