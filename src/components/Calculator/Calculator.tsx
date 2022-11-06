import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './Calculator.module.css';
import { getDrillNumber, getFormData, getGenNumber } from './Calculator.helpers';
import { ResultItem } from '../ResultItem/ResultItem';

export const Calculator = () => {
  const formRef = useRef<HTMLFormElement>();

  const [drillNumber, setDrillNumber] = useState(0);
  const [genNumber, setGenNumber] = useState(0);

  const handleFormChange = useCallback(() => {
    const data = getFormData(new FormData(formRef.current));
    setDrillNumber(getDrillNumber(data));
    setGenNumber(getGenNumber(data));
  }, []);

  const handleFormSubmit = useCallback((e: SubmitEvent) => {
    e.preventDefault();
    handleFormChange();
  }, [handleFormChange])

  const addListenerToFormRef = useCallback((el: HTMLFormElement) => {
    if (el) {
      el.addEventListener('change', handleFormChange, { capture: true });
      el.addEventListener('submit', handleFormSubmit);
      formRef.current = el;
    }
  }, [handleFormChange]);

  useEffect(() => {
    return () => {
      formRef.current?.removeEventListener('change', handleFormChange);
      formRef.current?.removeEventListener('submit', handleFormSubmit);
    }
  }, [])

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <h2 className={styles.sectionHeader}>Settings</h2>
        <div className={styles.sectionItems}>
          <form action="#" ref={addListenerToFormRef} className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend>Power Grid Settings</legend>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="reqPower" aria-required>Required Power Output</label>
                <input type="number" name="reqPower" id="reqPower" step=".01" required />
                <span className={styles.unit}>MW</span>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Drill Settings</legend>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="drill:speed" aria-required>Speed</label>
                <input type="number" name="drill:speed" id="drill:speed" step=".01" required />
                <span className={styles.unit}>item / s</span>
              </div>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="drill:powerReq" aria-required>Power Requirements</label>
                <input type="number" name="drill:powerReq" id="drill:powerReq" step=".001" required/>
                <span className={styles.unit}>MW</span>
              </div>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="drill:speedMod">Speed Modifier</label>
                <input type="number" name="drill:speedMod" id="drill:speedMod" />
                <span className={styles.unit}>%</span>
              </div>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="drill:consMod">Consumption Modifier</label>
                <input type="number" name="drill:consMod" id="drill:consMod" />
                <span className={styles.unit}>%</span>
              </div>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="drill:effMod">Efficiency Modifier</label>
                <input type="number" name="drill:effMod" id="drill:effMod" />
                <span className={styles.unit}>%</span>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Fuel Settings</legend>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="fuelCapacity" aria-required>Fuel Energy Capacity</label>
                <input type="number" name="fuelCapacity" id="fuelCapacity" step=".01" required />
                <span className={styles.unit}>MJ</span>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Gen Settings</legend>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="gen:output" aria-required>Generator Max Output</label>
                <input type="number" name="gen:output" id="gen:output" step=".01" required />
                <span className={styles.unit}>MW</span>
              </div>
              <div className={styles.fieldsetItem}>
                <label className={styles.label} htmlFor="gen:eff">Generator Efficiency</label>
                <input type="number" name="gen:eff" id="gen:eff" />
                <span className={styles.unit}>%</span>
              </div>
            </fieldset>

            <input type="submit" hidden />
          </form>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeader}>Result</h2>
        <div className={styles.sectionItems}>
          {!!drillNumber && <ResultItem label="Drill Number Required" value={drillNumber} />}
          {!!genNumber && <ResultItem label="Gen Number Required" value={genNumber} />}
        </div>
      </section>
    </div>
  );
}