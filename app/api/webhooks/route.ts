import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { createUser, deleteUser, updateUser } from "@/actions/user-logic";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { userRoleEnum } from "@/db/schema";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  if (eventType === "user.created") {
    const { username, id, image_url, first_name, last_name } = evt.data;

    const role: "USER" | "ADMIN" = "USER"; // or "ADMIN" depending on the user role

    const user = {
      id,
      username,
      avatar: image_url,
      firstName: first_name,
      lastName: last_name,
      createAt: new Date(),
      updateAt: new Date(),
      role,
    };

    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id,
        },
      });
    }

    return NextResponse.json({ message: "new users created", user: newUser });
  }

  if (eventType === "user.updated") {
    const { username, id, image_url, first_name, last_name } = evt.data;

    const role: "USER" | "ADMIN" = "USER"; // or "ADMIN" depending on the user role

    const exitsUser = {
      id,
      username,
      avatar: image_url,
      firstName: first_name,
      lastName: last_name,
      createAt: new Date(),
      updateAt: new Date(),
      role,
    };

    const update_user = await updateUser(exitsUser);

    if (update_user) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: exitsUser.id,
        },
      });
    }

    return NextResponse.json({ message: "new users created", user: exitsUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      throw new Error("no fucking user");
    }
    await deleteUser(id);

    await clerkClient.users.deleteUser(id);

    redirect("/");
  }
  //   console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  //   console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
