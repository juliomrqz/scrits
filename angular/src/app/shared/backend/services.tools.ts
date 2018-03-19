import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

export function getAutheticationHeaders(cookieService: CookieService): HttpHeaders {
  var headers = new HttpHeaders();

  headers.append('X-CSRFToken', cookieService.get('csrftoken'));

  return headers;
};
