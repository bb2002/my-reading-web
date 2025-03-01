"use server";

import { CreateReadingDto } from "@/utils/dto/CreateReadingDto";
import { createClient } from "@/utils/supabase/server";
import { HttpType } from "@/utils/types/HttpType";
import { validate } from "class-validator";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createReading(prevState: any, formData: FormData) {
  const dto = new CreateReadingDto();
  dto.level = formData.get("level")?.toString() ?? "";
  dto.length = formData.get("length")?.toString() ?? "";
  dto.originUrl = formData.get("originUrl")?.toString() ?? "";
  dto.guestId = formData.get("guestId")?.toString() ?? "";
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : null;

  const errors = await validate(dto);
  if (errors.length > 0) {
    return {
      code: 400,
      message: "입력 값이 잘못되었습니다.",
      detail: JSON.stringify(errors),
    } as HttpType;
  }

  let supabase = await createClient({ admin: true });
  const { data: sessionData } = await supabase.auth.getUser();

  if (!sessionData.user && !ipAddress) {
    return {
      code: 400,
      message: "IP 검증에 실패했습니다. 로그인 후 이용해주세요.",
      detail: "ipAddress field is null",
    };
  }

  supabase = await createClient({ admin: false });
  const { data: readingData, error } = await supabase
    .from("readings")
    .insert([
      {
        original_url: dto.originUrl,
        owner: sessionData.user ? sessionData.user.id : null,
        guest_id: sessionData.user ? null : dto.guestId,
        ip_address: ipAddress,
        level: dto.level,
        length: dto.length,
        status: "PENDING",
        error_reason: null,
        content: null,
      },
    ])
    .select();

  console.log(error);
  if (error || readingData.length !== 1) {
    return {
      code: 500,
      message: "InternalServerError",
      detail: JSON.stringify(error),
    };
  }

  redirect(`/reading/${readingData[0].id}`);
}
