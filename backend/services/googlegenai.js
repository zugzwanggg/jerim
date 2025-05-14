import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export const detectLitter = async (image_url) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      "List a few popular cookie recipes, and include the amounts of ingredients.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipeName: {
              type: Type.STRING,
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["recipeName", "ingredients"],
        },
      },
    },
  });
};

import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export const detectLitter = async (image_url) => {
  const response = await fetch(image_url);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      {
        text: `Analyse the provided image. You must analyse all objects within it.\n
            The objects in the image are litter. 
            You must return every object's object_type and object_brand seperately each.\n
            For object_type return what object it is, whether it is a bottle, can or anything else.\n
            For the object_brand return the brand of the object. 
            If it is brandless or unidentifiable, - return "Unknown"\n`,
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            object_type: {
              type: Type.STRING,
              description: "What object this is",
            },
            object_brand: {
              type: Type.STRING,
              description: "Of which brand the object is",
            },
          },
          propertyOrdering: ["object_type", "object_brand"],
        },
      },
    },
  });

  const content = JSON.parse(result.candidates[0].content.parts[0].text);

  return content;
};
