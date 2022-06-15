import React from 'react';
import { css } from '@emotion/css';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../types/Sensor';

import { GrafanaTheme, StandardEditorProps } from '@grafana/data';
import { useStyles, Button } from '@grafana/ui';

interface Props extends StandardEditorProps<Sensor[]> {}

const defaultNewSensor: Sensor = {
  name: 'Name',
  query: {
    id: 'A',
    alias: '',
  },
  visible: true,
  backgroundColor: '#000',
  fontColor: '#FFF',
  bold: false,
  link: '',
  position: {
    x: 50,
    y: 50,
  },
  mappingIds: [],
  unit: undefined,
  decimals: 2,
  valueBlink: false,
  iconName: '',
  backgroundBlink: false,
};

export const EditorSensorList: React.FC<Props> = (props: Props) => {
  const { onChange } = props;
  const sensors = props.value;

  const styles = useStyles(getStyles);

  const onSensorChange = (sensor: Sensor, index: number) => {
    sensors[index] = sensor;

    onChange(sensors);
  };

  const onSensorDelete = (index: number) => {
    sensors.splice(index, 1);

    onChange(sensors);
  };

  const addNewSensor = () => {
    sensors.push(defaultNewSensor);

    onChange(sensors);
  };

  return (
    <>
      {/* list of existing sensors */}
      {sensors &&
        sensors.map((sensor: Sensor, index: number) => {
          return (
            <div className={styles.sensorItemWrapperStyle} key={index}>
              <EditorSensorItem sensor={sensor} onChange={onSensorChange} onDelete={onSensorDelete} index={index} />
            </div>
          );
        })}

      <Button className={styles.addButtonStyle} onClick={addNewSensor} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};

const getStyles = (theme: GrafanaTheme) => {
  return {
    sensorItemWrapperStyle: css`
      margin-bottom: 16px;
      padding: 8px;
      background-color: ${theme.colors.bg2};
    `,

    addButtonStyle: css`
      /* margin-left: 8px; */
    `,
  };
};
