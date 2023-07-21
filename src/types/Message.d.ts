export interface Message {
  required: string;
  fileButton: string;

  // string
  string: {
    minLength: string;
    maxLength: string;
    between: string;
  };

  // number message
  number: {
    minimum: string;
    exclusiveMinimum: string;
    maximum: string;
    exclusiveMaximum: string;
    between: string;
    betweenExclusiveMin: string;
    betweenExclusiveMax: string;
    betweenExclusiveMinMax: string;
  };

  // 정규식 메시지
  regexp: {
    'mobile': string;
    'email': string;
    'url': string;
    'number': string
    'alpha': string;
    'alpha-num': string;
    'variable': string;
  };
}
