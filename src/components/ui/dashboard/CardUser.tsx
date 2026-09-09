import { signOut } from "@/lib/auth";
import type { User as UserType } from "@/types/User";
import Image from "next/image";
import { TailwindData } from "@/constants/TailwindData";
interface CardUserProps {
  user: UserType;
}

export default function CardUser({ user }: CardUserProps) {
  const onLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };
  console.log(user.name);
  return (
    <div
      className={` ${TailwindData.centered} flex-col border-t border-t-rodeo-bronze/50 p-2 gap-2`}
    >
      <div className="flex mt-1 gap-2">
        <Image
          src={user.image}
          alt={`Sua foto de usuário`}
          width={35}
          height={35}
          className="rounded-full object-cover w-9 h-9"
        />
        <div className="flex flex-col">
          <h3 className="text-text">{user.name}</h3>
          <p className="text-text-muted">Administrador</p>
        </div>
        <button className="cursor-pointer" onClick={onLogout}>
          <Image
            src="/logout.svg"
            alt="Botão para deslogar"
            width={18}
            height={20}
          />
        </button>
      </div>
      <button className="flex flex-row gap-1 cursor-pointer">
        <Image
          src="/config.svg"
          alt="Botão de configurações"
          width={20}
          height={20}
          className="fill-text-muted"
        />
        <span className={`text-text-muted hover:text-rodeo-gold text-sm ${TailwindData.transitionHover}`}>
          Configurações
        </span>
      </button>
    </div>
  );
}
