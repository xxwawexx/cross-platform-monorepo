import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        doctorProfile: {
          select: {
            specialization: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<PublicUser> {
    const salt = await bcrypt.genSalt();

    if (typeof data.password !== 'string') {
      throw new Error('Password must be a string.');
    }
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userData: Prisma.UserCreateInput = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      doctorProfile: data.doctorProfile,
      password: hashedPassword,
    };

    return this.prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
