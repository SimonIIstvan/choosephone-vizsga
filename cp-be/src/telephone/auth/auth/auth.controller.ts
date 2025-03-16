import { Controller, Post, Body, Session, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

interface User {
    id: number;
    username: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('status')
    async getStatus(@Session() session: any): Promise<{ loggedIn: boolean; user?: User }> {
        if (session.userId) {
            // Ha van userId a sessionben, be van jelentkezve
            const user: User = { id: session.userId, username: session.username || 'Ismeretlen' };
            return { loggedIn: true, user };
        }
        return { loggedIn: false };
    }

    @Get('me')
    async getMe(@Session() session: any) {
        if (!session.userId) {
            throw new UnauthorizedException('Nincs bejelentkezve');
        }
        const user = await this.authService.findUserById(session.userId);
        return user;
    }

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        return this.authService.register(body.username, body.password);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }, @Session() session: any) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new UnauthorizedException('Hibás felhasználónév vagy jelszó');
        }
        session.userId = user.id; // Session-be mentjük a felhasználó azonosítóját
        session.username = user.username;
        return { message: 'Sikeres bejelentkezés' };
    }

    @Post('logout')
    logout(@Session() session: any) {
        session.destroy(); // Session törlése
        return { message: 'Sikeres kijelentkezés' };
    }
}
