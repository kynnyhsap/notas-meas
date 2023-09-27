import { wait } from "~/utils/wait";
import nodemailer from "nodemailer";

export const MY_CLIPPINGS_FILE_NAME = "My Clippings.txt";
export const MY_CLIPPINGS_FILE_PATH = `/Volumes/Kindle/documents/${MY_CLIPPINGS_FILE_NAME}`;

const READWISE_EMAIL = "add@readwise.io";
const MY_EMAIL = "tobirawork@gmail.com";

async function sendMyClippingsToReadwise() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MY_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return await transporter.sendMail({
    from: MY_EMAIL,
    to: READWISE_EMAIL,
    subject: MY_CLIPPINGS_FILE_NAME,
    text: "",
    attachments: [
      {
        filename: MY_CLIPPINGS_FILE_NAME,
        path: MY_CLIPPINGS_FILE_PATH,
      },
    ],
  });
}

async function spy() {
  let sentToReadwise = false;

  console.debug(`Starting Kindle spy...`);

  while (true) {
    const isKindleConnected = await Bun.file(MY_CLIPPINGS_FILE_PATH).exists();

    console.debug(
      `Kindle is ${isKindleConnected ? "connected" : "disconnected"}.`,
    );

    if (isKindleConnected) {
      if (!sentToReadwise) {
        try {
          console.debug(
            `Sending ${MY_CLIPPINGS_FILE_NAME} to Readwise email...`,
          );

          const info = await sendMyClippingsToReadwise();

          console.debug(`Sent ${MY_CLIPPINGS_FILE_NAME} to Readwise.`, info);

          sentToReadwise = true;
        } catch (error) {
          console.error(
            `Failed to send ${MY_CLIPPINGS_FILE_NAME} to Readwise.`,
            error,
          );

          await fetch("https://ntfy.sh/kindle_my_clippings", {
            method: "POST",
            body: `Failed to send ${MY_CLIPPINGS_FILE_NAME} to Readwise.`,
          }).catch(console.error);
        }
      } else {
        console.debug(
          `${MY_CLIPPINGS_FILE_NAME} already sent to Readwise, skipping until next re-connect.`,
        );
      }
    } else {
      sentToReadwise = false;
    }

    await wait(3000);
  }
}

await spy();
