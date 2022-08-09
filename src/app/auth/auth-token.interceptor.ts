import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthTokenHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req)
        }
        // console.log(`User id: ${user?.id}`)
        // console.log(`Token: ${user?.token}`)
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + user?.token)
        })
        return next.handle(modifiedReq)
      })
    )
  }

}
