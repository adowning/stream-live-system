import {
  Controller,
  Get,
  Param,
  UseFilters,
  NotFoundException,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './entity/account.entity';
import { FetchAccountDto, FindAccountDto } from './dto';
import { AccountExceptionFilter } from './account-exception.filter';

@Controller('account')
@UseFilters(new AccountExceptionFilter())
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/')
  list() {
    return this.accountService.list();
  }

  @Get('/:id')
  async find(@Param() findAccountDto: FindAccountDto): Promise<Account> {
    const account = await this.accountService.findById(findAccountDto.id);
    if (!account) {
      throw new NotFoundException();
    }
    return account;
  }

  @Post('/fetch')
  @HttpCode(HttpStatus.NO_CONTENT)
  async fetch(@Body() fetchAccountDto: FetchAccountDto) {
    await this.accountService.fetchByExternalId(fetchAccountDto.externalId);
  }
}
