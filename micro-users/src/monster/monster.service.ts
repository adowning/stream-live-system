import { Injectable, HttpService } from '@nestjs/common';
import { MonsterAccount } from './monsteraccount.model';
import { HttpIntegrationService } from 'src/shared/http-integration.service';

@Injectable()
export class MonsterService extends HttpIntegrationService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async findAccountsTotal(): Promise<number> {
    const response = await this.httpService
      .get<any[]>(`/accounts?/Fields=accountID`)
      .toPromise();
    return response.data['count'];
  }

  async findAccounts(pageCount): Promise<MonsterAccount[]> {
    const pages = Array(pageCount)
      .fill(0)
      .map((d, i) => i);
    // const response = await this.httpService
    //   .get<any[]>(`?pageIndex=${pages}&limit=100`)
    //   .toPromise();
    // const request = pageNumber =>
    //   this.httpService(
    //     `/accounts?pageIndex=${pageNumber}&limit=100`,
    //   ).then(response => response.json());
    const request = pageNumber =>
      this.httpService
        .get<any[]>(`/accounts?pageIndex=${pageNumber}&limit=100`)
        .toPromise();

    const { error, data } = await batchRequest(pages, request, {
      batchSize: 20,
      // options: options,
      delay: 500,
    });
    return data['items'].map(item => new MonsterAccount(item));
  }

  async findAccount(id: string): Promise<MonsterAccount> {
    try {
      const response = await this.httpService
        .get<any>(`/accounts/${id}`)
        .toPromise();
      return new MonsterAccount(response.data);
    } catch (err) {
      if (this.isNotFoundError(err)) {
        return null;
      }
      throw err;
    }
  }
}
