import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  pin: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  resetPinKey: string;

  @ApiProperty()
  @IsBoolean()
  requirePinChange: boolean;

  @ApiProperty()
  @IsString()
  resetPasswordKey: string;

  @ApiProperty()
  @IsBoolean()
  requirePasswordChange: boolean;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  lastLogin: Date;

  @ApiProperty()
  @IsDate()
  lastPasswordReset: Date;

  @ApiProperty()
  @IsString()
  roles: string[];

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  address: string;
}
