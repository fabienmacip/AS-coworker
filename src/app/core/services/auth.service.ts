import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, catchError, finalize, delay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  readonly user$: Observable<User|null> = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private errorService: ErrorService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<User|null> {

    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=${environment.firebase.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.loaderService.setLoading(true);

    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        return this.usersService.get(userId, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );

    // return of(new User());
    // Simple code pour calmer votre IDE.
    // Retourne un Observable contenant un utilisateur,
    // grâce à l’opérateur of de RxJS.
   }

   private logoutTimer(expirationTime: number): void {
    of(true).pipe(
      delay(expirationTime * 1000)
    ).subscribe(_ => this.logout());
   }

   register(name: string, email: string, password: string): Observable<User|null> {
/*     const API_KEY: string = 'AIzaSyCgsUWqDIX7G3pWWg1wv8svM5267b3TfMo';
    const API_AUTH_BASEURL: string = `https://www.googleapis.com/identitytoolkit/v3/relyingparty`;
 */
    const url =
      `${environment.firebase.auth.baseURL}/signupNewUser?key=
      ${environment.firebase.apiKey}`;
    /* : string = `${API_AUTH_BASEURL}/signupNewUser?key=${API_KEY}`; */

    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    this.loaderService.setLoading(true);

    //return this.http.post<User>(url, data, httpOptions);
    return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name: name
        });

        return this.usersService.save(user, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
      );
     }

   logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
   }

}
