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
import { SparePartService } from '../../application/spare_part.service';
import { CreateSparePartDto } from '../../application/dto/create_spare_part.dto';
import { UpdateSparePartDto } from '../../application/dto/update_spare_part.dto';
import { QuerySparePartDto } from '../../application/dto/query_spare_part.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/decorators/role-protect.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseSparePartDto } from '../../application/dto/response_spare_part.dto';
import { GetAllResponseSparePartDto } from '../../application/dto/get_all_response_spare_part.dto';
import {
  ErrorBadRequestDto,
  ErrorNotFoundDto,
} from '../../../common/domain/dto/error.dto';

@ApiTags('Spare Part')
@Controller('spare-part')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateSparePartDto })
  @ApiResponse({
    status: 201,
    description: 'Spare part created',
    type: ResponseSparePartDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request response',
    type: ErrorBadRequestDto,
  })
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.sparePartService.create(createSparePartDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all spare parts with pagination',
    type: GetAllResponseSparePartDto,
  })
  async findAll(@Query() queryDto: QuerySparePartDto) {
    return this.sparePartService.findAll(queryDto);
  }

  @Get(':searchParam')
  @ApiResponse({
    status: 200,
    description: 'Update spare part',
    type: ResponseSparePartDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  findOne(@Param('searchParam') searchParam: string) {
    return this.sparePartService.findOne(searchParam);
  }

  @Patch(':searchParam')
  @ApiResponse({
    status: 200,
    description: 'Update spare part',
    type: ResponseSparePartDto,
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
  @ApiBody({ type: UpdateSparePartDto })
  @Auth(ValidRoles.admin, ValidRoles.employee)
  update(
    @Param('searchParam') searchParam: string,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ) {
    return this.sparePartService.update(searchParam, updateSparePartDto);
  }

  @Delete(':searchParam')
  @ApiResponse({
    status: 200,
    description: 'Delete spare part',
    type: ResponseSparePartDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found item _id',
    type: ErrorNotFoundDto,
  })
  @Auth(ValidRoles.admin, ValidRoles.employee)
  remove(@Param('searchParam') searchParam: string) {
    return this.sparePartService.remove(searchParam);
  }
}
