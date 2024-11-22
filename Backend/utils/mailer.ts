import { log } from "console";
import { CustomLogger } from "../logger";
import * as nodemailer from "nodemailer";

export class Mailer {
  private transporter: nodemailer.Transporter;
  private logger: CustomLogger;
  private isDev: boolean;
  public static instance: Mailer;

  constructor() {
    this.logger = new CustomLogger();
    this.isDev = (process.env.NODE_ENV ?? "dev") === "dev";
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 5,
    });
    this.logger.log("Mailer initialized");
  }

  sendMail(
    email: string[],
    subject: string = "",
    text: string = "",
    cc: string[] = [],
    bcc: string[] = []
  ) {
    if (this.isDev) {
      this.logger.log("subject:", subject, ", Email sent:", text);
    }
    if (email.length === 0) {
      email.push(`${process.env.EMAIL}`);
      subject = "Revert:" + subject;
    }
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
      cc: cc,
      bcc: bcc,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error(error);
        return;
      }
      if (info.rejected.length > 0) {
        this.logger.error("Email not sent: ", email, cc, bcc);
        return;
      }
      this.logger.log("Email sent: " + info.response);
    });
  }

  sendToRoll(roll: number[], subject: string, text: string) {
    const rollMail = roll.map(
      (r) => `${process.env.EMAIL_PREFIX}${r}@${process.env.EMAIL_DOMAIN}`
    );
    const fromMail = process.env.EMAIL;
    const username_fromMail = fromMail?.split("@")[0];
    const domain_fromMail = fromMail?.split("@")[1];
    const to_mail = `${username_fromMail}+testdefault@${domain_fromMail}`;

    this.sendMail([to_mail], subject, text, rollMail);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Mailer();
    }
    return this.instance;
  }
}
