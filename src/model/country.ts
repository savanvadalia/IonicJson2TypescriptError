import { JsonObject, JsonProperty } from "json2typescript";
import { City } from "./city";


@JsonObject
export class Country {

    // This maps the value of the JSON key "countryName" to the class property "name".
    // If the JSON value is not of type string (or missing), there will be an exception.
    @JsonProperty("countryName", String)
    public name: string = undefined;

    // This maps the value of the JSON key "cities" to the class property "cities".
    // If the JSON value is not of type array object (or missing), there will be an exception.
    // There will be an exception too if the objects in the array do not match the class "City".
    @JsonProperty("cities", [City])
    public cities: City[] = undefined;

}