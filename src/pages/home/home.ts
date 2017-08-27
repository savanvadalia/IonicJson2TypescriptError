import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Country } from "../../model/country";
import { JsonConvert, OperationMode } from "json2typescript";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public country: Country;

  constructor(public navCtrl: NavController) {
    this.doDeserialization();
  }

  doDeserialization() {

    let jsonStr: string = `{
      "countryName": "Switzerland",
      "cities": [
        {
          "id": 1,
          "name": "Basel",
          "founded": -200,
          "beautiful": true,
          "data": 123,
          "keywords": ["Rhine", "River"]
        },
        {
          "id": 1,
          "name": "Zurich",
          "founded": 0,
          "beautiful": false,
          "data": "no",
          "keywords": ["Limmat", "Lake"]
        }
      ]
    }`;

    // Define a JSON string (could come from a HTTP service)
    let jsonObject: object = JSON.parse(jsonStr);

    // Choose your settings
    // Check the detailed reference in the chapter "JsonConvert class properties and methods"
    let jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

    // Map to the country class
    try {
      this.country = jsonConvert.deserialize(jsonObject, Country);
      this.country.cities[0].printInfo();
      // prints: Basel was founded in -200 and is really beautiful!
    } catch (e) {

      alert("Error occurred while mapping jsonobject to typescript object, please view console logs for more errors");
      console.log((<Error>e));
      throw e;
    }
  }
}
