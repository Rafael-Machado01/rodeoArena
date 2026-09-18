import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WhatsCardsContent } from "@/constants/WhatsCardsContent";

export default function WhatsCard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {WhatsCardsContent.map((content) => (
        <Card
          key={content.id}
          className="group border-rodeo-gold/15 bg-rodeo-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rodeo-gold/50 hover:shadow-xl hover:shadow-rodeo-gold/10"
        >
          <CardHeader className="gap-4">
            <CardTitle>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-linear-to-br from-rodeo-gold to-rodeo-bronze p-2.5 text-white shadow-md shadow-rodeo-gold/20 transition-transform duration-300 group-hover:scale-110">
                  <content.icon className="size-5" />
                </div>
                <CardDescription className="font-heading text-base font-semibold text-text">
                  {content.title}
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-text-muted">
              {content.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}