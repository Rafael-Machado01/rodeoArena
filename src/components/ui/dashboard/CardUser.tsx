import { signOut } from "@/lib/auth";
import type { User as UserType } from "@/types/User";
import Image from "next/image";
import { TailwindData } from "@/constants/TailwindData";
interface CardUserProps {
  user: UserType;
}
import EditProfile from "@/components/ui/dashboard/EditProfile";

export default function CardUser({ user }: CardUserProps) {
  const onLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <div
      className={` ${TailwindData.centered} flex-col border-t border-t-rodeo-bronze/50 p-2 gap-2`}
    >
      <div className="flex mt-1 gap-2">
        {user.image ? (
          <Image
            src={user.image}
            alt={`Sua foto de usuário`}
            width={35}
            height={35}
            className="rounded-full object-cover w-9 h-9"
          />
        ) : (
          <div
            className={`flex w-9 h-9 items-center justify-center rounded-full bg-rodeo-bronze/30 text-text text-sm ${TailwindData.centered}`}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-text">{user.name}</h3>
          <p className="text-text-muted">{user.role || "Admin"}</p>
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
      <EditProfile user={user} />
    </div>
  );
}
