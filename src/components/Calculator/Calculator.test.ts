import { getFormData, getDrillSpeed, getDrillPowerReq, getDrillPowerOutput, getDrillNumber, getGenNumber } from './Calculator.helpers';
import { getMockFormData, mockData } from './Calculator.mock';

describe("Get and parse data", () => {
  it("should get formData right", () => {
    expect(getFormData(getMockFormData())).toEqual(mockData);
  })
})

describe("Calculator methods", () => {
  it("should calculate drill speed", () => {
    expect(getDrillSpeed({ basicSpeed: 0.5, speedMod: 0.25 })).toBe(0.625);
  })

  it("should calculate drill power req", () => {
    expect(getDrillPowerReq({ basicPowerReq: 0.125, consMod: 1.5, effMod: 0.5 })).toBe(0.25);
  })

  it("should calculate drill power output", () => {
    expect(getDrillPowerOutput(mockData)).toBe(2.625);
  })

  it("should calculate drill number", () => {
    expect(getDrillNumber(mockData)).toBe(4);
  })

  it("should calculate generators number", () => {
    expect(getGenNumber(mockData)).toBe(6);
  })
})