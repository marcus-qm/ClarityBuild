import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthEnforcerService {

  // URL = "https://us-central1-clarityapi-bdca6.cloudfunctions.net/checkUser"

  constructor(private http: HttpClient) { }

  // verifyUser(id) {
  //   this.http.get(this.URL)
  //     .map((res: Response) => {
  //       res.json();
  //   })
  // }
}
