/**
 * Handle Http requests
 */

import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, tap } from 'rxjs/operators';

import { RequestOption, RequestOptionWithData } from './request-option';
import { ResponseError } from './response-error';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http: HttpClient;

  protected urlPrefix = '';

  // Do something after sending request
  protected afterRequest(option: RequestOption) { }

  // Do something before sending request
  protected beforeRequest(option: RequestOption) { }

  // Get error code defined by backend
  protected getErrorCode(res: any): number { return 0; }

  // Deal with http error status codes
  protected handleErrorStatus(error: HttpErrorResponse) { }

  // Cut unnecessary data
  protected parseResponseData(res: any): any { return res; }

  // Test if a response is successful
  protected responseFailed(res: any): boolean { return false; }

  // Make the data a validate format
  protected validateData(res: any, option: RequestOption): any { return res; }

  constructor(
    public injector: Injector
  ) {
    this.http = this.injector.get(HttpClient);
  }


  // Http methods
  // ---------------------------

  /**
   * Send a get request
   */
  get<T>(option: RequestOption): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .get(this.getUrl(option), {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Send post request
   */
  post<T>(option: RequestOptionWithData): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .post(this.getUrl(option), option.data, {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Send patch request
   */
  patch<T>(option: RequestOptionWithData): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .patch(this.getUrl(option), option.data, {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Send put request
   */
  put<T>(option: RequestOptionWithData): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .put(this.getUrl(option), option.data, {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Send delete request
   */
  delete<T>(option: RequestOptionWithData): Observable<T> {
    this.beforeRequest(option);

    return <Observable<any>>this.http
      .delete(this.getUrl(option), <any>{
        body: option.data,
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Process the response
   */
  processResponse<T>(option: RequestOption): any[] {
    return [
      tap((res: any) => {
        this.afterRequest(option);

        if (!this.responseFailed(res)) { return; }

        throw new HttpErrorResponse({
          error: res,
          status: 200
        });
      }),
      map((res: any) => this.parseResponseData(res)),
      map((res: T) => this.validate(res, option)),
      catchError((res: HttpErrorResponse) => this.handleError(res, option))
    ];
  }


  // Http helper
  // ---------------------------

  /**
   * Add prefix to request url
   */
  private getUrl(option: RequestOption): string {
    return `${this.urlPrefix}/${option.url}`;
  }

  /**
   * Handle request errors
   */
  private handleError(res: HttpErrorResponse, option: RequestOption): Observable<ResponseError> {
    this.handleErrorStatus(res);

    return throwError(<ResponseError>{
      code: this.getErrorCode(res.error),
      request: option,
      error: res.error || {},
      status: res.status
    });
  }

  /**
   * Validate and send default values if no response is returned
   */
  private validate(res: any, option: RequestOption): any {

    // return an empty array
    if (option.isArray && !Array.isArray(res)) { return []; }

    return this.validateData(res, option);
  }
}
