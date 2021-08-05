import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class KeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!process.env.API_KEY) {
      return true;
    }

    if (this.reflector.get("public", context.getHandler()) === true) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const key = request.headers["authorization"];
    return key === process.env.API_KEY;
  }
}
