import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IsPublicKey } from 'src/shared/decorators/IsPublic';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IsPublicKey, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Access token não encontrado');
    }

    try {
      // Valide o token usando o Clerk SDK
      const verifiedToken = await clerkClient.verifyToken(token);

      if (!verifiedToken || !verifiedToken.sub) {
        throw new UnauthorizedException('Sessão inválida');
      }

      // Atribua o userId à requisição para uso posterior
      request['userId'] = verifiedToken.sub;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou sessão inválida');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
