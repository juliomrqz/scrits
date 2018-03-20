import { Inject } from '@angular/core';
import { Response } from '@angular/http';

import { CookieService } from 'ngx-cookie';
import { RestangularModule, Restangular } from 'ngx-restangular';
// import { ToasterService } from 'angular2-toaster';

import { ObjectList } from './shared/backend/interfaces';

const getResponseMessage = (response: Response): string => {
  let message;

  try {
    const body = response.json() as { detail: string };

    if (body.detail) {
      message = body.detail;
    }
  } catch (error) {
    // Nothing here
  }

  try {
    const body = response.json() as { non_field_errors: string };

    if (body.non_field_errors) {
      message = body.non_field_errors;
    }
  } catch (error) {
    // Nothing here
  }

  return message;
};

// Function for setting the default restangular configuration
export function RestangularConfigFactory(
  RestangularProvider,
  cookieService: CookieService
  //   toasterService: ToasterService
) {
  RestangularProvider.addResponseInterceptor(
    (data: ObjectList<any> | {}, operation, what, url, response) => {
      if (data) {
        if (data['results']) {
          RestangularProvider.addElementTransformer(what, true, function(
            result
          ) {
            result.total = function() {
              return data['count'];
            };

            return result;
          });
          return data['results'];
        }

        return data;
      } else {
        return { detail: 'Successfully removed' };
      }
    }
  );

  // RestangularProvider.addFullRequestInterceptor(
  //   (element, operation, path, url, headers, params) => {
  //     return {
  //       params: params,
  //       headers: headers,
  //       element: element
  //     }
  //   });

  RestangularProvider.setBaseUrl(process.env.API_URL);
  RestangularProvider.setRequestSuffix('/?format=json');

  // By each request to the server receive a token and update headers with it
  RestangularProvider.addFullRequestInterceptor(
    (element, operation, path, url, headers, params) => {
      return {
        headers: Object.assign({}, headers, {
          'X-CSRFToken': cookieService.get('csrftoken')
        })
      };
    }
  );

  // TODO: Error interceptor
  RestangularProvider.addErrorInterceptor(
    (response: Response, subject, responseHandler) => {
      console.debug('response', response);
      console.debug('subject', subject);
      console.debug('responseHandler', responseHandler);

      const message = getResponseMessage(response);

      if (response.status === 0) {
        //   toasterService.pop(
        //     'error',
        //     'Cannot process your request. Check your internet connection and try again.'
        //   );
        return false;
      }

      if (response.status < 500 && message !== null) {
        //   toasterService.pop(
        //     'error',
        //     message
        //   );
        return true;
      } else if (response.status >= 500 && message !== null) {
        //   toasterService.pop(
        //     'error',
        //     'The communication with the server cound\'t be completed. Please, try again later.'
        //   );
        return false;
      } else {
        //   toasterService.pop(
        //     'error',
        //     'Something weird happened. Please, try again later.'
        //   );
      }

      return true; // error not handled
    }
  );
}
