/**
 * Options to send up an http request
 */

// General option
export interface RequestOption {

  // request
  url: string;
  params?: {[key: string]: any};
  headers?: {[key: string]: any};

  // if true, backend should return an array of results
  isArray?: boolean;

  // if true, backend should return paged response in certain format
  isPaged?: boolean;
}

// Post, Put and Patch
export interface RequestOptionWithData extends RequestOption {
  data?: {[key: string]: any};
}
