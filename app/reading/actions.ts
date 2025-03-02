"use server";

import { CreateReadingDto } from "@/utils/dto/CreateReadingDto";
import prisma from "@/utils/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import ActionType from "@/utils/types/ActionType";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createReading(prev: ActionType, formData: FormData) {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const dto = plainToInstance(CreateReadingDto, {
    level: formData.get("level")?.toString() ?? "",
    length: formData.get("length")?.toString() ?? "",
    originUrl: formData.get("originUrl")?.toString() ?? "",
    guestId: formData.get("guestId")?.toString() ?? "",
    ipAddress: forwardedFor ? forwardedFor.split(",")[0] : null
  })

  const errors = await validate(dto);
  if (errors.length > 0) {
    return {
      message: "입력 값이 잘못되었습니다.",
      detail: JSON.stringify(errors),
    } as ActionType;
  }

  const supabase = await createClient();
  const { data: sessionData } = await supabase.auth.getUser();

  if (!sessionData.user && !dto.ipAddress) {
    return {
      message: "IP 검증에 실패했습니다. 로그인 후 이용해주세요.",
      detail: "ipAddress field is null",
    } as ActionType;
  }

  const { id } = await prisma.readings.create({data: {
    original_url: dto.originUrl,
    owner: sessionData.user ? sessionData.user.id : null,
    guest_id: sessionData.user ? null : dto.guestId,
    ip_address: dto.ipAddress,
    level: dto.level,
    length: dto.length,
    status: "PENDING",
    error_reason: null,
    content: null,
  }})

  redirect(`/reading/${id}`);
}
