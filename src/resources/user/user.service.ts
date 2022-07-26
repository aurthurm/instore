import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  SALT_ROUNS = 10;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save({
      ...userDto,
      id: uuidV4(),
      requirePinChange: false,
      requirePasswordChange: false,
      pin: await bcrypt.hash(userDto.pin, this.SALT_ROUNS),
      password: await bcrypt.hash(userDto.password, this.SALT_ROUNS),
    });
  }

  async findAll(query = {}) {
    return await this.userRepository.find(query);
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneBy(query = {}) {
    return await this.userRepository.findOneBy(query);
  }

  async findByEmailOrPhone(payload: string) {
    return await this.userRepository.findOne({
      where: [{ phone: payload }, { email: payload }],
    });
  }

  async findByResetKey(resetKey: string) {
    return await this.userRepository.findOne({
      where: [{ resetPasswordKey: resetKey }, { resetPinKey: resetKey }],
    });
  }

  async update(id: string, userDto: UpdateUserDto) {
    return this.userRepository.update({ id }, userDto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
