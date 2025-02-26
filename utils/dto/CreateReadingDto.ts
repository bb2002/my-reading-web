import { IsNotEmpty, IsIn, IsUrl, IsUUID } from "class-validator";
import { LengthRowJLPT, LevelRows } from "../types/ReadingPromptOptions";

export class CreateReadingDto {
  @IsNotEmpty({ message: "level은 필수 값입니다." })
  @IsIn(LevelRows.map((row) => row.key), {
    message: "유효한 level 값이 아닙니다.",
  })
  level: string;

  @IsNotEmpty({ message: "length는 필수 값입니다." })
  @IsIn(LengthRowJLPT.map((item) => item.key), {
    message: "유효한 length 값이 아닙니다.",
  })
  length: string;

  @IsNotEmpty({ message: "originUrl은 필수 값입니다." })
  @IsUrl({}, { message: "originUrl은 유효한 URL이어야 합니다." })
  originUrl: string;

  @IsNotEmpty({ message: "guestId는 필수 값입니다." })
  @IsUUID("4", { message: "guestId는 유효한 UUID v4 형식이어야 합니다." })
  guestId: string;
}
