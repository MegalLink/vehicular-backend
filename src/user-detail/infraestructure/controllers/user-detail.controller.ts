import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserDetailService } from '../../application/user-detail.service';
import { CreateUserDetailDto } from '../../application/dto/create-user-detail.dto';
import { UpdateUserDetailDto } from '../../application/dto/update-user-detail.dto';
import { GetUser } from '../../../auth/infraestructure/decorators/get-user.decorator';
import { ResponseUserDbDto } from '../../../auth/application/dto/response-user-db.dto';
import { QueryUserDetailDto } from '../../application/dto/query-user-detail.dto';
import { Auth } from '../../../auth/infraestructure/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/infraestructure/decorators/role-protect.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDetailDbDto } from '../../application/dto/response-user-detail-response-db.dto';
import {
  ErrorBadRequestDto,
  ErrorNotFoundDto,
} from '../../../common/domain/dto/error.dto';

@ApiTags('User Detail')
@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Post()
  @Auth(ValidRoles.user)
  @ApiBody({ type: CreateUserDetailDto })
  @ApiResponse({
    status: 201,
    description: 'Create user detail',
    type: ResponseUserDetailDbDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  create(
    @Body() createUserDetailDto: CreateUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.create(createUserDetailDto, user);
  }

  @Get()
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'Get all user details',
    type: [ResponseUserDetailDbDto],
  })
  findAll(
    @Query() query: QueryUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.findAll(query, user);
  }

  @Get(':id')
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'User details with role user',
    type: ResponseUserDetailDbDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  findOne(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.userDetailService.findOne(id, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'Update user detail',
    type: ResponseUserDetailDbDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  @ApiBody({ type: UpdateUserDetailDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
    @GetUser() user: ResponseUserDbDto,
  ) {
    return this.userDetailService.update(id, updateUserDetailDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'Delete user detail',
    type: ResponseUserDetailDbDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  remove(@Param('id') id: string, @GetUser() user: ResponseUserDbDto) {
    return this.userDetailService.remove(id, user);
  }
}
