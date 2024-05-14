import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center gap-6 items-stretch">
      <Button
        size="lg"
        variant="outline"
        className="text-3xl py-8"
        onClick={() => router.push("/admin/movies")}
      >
        Colors
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="text-3xl py-8"
        onClick={() => router.push("/admin/movies")}
      >
        Movies
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="text-3xl py-8"
        onClick={() => router.push("/admin/movies")}
      >
        Acteurs
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="text-3xl py-8"
        onClick={() => router.push("/admin/movies")}
      >
        Directors
      </Button>
    </div>
  );
}
