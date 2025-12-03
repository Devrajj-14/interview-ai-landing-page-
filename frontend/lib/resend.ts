import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "re_D2tvX6Qg_MZfc63xGUGi5QQTgJcPFJiqd");
