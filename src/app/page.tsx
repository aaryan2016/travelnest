import { Button } from "@/components/ui/button";
import { createAllAction } from "@/server/action";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* <Button
        onClick={createUserAction}
      >Create User</Button>
      <Button
        onClick={createPropertyAction}
      >Create Property</Button> */}
      <Button
        onClick={createAllAction}
      >Create All data</Button>
    </div>

  );
}
