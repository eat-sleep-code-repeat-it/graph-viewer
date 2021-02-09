import { CytoNodeShape } from './cyto-node-shape';

export class CytoNode {
  id: string;
  name: string;
  weight: number;
  colorCode: string;
  shapeType: CytoNodeShape;
}