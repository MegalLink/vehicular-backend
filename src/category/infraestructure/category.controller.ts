import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from '../application/category.service';
import { CreateCategoryDto } from '../domain/dto/create-category.dto';
import { UpdateCategoryDto } from '../domain/dto/update-category.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../auth/decorators/role-protect.decorator';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorNotFoundDto, ErrorBadRequestDto } from '../../common/error.dto';
import { ResponseCategoryDto } from '../domain/dto/response-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category successfully created',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: ErrorBadRequestDto,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
    type: [ResponseCategoryDto],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a category by ID',
    type: ResponseCategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
    type: ErrorNotFoundDto,
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category successfully updated',
    type: ResponseCategoryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: ErrorBadRequestDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
    type: ErrorNotFoundDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.employee)
  @ApiResponse({
    status: 200,
    description: 'Category successfully deleted',
    type: ResponseCategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
    type: ErrorNotFoundDto,
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
