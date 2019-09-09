import { BehaviorSubject, of } from 'rxjs';
import { failure, success, initial } from '@devexperts/remote-data-ts';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

import getDeps from 'core/getDeps';
import { getErrorMessage } from 'shared/helpers/error';
import { userService } from 'services/user';

import { TAuthentication, TRegistration } from '../namespace';
import { Either, left, right } from 'fp-ts/lib/Either';

const { api, storage } = getDeps();

export const authentication$ = new BehaviorSubject<TAuthentication>(initial);
export function authenticate(phone: string, password: string) {
  api.auth.authenticate(phone, password)
    .pipe(
      tap((token) => storage.saveAuthToken(token)),
      switchMap(() => api.user.loadAccount()),
      tap(user => userService.saveUser(user)),
      map(user => success(user)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).subscribe(authentication$);
}

export const registration$ = new BehaviorSubject<TRegistration>(initial);
export function register(name: string, surname: string, phone: string, password: string) {
  api.auth.register({ name, surname, phone, password })
    .pipe(
      tap(token => storage.saveAuthToken(token)),
      switchMap(() => api.user.loadAccount()),
      tap(user => userService.saveUser(user)),
      map(user => success(user)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).subscribe(registration$);
}

export function checkAuth(): Either<null, null> {
  const token = storage.getAuthToken();
  return token ? right(null) : left(null);
}