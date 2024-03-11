import { useEffect, useRef } from 'react';

interface DeviceModelMap {
  [key: number]: number;
}
const DEVICE_MODEL_MAP: DeviceModelMap = {
  0x06c1: 380,
  0x06c3: 380,
  0x0dc8: 300,
  0x0dc9: 300,
};

interface Endpoint {
  in: number;
  out: number;
}

interface ReadIdmEvent {
  idm: string;
}

export const usePasoriEvent = (subscribeIdm: (idm: string) => any) => {
  const endpointRef = useRef<Endpoint>();
  const isStarted = useRef(false);
  const lastIdm = useRef<string>();

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const paddingZero = (num: string, p: number) => {
    return ('0'.repeat(p * 1) + num).slice(-(p * 1));
  };

  const dec2HexString = (n: number) => {
    return paddingZero((n * 1).toString(16).toUpperCase(), 2);
  };

  const getPaori = async () => {
    const pairedDevice = await navigator.usb.getDevices();
    const pairedPasori = pairedDevice.find((d) => d.vendorId === 0x054c);

    if (pairedPasori) return pairedPasori;

    const pasori = await requestPasori();
    return pasori;
  };

  const requestPasori = async () => {
    const pasoriFilter = Object.keys(DEVICE_MODEL_MAP).map((productId) => ({
      vendorId: 0x054c,
      productId: parseInt(productId),
    }));
    const device = await navigator.usb.requestDevice({ filters: pasoriFilter });
    return device;
  };

  const send = async (device: USBDevice, data: number[]) => {
    if (!endpointRef.current) throw new Error('Endpoint not initialized');

    const uint8a = new Uint8Array(data);
    await device.transferOut(endpointRef.current.out, uint8a);
    await sleep(10);
  };

  const receive = async (device: USBDevice, len: number) => {
    if (!endpointRef.current) throw new Error('Endpoint not initialized');

    const data = await device.transferIn(endpointRef.current.in, len);
    if (!data.data) throw new Error('Transfer failed');

    await sleep(10);
    const arr = [];
    const arr_str = [];

    for (let i = data.data.byteOffset; i < data.data.byteLength; i++) {
      arr.push(data.data.getUint8(i));
      arr_str.push(dec2HexString(data.data.getUint8(i)));
    }

    return arr;
  };

  const session380 = async (device: USBDevice) => {
    await send(device, [0x00, 0x00, 0xff, 0x00, 0xff, 0x00]);
    await send(device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x2a, 0x01, 0xff, 0x00]);
    await receive(device, 6);
    await receive(device, 13);

    await send(device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x06, 0x00, 0x24, 0x00]);
    await receive(device, 6);
    await receive(device, 13);

    await send(device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x06, 0x00, 0x24, 0x00]);
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [0x00, 0x00, 0xff, 0xff, 0xff, 0x06, 0x00, 0xfa, 0xd6, 0x00, 0x01, 0x01, 0x0f, 0x01, 0x18, 0x00]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [
        0x00, 0x00, 0xff, 0xff, 0xff, 0x28, 0x00, 0xd8, 0xd6, 0x02, 0x00, 0x18, 0x01, 0x01, 0x02, 0x01, 0x03, 0x00,
        0x04, 0x00, 0x05, 0x00, 0x06, 0x00, 0x07, 0x08, 0x08, 0x00, 0x09, 0x00, 0x0a, 0x00, 0x0b, 0x00, 0x0c, 0x00,
        0x0e, 0x04, 0x0f, 0x00, 0x10, 0x00, 0x11, 0x00, 0x12, 0x00, 0x13, 0x06, 0x4b, 0x00,
      ]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x04, 0x00, 0xfc, 0xd6, 0x02, 0x00, 0x18, 0x10, 0x00]);
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [
        0x00, 0x00, 0xff, 0xff, 0xff, 0x0a, 0x00, 0xf6, 0xd6, 0x04, 0x6e, 0x00, 0x06, 0x00, 0xff, 0xff, 0x01, 0x00,
        0xb3, 0x00,
      ]
    );
    await receive(device, 6);

    const idm = (await receive(device, 37)).slice(17, 25);
    if (idm.length > 0) return idm.map((v) => dec2HexString(v)).join('');

    await send(device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x03, 0x00, 0xfd, 0xd6, 0x06, 0x00, 0x24, 0x00]);
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [0x00, 0x00, 0xff, 0xff, 0xff, 0x06, 0x00, 0xfa, 0xd6, 0x00, 0x02, 0x03, 0x0f, 0x03, 0x13, 0x00]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [
        0x00, 0x00, 0xff, 0xff, 0xff, 0x28, 0x00, 0xd8, 0xd6, 0x02, 0x00, 0x18, 0x01, 0x01, 0x02, 0x01, 0x03, 0x00,
        0x04, 0x00, 0x05, 0x00, 0x06, 0x00, 0x07, 0x08, 0x08, 0x00, 0x09, 0x00, 0x0a, 0x00, 0x0b, 0x00, 0x0c, 0x00,
        0x0e, 0x04, 0x0f, 0x00, 0x10, 0x00, 0x11, 0x00, 0x12, 0x00, 0x13, 0x06, 0x4b, 0x00,
      ]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [
        0x00, 0x00, 0xff, 0xff, 0xff, 0x0c, 0x00, 0xf4, 0xd6, 0x02, 0x01, 0x00, 0x02, 0x00, 0x05, 0x01, 0x00, 0x06,
        0x07, 0x07, 0x0b, 0x00,
      ]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(device, [0x00, 0x00, 0xff, 0xff, 0xff, 0x05, 0x00, 0xfb, 0xd6, 0x04, 0x36, 0x01, 0x26, 0xc9, 0x00]);
    await receive(device, 6);
    await receive(device, 20);

    await send(
      device,
      [0x00, 0x00, 0xff, 0xff, 0xff, 0x06, 0x00, 0xfa, 0xd6, 0x02, 0x04, 0x01, 0x07, 0x08, 0x14, 0x00]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [0x00, 0x00, 0xff, 0xff, 0xff, 0x06, 0x00, 0xfa, 0xd6, 0x02, 0x01, 0x00, 0x02, 0x00, 0x25, 0x00]
    );
    await receive(device, 6);
    await receive(device, 13);

    await send(
      device,
      [0x00, 0x00, 0xff, 0xff, 0xff, 0x06, 0x00, 0xfa, 0xd6, 0x04, 0x36, 0x01, 0x93, 0x20, 0x3c, 0x00]
    );
    await receive(device, 6);
    const idt = (await receive(device, 22)).slice(15, 19);

    if (idt.length > 2) return idt.map((v) => dec2HexString(v)).join('');

    return undefined;
  };

  const initEndpoint = async (device: USBDevice) => {
    await device.selectConfiguration(1);

    const pasoriInterface = device.configuration?.interfaces.find((v) => v.alternate.interfaceClass == 255);
    if (!pasoriInterface) throw new Error('Pasori interface not found');
    await device.claimInterface(pasoriInterface?.interfaceNumber);

    const in_ = pasoriInterface.alternate.endpoints.find((e) => e.direction == 'in')?.endpointNumber;
    const out_ = pasoriInterface.alternate.endpoints.find((e) => e.direction == 'out')?.endpointNumber;

    if (!in_ || !out_) throw new Error('Pasori endpoint not found');

    endpointRef.current = { in: in_, out: out_ };
    return { in: in_, out: out_ };
  };

  const start = async () => {
    if (!navigator.usb) {
      console.log('WebUSB not supported');
      return;
    }

    try {
      const device = await getPaori();
      await device.open();
      await initEndpoint(device);
      const model = DEVICE_MODEL_MAP[device.productId];

      console.log('start');
      isStarted.current = true;
      while (isStarted.current) {
        if (model === 380) {
          const idm = await session380(device);

          if (idm === lastIdm.current) continue;
          lastIdm.current = idm;
          if (idm === undefined) continue;

          const readIdmEvent = new CustomEvent('readIdm', { detail: { idm } });
          window.dispatchEvent(readIdmEvent);
          await sleep(100);
        }
      }
    } catch (e) {
      console.error(e);
      isStarted.current = false;
    }
  };

  const stop = () => {
    console.log('stop');
    isStarted.current = false;
  };

  useEffect(() => {
    window.addEventListener('readIdm', ((e: CustomEvent<ReadIdmEvent>) =>
      subscribeIdm(e.detail.idm)) as EventListenerOrEventListenerObject);

    return () =>
      window.removeEventListener('readIdm', ((e: CustomEvent<ReadIdmEvent>) =>
        subscribeIdm(e.detail.idm)) as EventListenerOrEventListenerObject);
  }, []);

  return { start, stop } as const;
};
