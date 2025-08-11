import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseServerUrl = "https://localhost:7292/api/User";

  constructor(private http: HttpClient) {}

  
  //  Signup: Sends new user data to backend

 signupUser(userData: any) {
  return this.http.post(`${this.baseServerUrl}/CreateUser`, userData);
}

//  Login: Sends NID & password to backend for verification
  loginUser(loginData: any) {
    return this.http.post(`${this.baseServerUrl}/Login`, loginData);
  }

  // ✅ NEW: Call backend to send OTP
  sendOtp(nid: string): Observable<any> {
    return this.http.post(`${this.baseServerUrl}/SendOtp`, { nid }); // ✅ Backend will store OTP
  }

  // ✅ NEW: Call backend to validate OTP
  validateOtp(nid: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseServerUrl}/ValidateOtp`, { nid, otp }); // ✅ Backend checks OTP
  }

  // NEW: Get platforms by NID

  getPlatformsByNID(nid: string) {
  return this.http.get<any[]>(`${this.baseServerUrl}/GetPlatformsByNID/${nid}`);
}

getUserName(nid: string) {
  return this.http.get<{ name: string }>(`${this.baseServerUrl}/GetUserName/${nid}`);
}
getLastLogin(nid: string) {
  return this.http.get<{ lastLogin: string }>(`/api/user/${nid}/last-login`);
}
}

