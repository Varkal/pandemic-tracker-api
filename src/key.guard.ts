import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class KeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!process.env.API_KEY) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const key = request.headers["authorization"];
    return key === process.env.API_KEY;
  }
}
