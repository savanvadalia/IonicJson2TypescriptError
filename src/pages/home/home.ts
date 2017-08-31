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

    // Define a JSON string (could come from a HTTP service)
    let jsonObject: object = {
      "countryName": "Switzerland",
      "cities": [
        {
          "name": "Basel",
          "founded": -200,
          "beautiful": true
        },
        {
          "name": "Zurich",
          "founded": 0,
          "beautiful": false
        }
      ]
    };

    // Choose your settings
    // Check the detailed reference in the chapter "JsonConvert class properties and methods"
    let jsonConvert: JsonConvert = new JsonConvert();
    // print some debug data from the lib
    jsonConvert.operationMode = OperationMode.LOGGING;

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
