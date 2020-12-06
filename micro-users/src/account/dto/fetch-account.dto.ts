import { IsNumberString } from 'class-validator';
import { PartialFilled } from 'src/shared/partial-filled.model';

export class FetchAccountDto extends PartialFilled<FetchAccountDto> {
  @IsNumberString()
  readonly externalId: string;
}
