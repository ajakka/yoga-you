import { PoseType } from "./PoseType";

export type Exercise = {
  name: string;
  description: string;
  poses: PoseType[];
  totalTime: string;
};
