import EmailTemplate from "./email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "shemaelyssa@gmail.com",
      to: "eshemaikuzwe@gmail.com",
      subject: "Welcome",
      react: EmailTemplate({ firstname: "shema" }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (e) {
    return Response.json({ e }, { status: 500 });
  }
}
