import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument, UserEntity } from '../entities/user.entity';
import { CreateUserRequestDto } from '../use-cases/create/create.request.dto';
import { UpdateUserRequestDto } from '../use-cases/update/update.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserRequestDto): Promise<UserDocument> {
    const user = await this.userModel.create(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    return user;
  }

  async getUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateDto: UpdateUserRequestDto) {
    const foundUser = await this.getUser(id);
    if (!foundUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });

    return updatedUser;
  }
}
