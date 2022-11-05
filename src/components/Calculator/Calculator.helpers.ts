import { IAllSettings } from './Calculator.types';

export const getFormData = (formData: FormData): IAllSettings => ({
  reqPower: Number(formData.get('reqPower')),
  drillSpeed: Number(formData.get('drill:speed')),
  drillPowerReq: Number(formData.get('drill:powerReq')),
  drillSpeedMod: Number(formData.get('drill:speedMod') || 0) / 100,
  drillConsMod: Number(formData.get('drill:consMod') || 0) / 100,
  drillEffMod: Number(formData.get('drill:effMod') || 0) / 100,
  fuelCapacity: Number(formData.get('fuelCapacity')),
  genOutput: Number(formData.get('gen:output')),
  genEff: Number(formData.get('gen:eff') || 100) / 100,
})

interface IGetDrillPowerReqProps {
  basicPowerReq: number;
  consMod?: number;
  effMod?: number;
};
const getDrillPowerReq = ({
  basicPowerReq,
  consMod = 0,
  effMod = 0
}: IGetDrillPowerReqProps): number => {
  const result = basicPowerReq + basicPowerReq * consMod - basicPowerReq * effMod;
  // power consumption cannot be less than 20%
  return result >= basicPowerReq * 0.2 ? result : basicPowerReq * 0.2;
}

interface IGetDrillSpeedProps {
  basicSpeed: number;
  speedMod?: number;
}
const getDrillSpeed = ({
  basicSpeed,
  speedMod = 0
}: IGetDrillSpeedProps): number => basicSpeed + basicSpeed * speedMod;

export const getDrillPowerOutput = ({
  drillSpeed,
  drillPowerReq,
  fuelCapacity,
  genEff = 1,
  drillSpeedMod = 0,
  drillEffMod = 0,
  drillConsMod = 0,
}: Omit<IAllSettings, 'reqPower'>): number => {
  return getDrillSpeed({ basicSpeed: drillSpeed, speedMod: drillSpeedMod }) * fuelCapacity * genEff - getDrillPowerReq({ basicPowerReq: drillPowerReq, consMod: drillConsMod, effMod: drillEffMod });
}

export const getDrillNumber = ({
  reqPower, ...rest
}: IAllSettings): number => {
  return Math.ceil(reqPower / getDrillPowerOutput(rest));
}

interface IGetDrillInfoReturns {
  drillPowerOutput: number;
  drillNumber: number;
  drillPowerReq: number;
}
export const getDrillInfo = (props: IAllSettings): IGetDrillInfoReturns => ({
  drillPowerOutput: getDrillPowerOutput(props),
  drillPowerReq: getDrillPowerReq({ basicPowerReq: props.drillPowerReq, consMod: props.drillConsMod, effMod: props.drillEffMod }),
  drillNumber: getDrillNumber(props),
})

export const getGenNumber = (props: IAllSettings): number => {
  const { reqPower, genOutput, drillPowerReq } = props;
  const drillTotalPowerDrain = getDrillNumber(props) * getDrillInfo(props).drillPowerReq;
  console.log(drillTotalPowerDrain);

  return Math.ceil((reqPower + drillTotalPowerDrain) / genOutput);
}