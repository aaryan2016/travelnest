import { Button } from "@/components/ui/button";
import { createPropertyAction, createUserAction } from "@/server/action";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Button
        onClick={createUserAction}
      >Create User</Button>
      <Button
        onClick={createPropertyAction}
      >Create Property</Button>
    </div>

  );
}
