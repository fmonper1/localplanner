export interface Collection {
  type: string;
  name: string;
  crs: Crs;
  features: Feature[];
}

export interface Crs {
  type: string;
  properties: CrsProperties;
}

export interface CrsProperties {
  name: string;
}

export interface Feature {
  type: FeatureType;
  properties: FeatureProperties;
  geometry: Geometry;
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export interface FeatureProperties {
  Name: string;
  description: null | string;
}

export enum FeatureType {
  Feature = "Feature",
}
