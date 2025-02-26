"use server";

import { CreateReadingDto } from "@/utils/dto/CreateReadingDto";
import { HttpType } from "@/utils/types/HttpType";
import { validate } from "class-validator";

export async function createReading(prevState: any, formData: FormData) {
  const dto = new CreateReadingDto();
  dto.level = formData.get("level")?.toString() ?? "";
  dto.length = formData.get("length")?.toString() ?? "";
  dto.originUrl = formData.get("originUrl")?.toString() ?? "";
  dto.guestId = formData.get("guestId")?.toString() ?? "";

  const errors = await validate(dto);
  if (errors.length > 0) {
    return {
      code: 400,
      message: "ValidationFailed",
      detail: JSON.stringify(errors),
    } as HttpType;
  }
}
