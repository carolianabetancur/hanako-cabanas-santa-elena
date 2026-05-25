import { assist } from "@sanity/assist";
import { cabinSchema } from "../schemas/documents/cabin";

export const assistWithPresets = () =>
  assist({
    __presets: {
      [cabinSchema.name]: {
        fields: [
          {
            path: "description",
            instructions: [
              {
                _key: "preset-instruction-1",
                title: "Generar descripción de la cabaña",
                icon: "block-content",
                prompt: [
                  {
                    _key: "prompt-block-1",
                    _type: "block",
                    style: "normal",
                    markDefs: [],
                    children: [
                      {
                        _key: "prompt-span-1",
                        _type: "span",
                        marks: [],
                        text: "Genera una descripción atractiva y cálida para una cabaña llamada ",
                      },
                      {
                        path: "name",
                        _type: "sanity.assist.instruction.fieldRef",
                        _key: "prompt-ref-1",
                      },
                      {
                        _key: "prompt-span-2",
                        _type: "span",
                        marks: [],
                        text: " ubicada en Santa Elena, Medellín. Resalta la naturaleza, la tranquilidad y la experiencia de hospedarse allí. Máximo 3 oraciones.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  });