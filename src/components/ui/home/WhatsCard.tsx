import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TailwindData } from "@/constants/TailwindData";
import { WhatsCardsContent } from "@/constants/WhatsCardsContent";

export default function WhatsCard() {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      {WhatsCardsContent.map((content) => (
        <Card
          key={content.id}
          className={`bg-rodeo-bg border-text-muted/20 w-[300] h-[160] p-2 ${TailwindData.cardBase}`}
        >
          <CardHeader>
            <CardTitle>
              <div className={TailwindData.centered}>
                <div className=" p-2 rounded-sm bg-rodeo-warning/35 mr-2">
                  <content.icon className="text-rodeo-warning" />
                </div>
                <div>
                  <CardDescription className="text-text">
                    {content.title}
                  </CardDescription>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-muted">{content.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
