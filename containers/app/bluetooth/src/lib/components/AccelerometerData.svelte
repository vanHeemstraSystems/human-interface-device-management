<script lang="ts">
  import { onMount } from 'svelte';
  import { Axis } from '$lib/models/accelerator-data.model';
  import { TransformUtil } from '$lib/util/transform.util';
  import { CanvasUtil } from '$lib/util/canvas.util';
  import { Constants } from '$lib/constants/constants';
  import { UUIDs } from '$lib/constants/ble-uuids';
  import type { AccelerometerData } from '$lib/models/accelerator-data.model';
  import type { NormalizedData } from '$lib/models/normalized-data.model';

  export let gattServer: BluetoothRemoteGATTServer;

  let wrappingDiv: HTMLDivElement;
  let context: CanvasRenderingContext2D;

  let data: AccelerometerData[] = [];

  onMount(() => {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = Constants.CanvasWidth;
    newCanvas.height = Constants.CanvasHeight;
    newCanvas.setAttribute('class', 'bg-gray-200 rounded-lg');
    wrappingDiv.appendChild(newCanvas);
    context = newCanvas.getContext('2d');
    subscribeToAccelerometerCharacteristic();
  });

  function redrawData(): void {
    context.clearRect(0, 0, Constants.CanvasWidth, Constants.CanvasHeight);
    const normalizedDataX = normalizeAxis(data, Axis.x);
    context.fillStyle = '#003f5c';
    context.strokeStyle = '#003f5c';
    CanvasUtil.drawCanvas(normalizedDataX, context);
    const normalizedDateY = normalizeAxis(data, Axis.y);
    context.fillStyle = '#bc5090';
    context.strokeStyle = '#bc5090';
    CanvasUtil.drawCanvas(normalizedDateY, context);
    const normalizedDataZ = normalizeAxis(data, Axis.z);
    context.fillStyle = '#ffa600';
    context.strokeStyle = '#ffa600';
    CanvasUtil.drawCanvas(normalizedDataZ, context);
  }

  async function subscribeToAccelerometerCharacteristic(): Promise<void> {
    try {
      const accService = await gattServer.getPrimaryService(UUIDs.AccelerometerServiceUUID);
      const accConfigCharacteristic = await accService.getCharacteristic(
        UUIDs.AccelerometerConfigUUID
      );
      await accConfigCharacteristic.writeValue(new Uint8Array([1]));
      const accPeriodCharacteristic = await accService.getCharacteristic(
        UUIDs.AccelerometerPeriodUUID
      );
      await accPeriodCharacteristic.writeValue(new Uint8Array([Constants.Interval]));
      const accDataCharacteristic = await accService.getCharacteristic(UUIDs.AccelerometerDataUUID);
      console.log('Start Accelerometer notifications');
      accDataCharacteristic.oncharacteristicvaluechanged = onAccelerometerChanged;
      accDataCharacteristic.startNotifications();
    } catch (e) {
      console.error(e);
    }
  }

  function getAccelerometerValues(data) {
    const ax = data.getInt8(0);
    const ay = data.getInt8(1);
    const az = data.getInt8(2);
    return { x: ax, y: ay, z: az };
  }

  function onAccelerometerChanged(event) {
    const characteristic = event.target;
    const values = getAccelerometerValues(characteristic.value);
    data = data.slice(-19).concat(values);
    redrawData();
  }

  function normalizeAxis(data: AccelerometerData[], axis: Axis): NormalizedData {
    const axisData = data.map((point) => point[axis]);
    return TransformUtil.normalizeData(axisData, -128, 127);
  }
</script>

<div class="my-4 flex-2">
  <h2 class="text-xl mb-2">Accelerometer Data</h2>
  <div class="flex flex-row gap-2" bind:this={wrappingDiv} style="height: 564px;" />
</div>
