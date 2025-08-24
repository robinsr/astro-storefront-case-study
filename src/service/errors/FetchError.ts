import getLogger from '~/util/log';

const log = getLogger('service/shopify');

export class FetchError extends Error {
  message: string;
  context: string;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.context = '';
    log.error(this);
  }

  public withContext(context: string | string[]) {
    this.context = Array.isArray(context) ? context.join('.') : context;
    return this;
  }
}

export default FetchError;