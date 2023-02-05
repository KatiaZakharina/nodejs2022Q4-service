import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsPositive()
  duration: number; // integer number
}
