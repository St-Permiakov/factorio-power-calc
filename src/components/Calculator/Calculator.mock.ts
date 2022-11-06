import { IAllSettings } from './Calculator.types';

export const mockData: IAllSettings = {
  drillSpeed: 0.5,
  drillPowerReq: 0.25,
  fuelCapacity: 5,
  genOutput: 2,
  reqPower: 10,
  drillConsMod: 1.5,
  drillEffMod: 0.5,
  drillSpeedMod: 0.25,
  genEff: 1
}

export const getMockFormData = () => {
  const mockFormData = new FormData();

  mockFormData.append('drill:speed', '0.5');
  mockFormData.append('drill:powerReq', '0.25');
  mockFormData.append('fuelCapacity', '5');
  mockFormData.append('gen:output', '2');
  mockFormData.append('reqPower', '10');
  mockFormData.append('drill:consMod', '150');
  mockFormData.append('drill:effMod', '50');
  mockFormData.append('drill:speedMod', '25');
  mockFormData.append('genEff', '1');

  return mockFormData;
}