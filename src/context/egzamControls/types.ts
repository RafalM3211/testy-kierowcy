import type { Ansewer } from "../../types/globalTypes";

export type SetAnsewerFunction = (ansewer: Exclude<Ansewer, null>) => void;
