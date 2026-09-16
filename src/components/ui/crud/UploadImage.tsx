import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { TailwindData } from "@/constants/TailwindData";
import { useEdgeStore } from "@/lib/edgestore";

interface UploadImageProps {
  onImageChange: (url: string | null) => void;
}

export default function UploadImage({ onImageChange }: UploadImageProps) {
  const [newImage, setNewImage] = useState<null | string>(null);

  const { edgestore } = useEdgeStore();

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await edgestore.publicFiles.upload({
      file,
    });

    setNewImage(res.url);
    onImageChange(res.url);
  };
  return (
    <Field>
      <Label
        htmlFor="image"
        className={` ${TailwindData.centered} cursor-pointer`}
      >
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image"
          className="hidden"
          onChange={onUploadFile}
        />

        <div className="relative">
          {newImage && (
            <Image
              src={newImage}
              alt="Foto do Animal"
              width={56}
              height={56}
              className="h-14 w-14 object-cover rounded-full"
            />
          )}
          <Plus className="bg-black/30 rounded-full" />
        </div>
      </Label>
    </Field>
  );
}
