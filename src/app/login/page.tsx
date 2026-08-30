import { Card, CardContent } from "@/components/ui/card";
import { TailwindData } from "@/constants/TailwindData";
import Logo from "@/components/ui/home/Logo";
export default function Login() {
  return (
    <main className={TailwindData.centered}>
      <Card className="bg-rodeo-surface shadow-2xl border border-rodeo-bronze/20 rounded-md p-5">
        <CardContent className="flex flex-col justify-center items-center">
          <span className="font-normal text-rodeo-warning">Login</span>
          <Logo />

          <h2 className="text-text font-heading text-lg mt-2">
            Bem-vindo de volta
          </h2>
          <p className="text-text-muted">
            Selecione um provedor para continuar.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
