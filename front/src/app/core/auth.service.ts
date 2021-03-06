import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullscreenLoading } from '../shared/decorator/fullscreen-loading.decorator';
import { Observable } from 'rxjs';
import { IBaseResponse, ILoginRequest, ILoginVerify } from '../app.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  @FullscreenLoading()
  request(account: string, otp: boolean): Observable<IBaseResponse<ILoginRequest>> {
    return this.http.post<IBaseResponse<ILoginRequest>>(`${environment.baseUrl}/auth/step/one`, {
      account,
      otp
    });
  }

  @FullscreenLoading()
  verify(guid: string, tempId: string, account: string, code: string, otp: boolean): Observable<IBaseResponse<ILoginVerify>> {
    return this.http.post<IBaseResponse<ILoginVerify>>(`${environment.baseUrl}/auth/step/two`, {
      guid,
      tempId,
      account,
      code,
      otp
    });
  }

  @FullscreenLoading()
  logout(): Observable<IBaseResponse<null>> {
    return this.http.post<IBaseResponse<null>>(`${environment.baseUrl}/auth/logout`, {});
  }
}
