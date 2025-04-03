
import { WineCreationData } from '@/data/models/Wine';
import { WineFormData } from '../types';

export const prepareWineData = (newWine: WineFormData): WineCreationData => {
  return {
    ...newWine,
    type: newWine.type || "red",
    region: newWine.region || "Non specificata",
    winery: newWine.winery || "Non specificata",
    grape: newWine.grape || "Non specificato",
    grapes: newWine.grapes.length > 0 ? newWine.grapes : [],
    description: newWine.description || "",
    pairing: newWine.pairing || "",
    storage: newWine.storage || "",
    image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  } as WineCreationData;
};

export const getInitialWineFormData = (): WineFormData => {
  return {
    name: "",
    region: "",
    winery: "",
    year: new Date().getFullYear(),
    rating: 5,
    type: "red",
    image: "",
    grape: "",
    grapes: [],
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato",
    description: "",
    pairing: "",
    storage: ""
  };
};
