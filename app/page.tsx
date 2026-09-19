import { redirect } from "next/navigation";

// The stock create-next-app starter page never got replaced with the
// prototype's own entry point -- app/recall/permission is the actual
// first screen (it also serves as the F5 intro, per voice-ux.md).
export default function Home() {
  redirect("/recall/permission");
}
