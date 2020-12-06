import { IsNumberString } from 'class-validator';
import { PartialFilled } from 'src/shared/partial-filled.model';

export class FindAccountDto extends PartialFilled<FindAccountDto> {
  @IsNumberString()
  readonly id: string;
}
