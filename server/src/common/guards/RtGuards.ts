import { AuthGuard } from '@nestjs/passport';

export class RTGuard extends AuthGuard('RTjwt') {
  constructor() {
    super();
  }
}
