export interface IGridSettings {
  reqPower: number;
}

export interface IDrillSettings {
  drillSpeed: number;
  drillPowerReq: number;
  drillSpeedMod?: number;
  drillEffMod?: number;
  drillConsMod?: number;
}

export interface IFuelSettings {
  fuelCapacity: number;
}

export interface IGenSettings {
  genOutput: number;
  genEff?: number;
}

export interface IAllSettings extends IGridSettings, IDrillSettings, IFuelSettings, IGenSettings {};