import Salable from "@salable/node-sdk";
import {salableApiKey} from "./environment";

export const salable = new Salable(salableApiKey, 'v2')