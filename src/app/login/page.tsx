import { Card, CardContent } from "@/components/ui/card";
import { TailwindData } from "@/constants/TailwindData";
import Logo from "@/components/ui/home/Logo";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  return (
    <main className={`min-h-screen ${TailwindData.centered}`}>
      <Card className={`bg-rodeo-surface border-rodeo-bronze/20 p-8 w-full max-w-md ${TailwindData.cardBase}`}>
        <CardContent className={`${TailwindData.centered} flex-col gap-4`}>
          <Logo />
          <div className="text-center">
            <h2 className="text-text font-heading text-2xl mt-2">
              Bem-vindo de volta
            </h2>
            <p className="text-text-muted mt-1">
              Acesse o sistema para gerenciar seus rounds.
            </p>
          </div>

          <form
            className="w-full max-w-xs"
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              type="submit"
            >
              <Image
                src="/github.svg"
                alt="Logo do GitHub"
                width="20"
                height="20"
              />
              Entrar com GitHub
            </Button>
          </form>

          <div className="flex items-center gap-3 w-full max-w-xs my-1">
            <div className="h-px flex-1 bg-rodeo-bronze/30" />
            <span className="text-text-muted text-xs">ou</span>
            <div className="h-px flex-1 bg-rodeo-bronze/30" />
          </div>

          <form
            className="w-full max-w-xs"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button
              className="w-full"
              type="submit"
              size="lg"
              variant="outline"
            >
              <Image
                src="/google.svg"
                alt="Logo do Google"
                width="20"
                height="20"
              />
              Entrar com Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
