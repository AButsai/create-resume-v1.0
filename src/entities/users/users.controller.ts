import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { Response } from 'express';
import { UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Current user
  @ApiOperation({ summary: 'Current user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiResponse({ status: 200, type: '' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Get('current')
  public async currentUser(@Req() req: MyRequest) {
    const { user, accessToken, refreshToken } = await this.userService.current(
      req.user.email,
    );
    return {
      refreshToken,
      accessToken,
      user,
    };
  }

  // Update user
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiResponse({ status: 200, type: '' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch('update')
  public async updateUser(
    @Req() req: MyRequest,
    @Res() res: Response,
    @Body() body: UpdateUserDto,
  ) {
    const { user, accessToken, refreshToken } = await this.userService.update(
      req.user.id,
      body,
    );
    return {
      refreshToken,
      accessToken,
      user,
    };
  }
}
