import {
  UnauthorizedException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/resources/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { EmailService } from 'src/providers/email/email.service';
@Injectable()
export class AuthService {
  SALT_ROUNS = 10;
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailOrPhone(username);
    if (!user) return null;
    const isMatch =
      (await bcrypt.compare(pass, user.pin)) ||
      (await bcrypt.compare(pass, user.password));
    if (user && isMatch) {
      const updatedUser = new UpdateUserDto();
      updatedUser.lastLogin = new Date();
      this.usersService.update(user.id, updatedUser);
      const { pin, password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { _id: user?._id, phone: user?.phone, email: user?.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(email: string, request: Request) {
    console.log(request.headers.origin);
    const user = await this.usersService.findByEmailOrPhone(email);
    if (!user) {
      throw new NotFoundException(`User with email address ${email} not found`);
    }
    const resetKey = randomUUID();
    const resetUrl = request.headers.origin + '/new-password/' + resetKey;
    const updatedUser = new UpdateUserDto();
    updatedUser.resetPasswordKey = resetKey;
    updatedUser.resetPinKey = resetKey;
    updatedUser.lastPasswordReset = new Date();
    this.usersService.update(user.id, updatedUser);
    //send email to the user
    this.emailService.sendEmail();
    console.log(resetUrl, user);
  }

  async newPassword(resetkey: string, password: string) {
    const user = await this.usersService.findByResetKey(resetkey);
    if (user) {
      // check date diff 60000 are are seconds
      const now = +new Date();
      const { lastPasswordReset } = user;
      const diff = (now - +new Date(lastPasswordReset)) / 60000;
      //if greater that 15 minutes reject reset token
      if (diff > 15) {
        throw new UnauthorizedException('Resetlink Expired');
      }
      const updatedUser = new UpdateUserDto();
      updatedUser.resetPinKey = null;
      updatedUser.resetPasswordKey = null;
      updatedUser.password = password;
      updatedUser.pin = await bcrypt.hash(password, this.SALT_ROUNS);
      updatedUser.password = await bcrypt.hash(password, this.SALT_ROUNS);
      this.usersService.update(user.id, updatedUser);

      return { message: 'Password reset successfully' };
    }
    throw new UnauthorizedException('Invalid password reset link');
  }
}
